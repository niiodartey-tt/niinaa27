import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
import { rsvpSchema } from "@/lib/rsvp-schema"

const rateLimit = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 86_400_000 })
    return true
  }

  if (entry.count >= 10) return false

  entry.count++
  return true
}

export async function POST(request: Request): Promise<Response> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = await request.json()

    // Honeypot — silent 200, bot receives no signal it was blocked
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (body._honeypot) {
      return NextResponse.json({ success: true })
    }

    // Rate limit — 10 submissions per IP per 24 hours
    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded?.split(",")[0]?.trim() ?? "unknown"

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      )
    }

    // Zod validation — use result.data only, never raw body
    const result = rsvpSchema.safeParse(body)
    if (!result.success) {
      const message = result.error.issues[0]?.message ?? "Invalid input"
      return NextResponse.json({ error: message }, { status: 400 })
    }

    const { name, email, attending, guestCount, dietaryNotes, message } =
      result.data

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    )

    const { error: insertError } = await supabase.from("rsvps").insert({
      name,
      email,
      attending,
      guest_count: guestCount,
      dietary_notes: dietaryNotes ?? null,
      message: message ?? null,
    })

    if (insertError) {
      console.error("RSVP insert error:", insertError.code)
      return NextResponse.json(
        { error: "Submission failed. Please try again." },
        { status: 500 }
      )
    }

    // TODO Sprint 3: send confirmation email via Resend
    // await sendConfirmationEmail({ name, email, attending })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("RSVP route error:", err)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
