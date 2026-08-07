# Build Progress — Nii & Naa Wedding Invitation

> Claude updates this file automatically after every group in every sprint.
> This is a build diary — not a planning document.
> For sprint planning see sprint.md.
> For project details see overview.md.

---

## How Claude Updates This File

After every group Claude adds an entry with:
- Group number and name
- Files created or modified
- Key decisions made and why
- Errors caught and how they were resolved
- Build/TypeScript status

Claude does this automatically — without being asked.

---

## Sprint 0 — Scaffold + Design Tokens + Illustration Components

**Branch:** `sprint-0` | **Started:** 07/08/2026 | **Status:** Build complete — awaiting Vercel checkpoint

### Group A — Project Scaffold
- Next.js 14.2.35 scaffolded via temp directory (repo was non-empty)
- Node 22.22.3 (LTS) selected via nvm; `.nvmrc` committed
- **Decision:** `next-sanity` → `@sanity/client` swap. `next-sanity@9.12.3` pulls
  `@sanity/ui` → `motion@12.43.0` → `framer-motion@12.43.0` as transitive deps,
  violating the FM ban. Replaced with `@sanity/client` directly. Updated
  13-dependencies.md; documented in known-issues.md.
- **Known issue accepted:** `next@14.2.35` bundles `postcss@8.4.31` with 5 high CVEs
  (GHSA-r28c-9q8g-f849, GHSA-fxqj-rqcc-2cmp). Fix requires `next@16` (breaking).
  Build-tool only — not a runtime attack surface. Accepted for 14.x sprint lifecycle.
- `sprint-0` branch created ✅

### Group B — Configuration Layer
- `tailwind.config.ts`: all 7 colour tokens, font CSS variables (script/serif/sans),
  fade-up/fade-in keyframes with `forwards`, card radius 28px, tailwindcss-animate plugin
- `next.config.mjs`: CSP header, X-Frame-Options, HSTS, Permissions-Policy,
  Sanity CDN remotePatterns
- `app/globals.css`: Tailwind directives, bg-ivory base, prefers-reduced-motion block
- `tsconfig.json`: added `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`,
  `noImplicitReturns`, `noFallthroughCasesInSwitch`
- `.nvmrc`, `.env.example` created
- TypeScript ✅ | Committed ✅

### Group C — App Shell
- `app/layout.tsx`: Dancing Script, Cormorant Garamond (weights 300/400/500/600,
  normal+italic), Inter via next/font; CSS variable mapping; root metadata with OG;
  lang="en"; skip nav link
- `lib/utils.ts`: `cn()` via clsx + tailwind-merge
- `types/sanity.ts`: TypeScript interfaces for all 6 schemas
- `types/env.d.ts`: ProcessEnv declarations for all 6 env vars
- TypeScript ✅ | Committed ✅

### Group D — Animation Foundation
- `hooks/useInView.ts`: IO hook, `useState(false)` start (hydration-safe),
  `useEffect` checks prefers-reduced-motion and immediately sets visible;
  **Bug caught by noUncheckedIndexedAccess:** destructured `([entry])` made entry
  possibly undefined — fixed to `entries[0]` with optional chaining `entry?.isIntersecting`
- `components/sections/EventDetailsCard.tsx`: Pattern 4 canonical reference —
  scroll reveal wrapper + aria-hidden decorative element inside
- TypeScript ✅ | Committed ✅

### Group E — Illustration Components
- `FloralArch.tsx`: botanical arch, mirrored stems, 4 leaves per side, apex bud
- `Monogram.tsx`: N & N within circular border, geometric N strokes + cursive &
- `LeafDivider.tsx`: horizontal separator, centre diamond, 3 leaf pairs per side
- `AbstractArc.tsx`: geometric half-circle with echo line and terminal dots
- All: `aria-hidden="true"` default, `viewBox` only, `currentColor`, `cn()` override
- TypeScript ✅ | Committed ✅

### Group F — Data Layer
- `lib/placeholder-data.ts`: real wedding details (Nii & Naa, 2 January 2027);
  all 6 schemas populated with realistic content
- `sanity/lib/client.ts`: `@sanity/client` createClient
- `sanity/lib/queries.ts`: all 6 GROQ queries with field projection
- `sanity/schemas/`: 6 schema files as plain TypeScript objects + barrel index
- TypeScript ✅ | Committed ✅

### Group G — Placeholder Page + Docs
- `app/page.tsx`: Sprint 0 foundation preview — colour token swatches, font
  specimens, all 4 illustration components, EventDetailsCard Pattern 4 demo
- Build: `npm run lint ✅ | npx tsc --noEmit ✅ | npm run build ✅`
- Page size: 9.52 kB (96.8 kB first load JS) — static prerender ✅
- Committed ✅

### Open items before Sprint 1
- 🚦 Vercel checkpoint: connect repo, confirm auto-deploy, verify on real mobile device
- Manual: `npx sanity init` (requires Sanity credentials) → deploy Studio
- Manual: Supabase project creation + `rsvps` table DDL + RLS from overview.md

---

## Sprint 1 — Hero + Our Story + Event Details

**Branch:** `sprint-1` | **Started:** 07/08/2026 | **Status:** All sections built — pending visual review and push

### Group 1 — SectionWrapper + HeroSection
- `components/layout/SectionWrapper.tsx`: reusable section padding primitive (`py-20 md:py-28 px-4`), optional `id` and `className` override
- `components/sections/HeroSection.tsx`: server component — FloralArch framing from top, couple names in Dancing Script, hairline divider, formatted date + location, ChevronDown scroll CTA with `animate-bounce`
- **Decision:** CSS `animate-fade-up` on full content block (no staggered delays) — hero is always above the fold so IO would add no value; CSS animation + `forwards` fill is sufficient
- **Decision:** Private `formatDate()` uses local-time `Date` constructor (not ISO string) to prevent UTC-midnight shifting the date back one day in negative-offset timezones
- TypeScript ✅ | Committed ✅

### Group 2 — OurStorySection + OurStoryTimeline + StoryMilestoneCard
- `components/sections/OurStorySection.tsx`: server component wrapper — section heading, `OurStoryTimeline`, `LeafDivider` footer
- `components/sections/OurStoryTimeline.tsx`: `"use client"` — `<ol>` with `border-l border-hairline` vertical timeline line, maps milestones with 120ms stagger delay
- `components/sections/StoryMilestoneCard.tsx`: `"use client"`, `useInView` Pattern 4 — ref on inner `<div>` (not `<li>`) because `useInView` is typed `HTMLDivElement`; hollow ring dot positioned on timeline border; year, title, description
- TypeScript ✅ | Committed ✅

### Group 3 — EventDetailsSection + app/page.tsx
- `components/sections/EventDetailsSection.tsx`: server component — `grid grid-cols-1 md:grid-cols-2` layout, renders `EventDetailsCard` for each itinerary item with 150ms stagger delay
- `app/page.tsx`: replaced Sprint 0 preview with live sections — `HeroSection`, `OurStorySection`, `EventDetailsSection`; passes placeholder data slices; stays a server component
- Build: `npm run lint ✅ | npx tsc --noEmit ✅ | npm run build ✅`
- Page size: 10.4 kB (97.6 kB first load JS) — static prerender ✅
- Committed ✅

---

## Sprint 2 — Travel + RSVP + Registry + FAQ + Footer

[Claude populates this during the sprint]

---

## Sprint 3 — Sanity/Supabase Wiring + Polish + SEO + Accessibility

[Claude populates this during the sprint]
