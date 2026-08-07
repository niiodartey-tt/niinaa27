# Sprint Status

> This is the most frequently updated file in the project.
> Update at the start and end of every sprint.
> Claude reads this to know what is done, what is active, and what not to touch.

---

## Current Sprint

**Sprint:** Sprint 3 — Sanity/Supabase Wiring + Polish + SEO
**Started:** (awaiting Sprint 3 start)
**Branch:** `sprint-3` (not yet created)

### Active Tasks

*(none yet — awaiting Sprint 3 start)*

---

## Sprint History

### ✅ Sprint 2 — Travel + RSVP + Registry + FAQ + Footer

**Branch:** `sprint-2` | **Started:** 07/08/2026 | **Merged to main:** 07/08/2026

**Completed:**
- `components/sections/TravelStaySection.tsx` + `HotelCard.tsx` — scroll-reveal hotel cards, external booking links, 150ms stagger
- `lib/rsvp-schema.ts` — shared Zod schema (no `.default()` — avoids `exactOptionalPropertyTypes` conflict with zodResolver)
- `components/sections/RSVPSection.tsx` + `RSVPForm.tsx` — full form with honeypot, 4 error states, `aria-pressed` attending toggle, `aria-live` regions
- `app/api/rsvp/route.ts` — Zod validation, honeypot (silent 200), 10/IP/24h rate limiting, Supabase insert (anon key + RLS), Resend stub
- `components/sections/RegistrySection.tsx` — graceful placeholder state when `url === "#"`
- `components/sections/FAQSection.tsx` + `FAQAccordion.tsx` — CSS transition accordion, single-open-at-a-time, full ARIA
- `components/sections/FooterSection.tsx` — `bg-ink`, Monogram, Dancing Script names, local-time date formatting
- `.claude/standards/04-animation.md` — corrected from buggy CSS transition to `animate-fade-up` + `animationDelay` pattern throughout
- Dedicated a11y pass: 4 focus-visible rings added (HeroSection CTA, HotelCard links, RSVPForm toggle buttons, RegistrySection link); `text-taupe/70` opacity violations corrected; h1→h2→h3 hierarchy and full ARIA audit verified
- `known-issues.md` — all `npm audit` advisories documented; `next@16` upgrade deferred to post-launch maintenance sprint
- Build: lint ✅ · tsc ✅ · build ✅ · audit findings documented (accepted — none apply to this project's usage)
- 🚦 Reviewed and approved by Nii

---

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

## Do Not Touch During Sprint 3

- `tailwind.config.ts` — tokens are locked; do not modify
- `hooks/useInView.ts` — do not modify; it is the canonical hook
- `components/illustrations/` — all four illustration components are complete
- All Sprint 1 and Sprint 2 section components — locked; changes require explicit instruction
- `app/api/rsvp/route.ts` — locked; changes require explicit instruction
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
