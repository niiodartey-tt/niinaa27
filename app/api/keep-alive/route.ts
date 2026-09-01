import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

// Called by Vercel Cron (0 8 * * 0,3 — 8am UTC Sun & Wed).
// Keeps the Supabase free-tier project alive by issuing a real query
// before the 7-day inactivity pause threshold is reached.
export async function GET(request: Request): Promise<Response> {
  const secret = process.env.CRON_SECRET
  const authHeader = request.headers.get("authorization")
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  const { error } = await supabase
    .from("rsvps")
    .select("id", { count: "exact", head: true })

  if (error) {
    console.error("Keep-alive query failed:", error.code, error.message)
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
