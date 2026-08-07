# 12 — Security Standard

## Core Principle

The only user-input surface on this site is the RSVP form.
All other pages are read-only. Treat the RSVP API route as
high-priority even though the attack motivation is low — bad RSVP data
and spam submissions are a real nuisance risk for a personal site.

---

## Rule 1 — Environment Variables

### Prefix rules

```
NEXT_PUBLIC_  → available in browser (client + server)
No prefix     → server only (API routes, server components)
```

### This project's variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID  → safe to expose (Sanity public API)
NEXT_PUBLIC_SANITY_DATASET     → safe to expose
SUPABASE_URL                   → server-only (RSVP API route)
SUPABASE_ANON_KEY              → server-only (RSVP API route)
RESEND_API_KEY                 → server-only — never NEXT_PUBLIC_ ever
NEXT_PUBLIC_SITE_URL           → safe to expose
```

### Never do with environment variables

- Never log env var values — not even in development
- Never commit `.env.local` — it is in `.gitignore`
- Always keep `.env.example` up to date with variable names
- Never hardcode credentials anywhere in the codebase
- Add new env vars to `.env.example` immediately when created
- Update Vercel environment variables before deploying

---

## Rule 2 — Input Validation (Zod — Always)

All input to `app/api/rsvp/route.ts` must be validated with Zod before
any processing, database writes, or email sends.

```tsx
// app/api/rsvp/route.ts
import { z } from "zod"

const rsvpSchema = z.object({
  name:         z.string().min(1, "Name is required").max(100).trim(),
  email:        z.string().email("Valid email required").toLowerCase().trim(),
  attending:    z.boolean({ required_error: "Please select attending or not attending" }),
  guestCount:   z.number().int().min(1).max(10).default(1),
  dietaryNotes: z.string().max(500).trim().optional(),
  message:      z.string().max(1000).trim().optional(),
  _honeypot:    z.string().max(0).optional(),
})

export async function POST(request: Request): Promise<Response> {
  const body = await request.json()

  // Honeypot check FIRST — before any Zod validation
  if (body._honeypot) {
    return NextResponse.json({ success: true }) // silent
  }

  // Validate with Zod
  const result = rsvpSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    )
  }

  // Use result.data — NOT body — after validation
  const { name, email, attending, guestCount, dietaryNotes, message } = result.data
  ...
}
```

---

## Rule 3 — Never Expose Raw Errors to Client

```tsx
// WRONG — exposes Supabase internals, stack trace, or table names
catch (err) {
  return NextResponse.json({ error: err.message }, { status: 500 })
}

// CORRECT — log internally, return generic message
catch (err) {
  console.error("RSVP API error:", err) // internal only
  return NextResponse.json(
    { error: "Something went wrong. Please try again." },
    { status: 500 }
  )
}
```

---

## Rule 4 — Rate Limiting on the RSVP Route

The RSVP route must be rate-limited to prevent spam submissions.

### Confirmed threshold

**10 submissions per IP per 24 hours.**

Rationale: Households often RSVP together from one network/device, and guests
may need to retry after a mistake. 10/24h guards against bot floods while
allowing genuine family group submissions. This site has no payment or highly
sensitive data — the risk of over-permissiveness is low.

```tsx
// In-memory rate limiting — acceptable for this traffic volume
// (Vercel cold starts are infrequent; RSVP window is short)
const rateLimit = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimit.get(ip)

  if (!limit || now > limit.resetAt) {
    // New window — allow and start counting
    rateLimit.set(ip, { count: 1, resetAt: now + 86_400_000 }) // 24 hours
    return true
  }

  if (limit.count >= 10) return false // blocked

  limit.count++
  return true
}

export async function POST(request: Request): Promise<Response> {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown"

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    )
  }
  ...
}
```

---

## Rule 5 — Honeypot Field

The RSVP form includes a hidden `_honeypot` field. Bots fill all fields —
if `_honeypot` is filled, silently return 200 without writing to Supabase.

```tsx
// API route — check before Zod, before everything
if (body._honeypot) {
  return NextResponse.json({ success: true }) // silent — bot never learns it was blocked
}
```

```tsx
// RSVPForm.tsx — the hidden field in the form
<input
  type="text"
  {...register("_honeypot")}
  aria-hidden="true"
  tabIndex={-1}
  autoComplete="off"
  className="absolute left-[-9999px] opacity-0 pointer-events-none"
/>
```

**Never return 400 or any error for a honeypot hit** — that reveals the check.
Always return 200 silently.

---

## Rule 6 — Security Headers

Configure in `next.config.mjs`:

```js
// next.config.mjs
const cspHeader = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",       // Next.js inline scripts for hydration
  "style-src 'self' 'unsafe-inline'",         // Tailwind + React inline styles
  "img-src 'self' cdn.sanity.io data: blob:", // Sanity CDN (if images ever added) + OG image
  "font-src 'self'",                           // next/font self-hosts fonts
  "connect-src 'self' api.sanity.io cdn.sanity.io",
  "frame-src https://www.google.com",          // Google Maps embed in Travel & Stay (VenueMap.tsx)
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ")

const securityHeaders = [
  { key: "Content-Security-Policy",        value: cspHeader },
  { key: "X-Frame-Options",               value: "DENY" },
  { key: "X-Content-Type-Options",        value: "nosniff" },
  { key: "Referrer-Policy",               value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy",            value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security",     value: "max-age=63072000; includeSubDomains; preload" },
]
```

---

## Rule 7 — Supabase Row Level Security

The `rsvps` table must have RLS enabled with the minimal required policies:

```sql
-- Enable RLS
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public RSVP form)
CREATE POLICY "Anyone can submit an RSVP"
ON rsvps FOR INSERT
TO anon
WITH CHECK (true);

-- No SELECT policy for anon — RSVPs are private
-- Only the service role (Supabase dashboard or admin tool) can read
```

**Never add a SELECT policy for the anon role.** Guest RSVP data is private
and should never be readable from the public site.

---

## Rule 8 — Dependency Security

```bash
# Run before every sprint merge
npm audit

# Zero high or critical vulnerabilities allowed before merging
# If vulnerabilities found:
npm audit fix

# If npm audit fix breaks something:
# Document in known-issues.md and assess actual risk
```

---

## Rule 9 — Sensitive Data Handling

```tsx
// Never log sensitive data
console.log("RSVP submitted:", data)   // WRONG — logs name + email
console.log("RSVP from:", data.email)  // WRONG — PII in logs

// Log only what is needed for debugging — no PII
console.log("RSVP submitted successfully")   // OK
console.error("RSVP insert failed:", error.code) // error code only — OK
```

---

## RSVP Security Checklist — Sprint 2 & 3

- [ ] Honeypot field present in form HTML and checked in API route
- [ ] Honeypot hit returns 200 silently — bot receives no feedback
- [ ] Rate limiting implemented — 11th submission in 24h returns 429
- [ ] Zod validation on all RSVP fields
- [ ] All fields use `result.data` not raw `body` after validation
- [ ] Generic error messages only returned to client
- [ ] Supabase RLS enabled on `rsvps` table
- [ ] No SELECT policy for anon role — RSVPs are write-only from public
- [ ] `RESEND_API_KEY` not in client bundle — check `.next/static/` output
- [ ] `SUPABASE_ANON_KEY` not exposed in any client component
- [ ] End-to-end test: valid RSVP → Supabase row created
- [ ] End-to-end test: honeypot filled → 200, no Supabase row
- [ ] End-to-end test: 11th submission → 429 returned
- [ ] End-to-end test: malicious input (HTML, script tags) → Zod rejects or sanitises
- [ ] Security headers verified at securityheaders.com — A or A+
- [ ] `npm audit` — zero critical or high vulnerabilities
