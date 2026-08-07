# File & Folder Structure

> Confirmed Sprint 0 scaffold — last updated 07/08/2026.

---

## Confirmed Structure (Sprint 0)

Confirmed against actual Sprint 0 scaffold output.

---

## Root Structure

```
/
├── app/                        Next.js App Router
├── components/                 React components
├── hooks/                      Custom React hooks
├── lib/                        Utilities and client setup
├── types/                      TypeScript type definitions
├── public/                     Static assets — favicon, OG image only (NO photos)
├── sanity/                     Sanity CMS schemas and client
├── .claude/                    Project operating system (this folder)
├── .env.local                  Local env vars — never committed
├── .env.example                Env var names — always committed
├── .nvmrc                      Node.js version specification
├── .gitignore                  Git ignore rules
├── next.config.mjs             Next.js configuration
├── tailwind.config.ts          Tailwind configuration with design tokens
├── tsconfig.json               TypeScript configuration
├── package.json                Dependencies and scripts
└── CLAUDE.md                   AI session briefing
```

---

## App Directory (Next.js App Router)

```
app/
├── api/
│   └── rsvp/
│       └── route.ts            RSVP form — Zod validation, honeypot, rate limit, Supabase insert
├── layout.tsx                  Root layout — fonts, root metadata, skip nav link
├── page.tsx                    Homepage — all 8 sections in sequence
├── not-found.tsx               404 page
├── error.tsx                   Global error boundary
└── globals.css                 Tailwind base + global styles, keyframes, reduced-motion block
```

> This is a single-page site. All sections (Hero, Our Story, Event Details,
> Travel & Stay, RSVP, Registry, FAQ, Footer) render on the homepage `app/page.tsx`.
> The only API route is `/api/rsvp`.

---

## Components Directory

```
components/
├── illustrations/              Custom SVG illustration React components
│   ├── FloralArch.tsx          Botanical arch — hero framing illustration ✅ Sprint 0
│   ├── Monogram.tsx            N & N monogram — Hero and Footer mark ✅ Sprint 0
│   ├── LeafDivider.tsx         Horizontal botanical section separator ✅ Sprint 0
│   └── AbstractArc.tsx         Geometric arc — background/structural accent ✅ Sprint 0
│
├── sections/                   Full page section components
│   ├── EventDetailsCard.tsx    Pattern 4 reference — scroll reveal + aria-hidden SVG ✅ Sprint 0
│   ├── HeroSection.tsx         Couple names, date, location, FloralArch, scroll CTA
│   ├── OurStorySection.tsx     Timeline of story milestones from Sanity
│   ├── EventDetailsSection.tsx Ceremony and reception cards from Sanity
│   ├── TravelStaySection.tsx   Hotel recommendations from Sanity
│   ├── RSVPSection.tsx         RSVP form + form state wrapper
│   ├── RegistrySection.tsx     Registry links from Sanity
│   ├── FAQSection.tsx          Accordion FAQ from Sanity
│   └── FooterSection.tsx       Couple names, date, Monogram
│
├── ui/                         Primitive components
│   ├── Button.tsx              Primary / ghost / outline variants, pill shape
│   ├── Input.tsx               Form input — ink/hairline styling
│   ├── Textarea.tsx            Form textarea
│   ├── Accordion.tsx           FAQ accordion — CSS transition, no Framer Motion
│   └── RSVPForm.tsx            Form internals — react-hook-form + Zod
│
└── layout/                     Structural components
    └── SectionWrapper.tsx      Consistent section padding, optional background colour
```

---

## Hooks Directory

```
hooks/
├── useInView.ts                Reusable IntersectionObserver hook — fires once at threshold
└── useRSVPForm.ts              RSVP form state and submission logic
```

---

## Lib Directory

```
lib/
├── utils.ts                    cn() utility (clsx + tailwind-merge) ✅ Sprint 0
└── placeholder-data.ts         Real wedding content matching all 6 Sanity schemas ✅ Sprint 0
```

---

## Sanity Directory

```
sanity/
├── schemas/
│   ├── index.ts                Schema registry — all schemas registered here
│   ├── coupleInfo.ts           Couple names, bio, wedding date, location name
│   ├── storyMilestone.ts       Our Story timeline entries
│   ├── itineraryItem.ts        Event Details — ceremony, reception
│   ├── hotel.ts                Travel & Stay hotel recommendations
│   ├── faqItem.ts              FAQ entries with display order
│   └── registryInfo.ts         Registry store links
└── lib/
    ├── client.ts               @sanity/client createClient (NOT next-sanity — see known-issues.md) ✅ Sprint 0
    └── queries.ts              ALL GROQ queries — never written inline ✅ Sprint 0
```

> No `galleryImage.ts` schema. This site has no photo gallery.

---

## Types Directory

```
types/
├── sanity.ts                   TypeScript interfaces for all Sanity content types
├── supabase.ts                 Generated types from Supabase CLI (rsvps table)
└── env.d.ts                    Environment variable type declarations
```

---

## Public Directory

```
public/
├── favicon.ico                 Favicon — monogram or floral mark
└── og-default.jpg              Default Open Graph image (1200x630) — couple names on ivory
```

> `/public` contains NO photography. No photos of the couple.
> All decorative visuals are SVG components in `/components/illustrations/`.

---

## Key File Rules

### Files Claude must never modify without explicit instruction
See `do-not-touch.md` for the full list. Core entries once Sprint 0 is complete:
- `/tailwind.config.ts` — only add tokens, never remove existing ones
- `/sanity/schemas/*.ts` — once deployed with content, only modify after explicit confirmation
- `/app/api/rsvp/route.ts` — security-critical; changes must be planned and reviewed

### Files Claude must always update when adding new features
- `types/sanity.ts` — when adding or changing a Sanity schema
- `sanity/schemas/index.ts` — when registering a new schema
- `sanity/lib/queries.ts` — when adding new GROQ queries
- `.env.example` — when adding new environment variables
- `structure.md` — when adding a new directory or key file (this file)

---

## Import Alias

All imports use the `@/` alias pointing to the project root:

```tsx
// Always use alias imports — never relative paths from deep folders
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { rsvpsQuery } from "@/sanity/lib/queries"
import type { StoryMilestone } from "@/types/sanity"

// Never use deep relative imports
import { Button } from "../../../components/ui/Button"  // wrong
```

---

> **Reminder:** Update this file after Sprint 0 scaffold is complete.
> Replace the "Planned" label above with "Confirmed" and correct any
> differences between this plan and the actual scaffolded output.
