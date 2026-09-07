import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

// Called by Vercel Cron (0 8 * * * — 8am UTC daily).
// Writes to keep_alive_log to generate real Postgres WAL activity,
// which is what Supabase's inactivity detector actually tracks.
// Old rows are pruned on each run to keep the table small.
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

  const { error: insertError } = await supabase
    .from("keep_alive_log")
    .insert({})

  if (insertError) {
    console.error("Keep-alive insert failed:", insertError.code, insertError.message)
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  // Prune rows older than 30 days — unbounded growth prevention
  const { error: deleteError } = await supabase
    .from("keep_alive_log")
    .delete()
    .lt("pinged_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

  if (deleteError) {
    console.error("Keep-alive pruning failed:", deleteError.code, deleteError.message)
  }

  return NextResponse.json({ ok: true })
}
