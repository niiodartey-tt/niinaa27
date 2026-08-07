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

### Bug Fix — Scroll-reveal animation (StoryMilestoneCard + EventDetailsCard)
- **Bug:** All scroll-reveal cards stuck at opacity-0 on scroll, never completing fade-in
- **Cause (1):** `translate-y-6` in initial class shifts the IO bounding box 24px below the element's layout position (`getBoundingClientRect()` includes CSS transforms). IO's 15% threshold calculated against the shifted box, causing late or missed triggers.
- **Cause (2):** CSS transition requires a paint-cycle boundary between "from" and "to" states. When the IO callback fires close to the hydration moment, no stable repainted "from" state exists for the browser to transition from — the class change is silent.
- **Fix:** Replace CSS transition approach with CSS keyframe animation in both components. `transitionDelay` → `animationDelay`. Remove `transition-all duration-700 ease-out` and `translate-y-6/translate-y-0`. New ternary: `isInView ? "animate-fade-up opacity-0" : "opacity-0"`. The `opacity-0` class hides the element during the `animationDelay` period (fill mode is `forwards`, not `backwards`, so no keyframe fires during delay). When the animation runs, keyframes override the class. After animation, `forwards` fill retains `opacity: 1`, permanently overriding `opacity-0`.
- **Verified:** SSR output confirmed — initial class is `opacity-0` only (no `translate-y-6`); all 6 animation-delay values (0/120/240/360ms for milestones, 0/150ms for events) present in HTML.
- Documented in `known-issues.md` ✅
- Build: `npm run lint ✅ | npx tsc --noEmit ✅`

---

## Sprint 2 — Travel + RSVP + Registry + FAQ + Footer

**Branch:** `sprint-2` | **Started:** 07/08/2026 | **Status:** Active

### Group 1 — TravelStaySection + HotelCard
- `components/sections/HotelCard.tsx`: `"use client"` — `useInView` scroll reveal with `animate-fade-up opacity-0` pattern; `flex flex-col` with `mt-auto` on the booking link keeps it pinned to the card bottom regardless of notes presence; external link with `target="_blank" rel="noopener noreferrer"`, `aria-label` includes hotel name (disambiguates multiple "Book now" links for screen readers), `min-h-[44px]` touch target
- `components/sections/TravelStaySection.tsx`: server component — `bg-blush` section (alternates with `bg-ivory` from EventDetails); `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`; 150ms stagger per card
- `app/page.tsx`: added `TravelStaySection` after `EventDetailsSection`, passing `placeholderHotels`
- `.claude/standards/04-animation.md`: corrected Pattern 1 and Pattern 4 — removed buggy CSS transition approach, updated to `animate-fade-up opacity-0` + `animationDelay` pattern; added explanation of mechanism and "never use CSS transitions for scroll reveals" warning with reference to known-issues.md
- TypeScript ✅ | Committed ✅ | Pushed ✅

### Group 2 — RSVPSection + RSVPForm + app/api/rsvp/route.ts
- `lib/rsvp-schema.ts`: shared Zod schema imported by both RSVPForm (zodResolver) and the API route — single source of truth; `guestCount` has no `.default()` (react-hook-form defaultValues handles the default; removing `.default()` collapses Zod input/output types to match under `exactOptionalPropertyTypes: true`)
- `app/api/rsvp/route.ts`: execution order — JSON parse → honeypot check (silent 200) → rate limit (10/IP/24h, in-memory Map, `x-forwarded-for` split on comma for first IP) → Zod safeParse → Supabase insert (anon key + RLS) → Resend TODO stub → 200 success; two distinct 500 paths (insert error vs unexpected throw), neither exposes internals to client
- `components/sections/RSVPForm.tsx`: `"use client"` — attending toggle as `aria-pressed` buttons (semantic group with `aria-labelledby`); guest count select hidden when `attending === false`; honeypot with `tabIndex={-1}` + `aria-hidden="true"` + `left-[-9999px]`; four distinct error messages keyed by HTTP status (network throw / 400 / 429 / 500); error status keeps form fields intact; `aria-live="polite"` on success and error regions; `aria-describedby` + `aria-invalid` on every input
- `components/sections/RSVPSection.tsx`: server component wrapper, no props (form manages own state)
- `app/page.tsx`: RSVPSection added after TravelStaySection
- **TypeScript fix:** `exactOptionalPropertyTypes: true` + Zod's `.default(1)` creates input/output type split that `zodResolver`'s generics surface as a `Resolver<...>` mismatch; removed `.default(1)`, default provided via react-hook-form `defaultValues` instead
- TypeScript ✅ | Committed ✅ | Pushed ✅

### Group 3 — RegistrySection, FAQSection + FAQAccordion, FooterSection
- `components/sections/RegistrySection.tsx`: server component, `bg-blush`; `ul/li` card list; link conditionally rendered only when `url !== "#"` — graceful placeholder state; `aria-label` on every external link
- `components/sections/FAQSection.tsx`: thin server wrapper, passes `items` to `FAQAccordion`
- `components/sections/FAQAccordion.tsx`: `"use client"` — `openIndex: number | null` state, single item open at a time; CSS transition Pattern 3 (`max-h-0/max-h-96` + `opacity-0/100`, `transition-all duration-300`); `<h3><button aria-expanded aria-controls>` accordion pattern; `role="region" aria-labelledby` on each panel; `ChevronDown` rotates 180° on open via CSS; `focus-visible:ring-2 focus-visible:ring-rose` on every trigger
- `components/sections/FooterSection.tsx`: server component, `bg-ink`; Monogram illustration (`aria-hidden`, `opacity-30`); couple names in Dancing Script (`text-ivory`); date formatted via local-time Date constructor (same UTC fix as HeroSection); `text-blush` for date/location (full-opacity token, no opacity modifier); `<footer>` is sibling to `<main>` in page.tsx for correct landmark semantics
- `app/page.tsx`: wrapped in fragment, footer outside main; `placeholderFaqItems` and `placeholderRegistry` added to imports and passed to new sections
- Build: `npm run lint ✅ | npx tsc --noEmit ✅ | npm run build ✅` — page: 40.7 kB (128 kB first load JS)
- Committed ✅ | Pushed ✅

### Accessibility Pass — Full Sprint 2 audit
- **Heading hierarchy:** h1 (Hero) → h2 (all section headings) → h3 (hotel cards, story milestones, event cards, FAQ questions) — no skipped or out-of-order levels ✅
- **Tab order:** HeroSection scroll CTA → HotelCard links → RSVPForm inputs → FAQAccordion triggers → (Registry link hidden by `url !== "#"` guard)
- **Fixes applied:**
  - `HeroSection.tsx`: "Scroll" CTA link — added `focus-visible:ring-2 focus-visible:ring-rose`
  - `HotelCard.tsx`: "Book now" links — added `focus-visible:ring-2 focus-visible:ring-rose`
  - `RegistrySection.tsx`: "View registry" link — added `focus-visible:ring-2 focus-visible:ring-rose` (latent fix — link currently hidden by `url !== "#"` guard, appears in Sprint 3)
  - `RSVPForm.tsx`: attending toggle buttons — added `focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-ivory`
  - `RSVPForm.tsx`: `text-taupe/70` on "(optional)" spans — corrected to `text-taupe` (≥80% opacity rule from 08-accessibility.md)
- **ARIA verified passing:** `aria-expanded`/`aria-controls`/`role="region"`/`aria-labelledby` on FAQ accordion; `role="group"`/`aria-labelledby`/`aria-pressed` on attending toggle; `aria-describedby`/`aria-invalid` on all form inputs; `role="alert"` on inline errors; `role="status"` on success state; skip nav `focus:not-sr-only` ✅
- **Form labels:** every input/select/textarea has `<label htmlFor>` matched by `id` ✅
- TypeScript ✅ | Committed ✅ | Pushed ✅

---

## Sprint 3 — Sanity/Supabase Wiring + Polish + SEO + Accessibility

[Claude populates this during the sprint]
