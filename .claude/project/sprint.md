# Sprint Status

> This is the most frequently updated file in the project.
> Update at the start and end of every sprint.
> Claude reads this to know what is done, what is active, and what not to touch.

---

## Current Sprint

**Sprint:** Sprint 0 — Scaffold + Design Tokens + Illustration Components
**Started:** 07/08/2026
**Target completion:** 07/08/2026 (local build complete — awaiting Vercel checkpoint)
**Branch:** `sprint-0`
**Vercel preview:** [to be added once repo is imported to Vercel]

### Active Tasks

| Task | Branch | Status |
|---|---|---|
| GitHub repository + Vercel project setup | `sprint-0` | 🔴 Vercel pending (user action) |
| Next.js 14 scaffold — TypeScript, Tailwind, ESLint, App Router, `@/*` alias | `sprint-0` | ✅ Done |
| Install standard stack (Sanity, Supabase JS, Zod, react-hook-form, lucide-react, tailwindcss-animate, clsx, tailwind-merge) | `sprint-0` | ✅ Done |
| tailwind.config.ts — design tokens (ivory, blush, rose, rose-dark, ink, taupe, hairline), fonts, animation utilities | `sprint-0` | ✅ Done |
| next.config.mjs — security headers, Sanity CDN remotePatterns | `sprint-0` | ✅ Done |
| globals.css — base styles, CSS custom properties, prefers-reduced-motion block | `sprint-0` | ✅ Done |
| Fonts — Dancing Script, Cormorant Garamond, Inter via `next/font/google` | `sprint-0` | ✅ Done |
| lib/utils.ts — `cn()` utility | `sprint-0` | ✅ Done |
| Illustration components — FloralArch, Monogram, LeafDivider, AbstractArc | `sprint-0` | ✅ Done |
| hooks/useInView.ts — Intersection Observer, hydration-safe, reduced-motion aware | `sprint-0` | ✅ Done |
| components/sections/EventDetailsCard.tsx — Pattern 4 canonical reference | `sprint-0` | ✅ Done |
| Sanity schemas — coupleInfo, storyMilestone, itineraryItem, hotel, faqItem, registryInfo | `sprint-0` | ✅ Done |
| sanity/lib/client.ts + queries.ts | `sprint-0` | ✅ Done |
| lib/placeholder-data.ts — real wedding details (Nii & Naa, 2 January 2027) | `sprint-0` | ✅ Done |
| Supabase rsvps table + RLS policies | `sprint-0` | ⏳ Manual (Nii to do — see overview.md for DDL) |
| .env.example — all variable names committed | `sprint-0` | ✅ Done |
| .nvmrc — Node 22.22.3 | `sprint-0` | ✅ Done |
| types/sanity.ts, types/env.d.ts | `sprint-0` | ✅ Done |
| app/layout.tsx — fonts, root metadata, skip nav link | `sprint-0` | ✅ Done |
| app/page.tsx — Sprint 0 foundation preview (tokens, fonts, illustrations) | `sprint-0` | ✅ Done |
| Update structure.md with actual scaffold layout | `sprint-0` | ✅ Done |
| `npm run lint && npx tsc --noEmit && npm run build` — all clean | `sprint-0` | ✅ Done |
| **🚦 Sprint 0 Checkpoint — Connect Vercel** | `sprint-0` | ⏳ Awaiting Nii (see below) |
| `npx sanity init` + Studio deploy | `sprint-0` | ⏳ Manual (requires Sanity credentials) |

### 🚦 Sprint 0 Checkpoint — Connect Vercel

> **This is a required gate. Sprint 1 does not begin until this checkpoint is confirmed complete.**

Once the local dev server is confirmed running with design tokens and at least one illustration component rendering correctly, pause the build and complete the following before any Sprint 1 work begins:

**Nii to action:**
1. Create a Vercel account at vercel.com (if not already done)
2. Import this GitHub repo into Vercel — link the project so that pushes to `main` trigger auto-deploys
3. Confirm the first auto-deploy completes successfully and the deployed URL loads
4. Open the deployed URL on an **actual mobile device** (not DevTools device emulation) — verify fonts load, illustrations render, and the page feels correct at real mobile scale

**Why this matters:**
- This project is mobile-first — guests will open the link on their phones. Local dev review at desktop is not sufficient verification.
- DevTools emulation does not capture real font rendering, real touch behaviour, or real network conditions.
- Establishing the live-review workflow now (local iteration → periodic Vercel check on device) means every Sprint 1–3 section gets real-device review built into the process, not bolted on at the end.

**Confirmation required:**
- [ ] Vercel project linked — auto-deploy on push to main confirmed
- [ ] First production deployment live and loading at Vercel URL
- [ ] Design tokens and illustration rendering verified on a real mobile device
- [ ] Nii confirms: "Checkpoint passed — Sprint 1 approved to begin"

---

### Sprint 0 Definition of Done

- [x] `npm run lint` passes — zero errors
- [x] `npx tsc --noEmit` passes — zero errors
- [x] `npm run build` passes — clean production build
- [ ] `npm audit` — zero critical or high vulnerabilities (5 high postcss CVEs accepted — see known-issues.md)
- [x] All design tokens configured in `tailwind.config.ts` and visually verified
- [x] All four illustration components rendering correctly in browser
- [ ] All Sanity schemas scaffolded and deployed to Studio (schemas ✅ — Studio deploy pending Sanity credentials)
- [ ] Supabase `rsvps` table created with RLS enabled (pending manual setup)
- [x] `.env.local` confirmed in `.gitignore`
- [x] `.env.example` committed with all variable names
- [x] `.nvmrc` committed
- [ ] Vercel project linked — auto-deploy on main confirmed
- [ ] First production deployment live on Vercel
- [ ] 🚦 Sprint 0 Checkpoint — Connect Vercel: confirmed passed on real mobile device

**Approved by Nii:** [ ]
**Merged to main:** [ ]
**Merged date:** —

---

## Sprint History

*(None yet — Sprint 0 in progress)*

---

## Upcoming Sprints

### ⏳ Sprint 1 — Hero + Our Story + Event Details

> **Blocked on: 🚦 Sprint 0 Checkpoint — Connect Vercel**

**Planned tasks:**

- [ ] HeroSection — couple names in Dancing Script, wedding date, location, FloralArch illustration, scroll CTA
- [ ] OurStorySection — timeline driven by Sanity `storyMilestone` data
- [ ] EventDetailsSection — ceremony and reception cards from Sanity `itineraryItem`
- [ ] useInView scroll-reveal applied to all new sections (Pattern 4)
- [ ] Section navigation / smooth anchor links
- [ ] Tested at 375px, 390px, 768px, 1280px
- [ ] `npm run lint && npx tsc --noEmit && npm run build && npm audit` — all clean

### ⏳ Sprint 2 — Travel + RSVP + Registry + FAQ + Footer

**Planned tasks:**

- [ ] TravelStaySection — hotel cards from Sanity `hotel`
- [ ] RSVPSection — form with name, email, attending toggle, guest count, dietary notes, message
- [ ] `app/api/rsvp/route.ts` — Zod validation, honeypot check, rate limiting (10/IP/24h), Supabase insert, Resend stub
- [ ] RegistrySection — link(s) from Sanity `registryInfo`
- [ ] FAQSection — accordion from Sanity `faqItem`
- [ ] Footer — couple names, date, Monogram illustration
- [ ] Supabase JS client wired to `rsvps` table
- [ ] Full accessibility pass across all sections
- [ ] Tested at 375px, 390px, 768px, 1280px
- [ ] `npm run lint && npx tsc --noEmit && npm run build && npm audit` — all clean

### ⏳ Sprint 3 — Sanity/Supabase Wiring + Polish + SEO + Accessibility Pass

**Planned tasks:**

- [ ] Wire all Sanity data to live sections (replace static placeholder content)
- [ ] `revalidate` ISR configured on all Sanity-fetching routes
- [ ] Resend confirmation email implemented — guest receives confirmation, couple receives notification
- [ ] SEO metadata on all pages/sections via Next.js Metadata API
- [ ] OG image created (1200x630px) — branded with couple's names
- [ ] `robots.txt` and sitemap configured
- [ ] Core Web Vitals audit — all scores green at pagespeed.web.dev mobile
- [ ] Security headers verified at securityheaders.com — A or A+
- [ ] `npm audit` — zero critical or high vulnerabilities
- [ ] Full keyboard navigation test
- [ ] Colour contrast verified on all text combinations
- [ ] RSVP form tested end-to-end — data in Supabase, email in inbox
- [ ] Honeypot field tested — bot submission returns 200, no Supabase row
- [ ] Rate limiting tested — 11th submission in 24h blocked
- [ ] Domain configured on Vercel (if domain purchased by this point)
- [ ] Final production deployment confirmed

---

## Do Not Touch During Current Sprint

- `tailwind.config.ts` — tokens are set; do not modify without explicit instruction
- `types/sanity.ts` — interfaces are set; only modify when a schema changes
- Any previously committed `.claude/standards/` file — changes require explicit instruction

---

## Sprint Notes

- Primary traffic source is guests opening a link on mobile — mobile-first is critical
- Framer Motion is permanently banned — use CSS transitions + Intersection Observer only
- `next-sanity` is banned — it pulls framer-motion transitively. Use `@sanity/client` directly
- No photography anywhere — all visuals are SVG illustration components built in code
- Resend is stubbed until Sprint 3 — RSVP form writes to Supabase from Sprint 2
- RSVP rate limit is **10 submissions per IP per 24 hours** (confirmed — households RSVP together)
- Sanity Studio is for Naa to manage content after launch — schemas must be clearly labelled
- PostCSS CVEs (5 high) in next@14.2.35 accepted — build-tool only, not runtime. See known-issues.md

---

## How to Update This File

### At sprint start
1. Move current sprint to Sprint History with ✅
2. Create new Current Sprint section with tasks from Upcoming
3. Create the sprint branch: `git checkout -b sprint-N`
4. Update `CLAUDE.md` Quick Reference with new sprint number

### During sprint
1. Update task status as work progresses (⏳ → 🔴 Active → ✅ Done)
2. Add new tasks discovered mid-sprint
3. Note decisions or blockers in Sprint Notes

### At sprint end
1. Work through Definition of Done checklist
2. Mark approval checkbox
3. Merge sprint branch to main
4. Mark merged checkbox and add date
5. Move sprint to Sprint History
6. Begin next sprint setup
