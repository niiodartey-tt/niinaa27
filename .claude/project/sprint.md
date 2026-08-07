# Sprint Status

> This is the most frequently updated file in the project.
> Update at the start and end of every sprint.
> Claude reads this to know what is done, what is active, and what not to touch.

---

## Current Sprint

**Sprint:** Sprint 2 — Travel + RSVP + Registry + FAQ + Footer
**Started:** 07/08/2026
**Target completion:** TBD
**Branch:** `sprint-2`
**Vercel preview:** [to be added once first group is pushed]

### Active Tasks

| Task | Branch | Status |
|---|---|---|
| `components/sections/TravelStaySection.tsx` — hotel cards from `placeholderHotels` | `sprint-2` | ⏳ Pending |
| `components/sections/RSVPSection.tsx` — form with name, email, attending, guest count, dietary, message | `sprint-2` | ⏳ Pending |
| `app/api/rsvp/route.ts` — Zod validation, honeypot, rate limiting (10/IP/24h), Supabase insert, Resend stub | `sprint-2` | ⏳ Pending |
| `components/sections/RegistrySection.tsx` — link(s) from `placeholderRegistry` | `sprint-2` | ⏳ Pending |
| `components/sections/FAQSection.tsx` — accordion from `placeholderFaq` | `sprint-2` | ⏳ Pending |
| `components/sections/FooterSection.tsx` — couple names, date, Monogram illustration | `sprint-2` | ⏳ Pending |
| Full accessibility pass across all sections | `sprint-2` | ⏳ Pending |
| Test at 375px, 390px, 768px, 1280px — no horizontal overflow | `sprint-2` | ⏳ Pending |
| `npm run lint && npx tsc --noEmit && npm run build && npm audit` | `sprint-2` | ⏳ Pending |

### Sprint 2 Definition of Done

- [ ] TravelStaySection renders hotel cards — no overflow at 375px
- [ ] RSVPSection form is fully functional — all fields, validation, error and success states
- [ ] RSVP API route validates with Zod, inserts to Supabase, stubs Resend
- [ ] Rate limiting blocks 11th submission from same IP within 24 hours
- [ ] RegistrySection renders with correct links
- [ ] FAQSection accordion opens/closes — only one item open at a time
- [ ] FooterSection renders with Monogram illustration
- [ ] All sections have correct `id` attributes for anchor navigation
- [ ] All interactive elements (RSVP form, FAQ accordion) keyboard-navigable
- [ ] All animations respect `prefers-reduced-motion`
- [ ] `npm run lint` — clean
- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run build` — clean
- [ ] Reviewed on Vercel preview URL (sprint-2 branch auto-deploy)
- [ ] Verified on real mobile device at natural breakpoints

**Approved by Nii:** [ ]
**Merged to main:** [ ]
**Merged date:** —

---

## Sprint History

### ✅ Sprint 1 — Hero + Our Story + Event Details

**Branch:** `sprint-1` | **Started:** 07/08/2026 | **Merged to main:** 07/08/2026

**Completed:**
- `components/layout/SectionWrapper.tsx` — reusable section padding primitive
- `components/sections/HeroSection.tsx` — FloralArch above names, Dancing Script, formatted date, ChevronDown scroll CTA with `animate-bounce`, `animate-fade-up` on full content block
- `components/sections/OurStorySection.tsx` — server wrapper, heading, LeafDivider footer
- `components/sections/OurStoryTimeline.tsx` — `"use client"`, vertical timeline, 120ms stagger
- `components/sections/StoryMilestoneCard.tsx` — `"use client"`, `useInView` scroll-reveal
- `components/sections/EventDetailsSection.tsx` — `grid grid-cols-1 md:grid-cols-2`, 150ms stagger
- `app/page.tsx` — live sections wired to placeholder data, replacing Sprint 0 preview
- Bug fix: scroll-reveal cards stuck at `opacity-0` — replaced CSS transition with `animate-fade-up` + `animationDelay`; documented in `known-issues.md`
- Build: lint ✅ · tsc ✅ · build ✅
- 🚦 Vercel checkpoint passed — reviewed and approved by Nii

---

### ✅ Sprint 0 — Scaffold + Design Tokens + Illustration Components

**Branch:** `sprint-0` | **Started:** 07/08/2026 | **Merged to main:** 07/08/2026

**Completed:**
- Next.js 14.2.35 scaffold (TypeScript, Tailwind, ESLint, App Router, `@/*` alias)
- Full stack installed: `@sanity/client`, `@supabase/supabase-js`, `zod`, `react-hook-form`, `lucide-react`, `tailwindcss-animate`, `clsx`, `tailwind-merge`
- `tailwind.config.ts` — all 7 colour tokens, font CSS vars, animation keyframes, card radius
- `next.config.mjs` — CSP header, security headers, Sanity CDN remotePatterns
- `app/globals.css` — Tailwind base, smooth scroll, `prefers-reduced-motion` block
- `tsconfig.json` — `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, strict mode
- `app/layout.tsx` — Dancing Script, Cormorant Garamond, Inter via `next/font/google`; skip nav
- `lib/utils.ts` — `cn()` via clsx + tailwind-merge
- `types/sanity.ts` + `types/env.d.ts`
- `hooks/useInView.ts` — IO hook, hydration-safe, reduced-motion aware
- Illustration components: FloralArch, Monogram, LeafDivider, AbstractArc
- `components/sections/EventDetailsCard.tsx` — Pattern 4 canonical reference
- Sanity schemas (6) + `sanity/lib/client.ts` + `sanity/lib/queries.ts`
- `lib/placeholder-data.ts` — real wedding details (Nii & Naa, 2 January 2027)
- `app/page.tsx` — Sprint 0 foundation preview page
- Full `.claude/` operating system committed
- Build: lint ✅ · tsc ✅ · build ✅
- 🚦 Vercel checkpoint passed — confirmed on real mobile device

**Known open items carried into Sprint 1:**
- Supabase `rsvps` table creation (manual, needed before Sprint 2 RSVP work)
- `npx sanity init` + Studio deploy (needed before Sprint 3 wiring)
- 5 high `npm audit` findings accepted (postcss/next/glob — all require `next@16`, breaking)

---

## Upcoming Sprints

### ⏳ Sprint 3 — Sanity/Supabase Wiring + Polish + SEO + Accessibility Pass

**Planned tasks:**

- [ ] Wire all Sanity data to live sections (replace placeholder content)
- [ ] `revalidate` ISR configured on all Sanity-fetching routes
- [ ] Resend confirmation email implemented
- [ ] SEO metadata via Next.js Metadata API
- [ ] OG image (1200x630px)
- [ ] `robots.txt` and sitemap
- [ ] Core Web Vitals audit — green at pagespeed.web.dev mobile
- [ ] Security headers — A or A+ at securityheaders.com
- [ ] Rate limiting tested — 11th submission in 24h blocked
- [ ] Domain configured on Vercel
- [ ] Final production deployment confirmed

---

## Do Not Touch During Sprint 2

- `tailwind.config.ts` — tokens are locked; do not modify
- `hooks/useInView.ts` — do not modify; it is the canonical hook
- `components/illustrations/` — all four illustration components are complete
- Any Sprint 1 section components (`HeroSection`, `OurStorySection`, `OurStoryTimeline`, `StoryMilestoneCard`, `EventDetailsSection`) — locked; changes require explicit instruction
- Any `.claude/standards/` file — changes require explicit instruction

---

## Sprint Notes

- Primary traffic source is guests opening a link on mobile — mobile-first is critical
- Framer Motion is permanently banned — use CSS transitions + Intersection Observer only
- `next-sanity` is banned — it pulls framer-motion transitively. Use `@sanity/client` directly
- No photography anywhere — all visuals are SVG illustration components built in code
- Resend is stubbed until Sprint 3 — RSVP form writes to Supabase from Sprint 2
- RSVP rate limit is **10 submissions per IP per 24 hours** (confirmed)
- PostCSS CVEs (5 high) in next@14.2.35 accepted — build-tool only, not runtime

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
