# Project Overview

## Basic Information

| Field | Value |
|---|---|
| Project name | Thomas & Leanne Wedding Invitation |
| Type | Personal project — single scrolling wedding invitation website |
| Domain | TBD — Vercel URL used through Sprints 0–2 |
| Purpose | Single scrolling wedding invitation website — replaces paper invites, manages RSVPs, shares event details |
| Primary audience | Invited guests — mobile-first (guests will open the link on their phones) |
| Started | August 2026 |
| Target launch | TBD |

---

## Tech Stack

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Framework | Next.js | 14 (App Router) | Single scrolling page — all sections on homepage |
| Language | TypeScript | Latest stable | Strict mode always |
| Styling | Tailwind CSS | Latest stable | Utility-first — project tokens in tailwind.config.ts |
| Illustrations | Custom SVG React components + decorative PNG florals | — | SVGs for structural/typographic elements; PNG cutouts via FloralAccent for decorative accents |
| Animation | CSS transitions + Intersection Observer | — | Scroll reveals only. Framer Motion BANNED. |
| Animation | tailwindcss-animate | Latest stable | Simple UI states: accordion, modals, buttons |
| CMS | Sanity | Latest stable | Couple info, story milestones, event details, FAQ, registry |
| Database | Supabase | Latest stable | RSVP submissions only |
| Email | Resend | Latest stable | RSVP confirmation email — deferred/stubbed for Sprint 0 |
| Hosting | Vercel | — | Auto-deploy on push to main |
| Package manager | npm | — | Linux (Ubuntu/Debian, WSL2) |
| Node.js | LTS | — | Managed via nvm — see .nvmrc |

---

## Design System

### Colour Tokens

| Token name | Hex | Usage |
|---|---|---|
| `ivory` | `#FBF9F4` | Page background |
| `blush` | `#F0DCD0` | Section fills, card backgrounds |
| `rose` | `#B56A52` | Primary accent, CTA buttons, active states |
| `rose-dark` | `#8A4E3C` | Button hover, dark accent |
| `ink` | `#3A2A22` | Body text, headings |
| `taupe` | `#8A7267` | Secondary/muted text, UI labels |
| `hairline` | `#E4DFD3` | Borders, dividers, section separators |

### Typography

| Font | Role | Notes |
|---|---|---|
| Imperial Script | Script accent — couple's names and Monogram only | `next/font/google` (`Imperial_Script`) |
| Elms Sans | All body text, headers, UI labels — single typeface site-wide | Google Fonts via `<link>` (not in `next/font` bundle at Next.js 14.2.35); migrate to `localFont` in Sprint 3 |

### Shape Language

- Card radius: 24–28px (`rounded-3xl` or `rounded-[28px]`)
- Pill buttons: `rounded-full`
- Circular icon chips: `rounded-full` (for section icons, amenity chips)

### Photography Policy

Decorative floral and fabric/drape transparent-background PNG cutouts are permitted site-wide as background accents via the `FloralAccent` component. These are purely decorative — `aria-hidden`, `pointer-events-none`, absolutely positioned, and never placed over text in a way that hurts legibility.

The existing illustration system (`TornEdgeDivider`, `GrowthMarker`, `LeafDivider`, `FloralArch`, `Monogram`) is unchanged — floral photography is additive richness, not a replacement.

What is NOT permitted: portrait photography, guest photos, gallery sections, or any functional/informational image use. `next/image` for photography is limited to Hero background and `FloralAccent` instances only.

### Scoped Design Exceptions

| Exception | Scope | Rationale |
|---|---|---|
| Real photography in milestone cards | Our Story section only | Each `StoryMilestone` has an optional `imageUrl` / `imageAlt` field. Displayed as a full-width `<img>` (not `next/image`) at the top of each timeline card. Placeholder is a muted blush block with a Camera icon. Leanne will supply real photos for Sprint 3. This is the only location on the site where editorial photography appears. All other sections remain illustration-only. |

---

## Sanity CMS Configuration

**Project ID:** [to be filled after Sanity project created in Sprint 0]
**Dataset:** `production`
**Studio URL:** [to be filled after `npx sanity deploy` in Sprint 0]

### Content Types (Schemas)

| Schema | Type | Description |
|---|---|---|
| `coupleInfo` | document | Couple names, short bio/story intro, wedding date, wedding location name |
| `storyMilestone` | document | "Our Story" timeline entries — date, title, description |
| `itineraryItem` | document | Event Details section — event name (ceremony/reception), time, venue, address, notes |
| `hotel` | document | Travel & Stay — hotel name, distance, rate, booking link, notes |
| `faqItem` | document | FAQ — question, answer, display order |
| `registryInfo` | document | Registry — store name, URL, notes |

> There is NO `galleryImage` schema. This site has no photo gallery.
> All GROQ queries must live in `/sanity/lib/queries.ts` — never written inline in page components.

---

## Supabase Configuration

> Supabase is used **only** for RSVP submissions. It is not used for auth, content, or anything else.

### `rsvps` Table

```sql
CREATE TABLE rsvps (
  id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at    timestamptz DEFAULT now(),
  name          text        NOT NULL,
  email         text        NOT NULL,
  attending     boolean     NOT NULL,
  guest_count   integer     DEFAULT 1 CHECK (guest_count >= 1 AND guest_count <= 10),
  dietary_notes text,
  message       text
);

ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public RSVP form)
CREATE POLICY "Anyone can submit an RSVP"
ON rsvps FOR INSERT
TO anon
WITH CHECK (true);

-- No public reads — only service role can read RSVPs (for admin/export)
```

### RSVP Anti-Spam Approach

Two layers — both implemented in `app/api/rsvp/route.ts`:

1. **Honeypot field** — hidden `_honeypot` field in the HTML form. If it is filled (bots fill all fields), the API returns `200` silently and does NOT write to Supabase. The bot never learns it was blocked.

2. **Basic rate limiting** — in-memory Map keyed by IP. Confirmed threshold: **10 submissions per IP per 24 hours.**
   - Rationale: households often RSVP together from one network/device, and guests may need to retry after a mistake. 10/24h guards against bot floods while allowing genuine family group submissions without false-blocking. This site has no payment or highly sensitive data — the risk of over-permissiveness is low.
   - 24-hour window avoids false-blocking a legitimate corrective resubmission.

> In-memory rate limiting resets on Vercel cold start. For a wedding RSVP window this is acceptable — traffic volume is too low to warrant Upstash Redis.

---

## Sections (Page Order)

1. **Hero** — couple names in Dancing Script, wedding date, location, tasteful floral SVG illustration, scroll CTA
2. **Our Story** — timeline of milestones sourced from Sanity `storyMilestone` documents
3. **Event Details** — ceremony and reception cards, sourced from `itineraryItem`
4. **Travel & Stay** — hotel recommendations, sourced from `hotel`
5. **RSVP** — form writing to Supabase `rsvps`, triggers Resend confirmation email (stubbed Sprint 0–1)
6. **Registry** — link(s) to registry, sourced from `registryInfo`
7. **FAQ** — accordion, sourced from `faqItem`
8. **Footer** — couple names, wedding date, small floral monogram SVG

> No gallery section. No portrait photography or informational image use.

---

## SVG Illustration Architecture

All decorative visuals are custom SVG React components — never external image files.

Planned illustration components (to be created in Sprint 0):
- `FloralCorner.tsx` — line-art floral corner accent (used in Hero, RSVP)
- `FloralDivider.tsx` — horizontal line-art floral separator (between sections)
- `Monogram.tsx` — N & N monogram in line art (used in Hero, Footer)
- `LeafAccent.tsx` — single leaf/branch accent (used in cards, section headers)

All illustration components:
- Live in `/components/illustrations/`
- Accept `className` prop for sizing and colour overrides via Tailwind
- Use `aria-hidden="true"` — they are decorative, not meaningful content
- Kept under 80 lines — if more complex, split into sub-SVG components
- Colour driven by `currentColor` where possible so they pick up Tailwind text colour classes

---

## Third-Party Integrations

| Service | Purpose | Notes |
|---|---|---|
| Vercel Analytics | Lightweight page view tracking | Enabled in Vercel dashboard — no manual env var required |
| Resend | RSVP confirmation email to guest + notification to couple | Stubbed in Sprint 0; implemented in Sprint 3 |

---

## Project-Specific Rules

Rules specific to this project that extend or override the base standard:

1. **Photography is permitted only for decorative purposes.** `next/image` may be used in two contexts: (a) the Hero background (video or static image placeholder), and (b) `FloralAccent` — a reusable component for transparent-background floral/drape PNG cutouts placed as absolute decorative accents in sections. No gallery sections, no portrait photography, no informational image use.

   **Hero background video:** `HeroSection` accepts optional `videoSrc` and `posterSrc` props. The video is a short ambient loop, rendered in `HeroVideo.tsx` as an `aria-hidden` background element. See `.claude/standards/09-performance.md` Rule 3b for the video budget.

   **Hero static image placeholder:** While real footage is being sourced, `HeroSection` accepts an optional `heroImageSrc` prop. This is temporary — it will be replaced by the video once sourced. Document this as resolved once `heroImageSrc` is removed from `page.tsx`.

   **Floral accents (site-wide):** `FloralAccent` in `components/illustrations/FloralAccent.tsx` renders transparent-background PNG/WebP florals as absolutely positioned decorative elements. Always `aria-hidden="true"` and `pointer-events-none`. See performance budget in `.claude/standards/09-performance.md`.

2. **Framer Motion is permanently banned.** It caused a React 19 hydration failure on the prior project (Ostendere, Sprint 1). The fix is CSS transitions + Intersection Observer. Do not reintroduce FM under any circumstances.

3. **No Lenis.** Smooth scroll is not appropriate for a single-page invitation site. Standard browser scroll is the correct choice. Do not install Lenis.

   **Scoped exception — `SiteNav`:** `components/layout/SiteNav.tsx` uses a fixed header with hamburger mobile overlay and horizontal desktop links. See `.claude/standards/02-responsive.md`.

4. **No scroll-snap.** Sections flow naturally. Guest should be able to scroll freely without forced snap points.

5. **No external SVG files for illustrations.** Build all decorative SVGs as inline JSX in React components under `/components/illustrations/`. This keeps them tree-shakeable, colourable via Tailwind, and eliminates external file loading.

6. **Resend is stubbed until Sprint 3.** The RSVP API route should accept submissions and write to Supabase from Sprint 2 onwards, but the Resend call should be a clearly marked TODO stub until Sprint 3. Do not block RSVP functionality on email integration.

7. **RSVP is the only write surface.** The only user-input path is `app/api/rsvp/route.ts`. All other content is read-only from Sanity or static. Treat the RSVP route with the full security standard.

8. **`RESEND_API_KEY` is server-only always.** Never prefix with `NEXT_PUBLIC_`. Never log it. Never return it to the client.

9. **Sanity content uses ISR with `revalidate`.** Content updates (new FAQ entries, hotel corrections) must appear without a full redeploy.

10. **`lang="en"` on the root layout always.**

11. **Review cadence — local dev for iteration, Vercel for mobile verification at checkpoints.** Run `npm run dev` for all day-to-day development and TypeScript iteration. Push to Vercel and check on a real mobile device at natural checkpoints: end of each sprint, and after any major section is complete. Do not check the Vercel deployment after every individual change — that interrupts flow without adding value. Do not rely solely on local or DevTools review — guests will open this on their phones and real-device rendering is the ground truth.

---

## Key People

| Role | Name |
|---|---|
| Developer | Nii Odartey |
| Site owner (post-launch) | Naa |
