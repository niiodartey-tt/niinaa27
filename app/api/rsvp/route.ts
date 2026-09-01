import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"
import { NextResponse } from "next/server"
import { rsvpSchema } from "@/lib/rsvp-schema"
import { buildGuestEmail, buildListEmail, type RsvpRow } from "@/lib/email-templates"

// In-memory rate limit — resets on cold start (Vercel serverless).
// Prevents a single IP from flooding the RSVP table.
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

const COUPLE_EMAIL = "niinaathompson@outlook.com"

const FROM_ADDRESS = "Thomas & Leanne <rsvp@thomasandleanne.com>"

export async function POST(request: Request): Promise<Response> {
  try {
    const body: unknown = await request.json()

    // Honeypot — silent 200, bot receives no signal it was blocked
    if (
      typeof body === "object" &&
      body !== null &&
      "_honeypot" in body &&
      Boolean((body as Record<string, unknown>)._honeypot)
    ) {
      return NextResponse.json({ success: true })
    }

    // Rate limit — 10 submissions per IP per 24 hours
    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded?.split(",")[0]?.trim() ?? "unknown"
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      )
    }

    // Zod validation — never touch raw body after this point
    const result = rsvpSchema.safeParse(body)
    if (!result.success) {
      const message = result.error.issues[0]?.message ?? "Invalid input"
      return NextResponse.json({ error: message }, { status: 400 })
    }

    const { name, email, attending, guestCount, dietaryNotes, message } = result.data

    // Service-role client — bypasses RLS for trusted server writes.
    // Never use the anon key here; never expose the service role key client-side.
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
    )

    const DUPLICATE_MSG =
      "You've already RSVP'd with this email. If you need to make changes, please contact us directly at niinaathompson@outlook.com."

    // Common-case check: fast SELECT before attempting a write.
    const { data: existing, error: checkError } = await supabase
      .from("rsvps")
      .select("id")
      .eq("email", email)
      .maybeSingle()

    if (checkError) {
      console.error("RSVP check error:", checkError.code)
      return NextResponse.json(
        { error: "Submission failed. Please try again." },
        { status: 500 },
      )
    }

    if (existing) {
      return NextResponse.json({ error: DUPLICATE_MSG }, { status: 409 })
    }

    // INSERT (not upsert) — UNIQUE constraint on email is the hard guarantee.
    // If two concurrent requests both pass the SELECT above, the second INSERT
    // will fail with Postgres error 23505; we catch that and return the same 409.
    const { error: insertError } = await supabase.from("rsvps").insert({
      full_name: name,
      email,
      attending,
      guest_count: attending ? (guestCount ?? null) : null,
      dietary_notes: dietaryNotes ?? null,
      message: message ?? null,
    })

    if (insertError) {
      if (insertError.code === "23505") {
        return NextResponse.json({ error: DUPLICATE_MSG }, { status: 409 })
      }
      console.error("RSVP insert error:", insertError.code, insertError.message)
      return NextResponse.json(
        { error: "Submission failed. Please try again." },
        { status: 500 },
      )
    }

    // Fetch the full list for the couple's notification email.
    const { data: allRows, error: queryError } = await supabase
      .from("rsvps")
      .select("full_name, email, attending, guest_count, message, updated_at")
      .order("updated_at", { ascending: false })

    if (queryError) {
      console.error("RSVP list query error:", queryError.message)
    }

    // Fire-and-forget emails.
    // The RSVP is already saved — email failures must not show the guest an error.
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ""
    const resend = new Resend(process.env.RESEND_API_KEY)
    const rows = (allRows ?? []) as RsvpRow[]
    const totalLabel = `${rows.length} total response${rows.length !== 1 ? "s" : ""}`

    const emailResults = await Promise.allSettled([
      resend.emails.send({
        from: FROM_ADDRESS,
        to: email,
        subject: "Your RSVP is confirmed — Thomas & Leanne, 2 January 2027",
        html: buildGuestEmail(name, attending, siteUrl),
      }),
      resend.emails.send({
        from: FROM_ADDRESS,
        to: COUPLE_EMAIL,
        subject: `RSVP Update — ${totalLabel}`,
        html: buildListEmail(rows, siteUrl),
      }),
    ])

    emailResults.forEach((res, i) => {
      if (res.status === "rejected") {
        console.error(`Email send failed [${i === 0 ? "guest" : "list"}]:`, res.reason)
      }
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("RSVP route error:", err)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    )
  }
}
