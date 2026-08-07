# Environment Variables

> This file documents all environment variables for this project.
> Never include actual values here — variable names only.
> Actual values live in .env.local (local) and Vercel dashboard (production).

---

## Rules

- `.env.local` is never committed to Git — it is in `.gitignore`
- `.env.example` is always committed — it contains variable names with empty values
- Add new variables to this file AND `.env.example` immediately when created
- Update Vercel dashboard before deploying any new variable
- `NEXT_PUBLIC_` prefix = available in browser (client + server)
- No prefix = server only (API routes, server components)
- Never log variable values — not even in development

---

## Variable Reference — Active

### Sanity CMS

| Variable | Scope | Description |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Client + Server | Sanity project ID — from Sanity dashboard. Safe to expose in browser. |
| `NEXT_PUBLIC_SANITY_DATASET` | Client + Server | Dataset name — `production`. Safe to expose. |

> No `SANITY_API_TOKEN` is needed unless server-side draft previews are implemented.
> Public Sanity reads use `useCdn: true` with the project ID and dataset only.
> If a server-side read token is needed in Sprint 3, add `SANITY_API_TOKEN` (server-only, no prefix).

### Supabase

| Variable | Scope | Description |
|---|---|---|
| `SUPABASE_URL` | Server only | Supabase project URL — used in `app/api/rsvp/route.ts` only. Not prefixed `NEXT_PUBLIC_` because this route is server-side. |
| `SUPABASE_ANON_KEY` | Server only | Public anon key — used in server API route only. Could be `NEXT_PUBLIC_` but since the only Supabase usage is server-side, keep it server-only to reduce surface area. |

> **Note:** The `rsvps` table is write-only from the client's perspective (via the API route).
> There is no client-side Supabase usage (no live queries, no auth). Both Supabase vars
> are used exclusively in `app/api/rsvp/route.ts`. Keep them server-only.
>
> If a client-side Supabase feature is added in the future (e.g., real-time RSVP count),
> rename to `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` at that point.

### Email

| Variable | Scope | Description |
|---|---|---|
| `RESEND_API_KEY` | Server only | Resend API key for RSVP confirmation emails. **Never** `NEXT_PUBLIC_` prefix. **Never** log the value. Stubbed until Sprint 3. |

### Site

| Variable | Scope | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Client + Server | Site URL — `https://[project].vercel.app` until domain is configured. Swap to the actual domain in Vercel when live. |

---

## .env.example Template

Copy this into `.env.example` at project root:

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production

# Supabase (server-only — RSVP API route only)
SUPABASE_URL=
SUPABASE_ANON_KEY=

# Email — Resend (server-only — stubbed until Sprint 3)
RESEND_API_KEY=

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Vercel Environment Configuration

Variables must be set in the Vercel dashboard for each environment:

| Variable | Development | Preview | Production |
|---|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ✅ | ✅ | ✅ |
| `NEXT_PUBLIC_SANITY_DATASET` | ✅ (`production`) | ✅ | ✅ |
| `SUPABASE_URL` | ✅ | ✅ | ✅ |
| `SUPABASE_ANON_KEY` | ✅ | ✅ | ✅ |
| `RESEND_API_KEY` | ✅ (can be empty until Sprint 3) | ✅ | ✅ |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | [Vercel preview URL] | `https://[domain]` |

> Pull Vercel env vars to local with: `vercel env pull .env.local`

---

## Security Notes

- `RESEND_API_KEY` is the most sensitive variable. If accidentally committed:
  1. Rotate the key immediately in the Resend dashboard
  2. Update the value in Vercel
  3. Update `.env.local`
  4. Document the incident in `known-issues.md`

- `SUPABASE_ANON_KEY` is technically safe to expose (it is the public anon key and Supabase RLS
  is the real protection layer), but keeping it server-only reduces surface area and is the
  correct pattern for this project since there is no client-side Supabase usage.

- If any server-only key is accidentally committed or exposed:
  1. Rotate or change the value immediately in the relevant service
  2. Update the value in Vercel
  3. Update `.env.local`
  4. Document the incident in `known-issues.md`
