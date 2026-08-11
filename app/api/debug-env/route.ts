import { NextResponse } from "next/server"

// TEMPORARY — remove once env vars confirmed in Vercel logs.
// Logs presence, length, and first 15 chars of each secret to the server
// console only. Nothing sensitive is returned in the HTTP response.
export async function GET(): Promise<Response> {
  const vars = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    "RESEND_API_KEY",
  ] as const

  for (const key of vars) {
    const val = process.env[key]
    if (!val) {
      console.log(`[debug-env] ${key}: NOT DEFINED`)
    } else {
      console.log(
        `[debug-env] ${key}: defined — length=${val.length} prefix="${val.slice(0, 15)}"`,
      )
    }
  }

  return NextResponse.json({ ok: true })
}
