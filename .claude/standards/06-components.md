# 06 — Component Architecture

## The Mental Model

Every piece of UI falls into one of four categories:

```
Illustrations          → decorative SVG components, purely visual
  ↓
UI Primitives          → smallest building blocks (Button, Input, Accordion)
  ↓
Section Components     → groups of primitives forming a page section
  ↓
Page Component         → assembles all sections (app/page.tsx)
```

- **Illustrations** — FloralCorner, FloralDivider, Monogram, LeafAccent. Purely decorative SVG. `aria-hidden`.
- **Primitives** — Button, Input, Textarea, Accordion. One thing, used everywhere.
- **Sections** — HeroSection, OurStorySection, RSVPSection. Built from primitives and illustrations.
- **Page** — `app/page.tsx`. Assembles sections, fetches data, passes it down. No UI logic itself.

---

## Folder Structure

```
/components
  /illustrations   → decorative SVG components (FloralCorner, Monogram, etc.)
  /ui              → primitives (Button, Input, Accordion, RSVPForm)
  /sections        → section components (HeroSection, OurStorySection, etc.)
  /layout          → structural (SectionWrapper)

/hooks             → custom hooks (useInView, useRSVPForm)

/app
  page.tsx         → assembles all sections, fetches all Sanity data
  api/rsvp/        → RSVP API route
```

Every component must land in the correct folder. This is not optional.

---

## Rule 1 — One Component Per File. Always.

```tsx
// WRONG — two components in one file
export function HotelCard() { ... }
export function HotelCardGrid() { ... }

// CORRECT — two separate files
// HotelCard.tsx
export function HotelCard() { ... }

// HotelCardGrid.tsx
export function HotelCardGrid() { ... }
```

**Exception:** Small internal sub-components never exported may live in the same file.

```tsx
// Acceptable — internal only, not exported
function RSVPSuccessMessage() { ... }

export function RSVPSection({ ... }: RSVPSectionProps) {
  return isSubmitted ? <RSVPSuccessMessage /> : <RSVPForm />
}
```

---

## Rule 2 — Named Exports. Always.

```tsx
// WRONG
export default function HeroSection() { ... }

// CORRECT
export function HeroSection() { ... }
```

**Only exception:** Next.js page files and layout files require default exports.

```tsx
// app/page.tsx — default export required by Next.js
export default function HomePage() {
  return (
    <>
      <HeroSection couple={couple} />
      <OurStorySection milestones={milestones} />
    </>
  )
}
```

---

## Rule 3 — Props Interface in Same File

Every component with props must have a TypeScript interface defined
directly above the component, named `[ComponentName]Props`.

```tsx
// HotelCard.tsx
interface HotelCardProps {
  name: string
  distance: string
  rate: string
  bookingUrl: string
  notes?: string
  className?: string  // always optional on primitives
}

export function HotelCard({
  name,
  distance,
  rate,
  bookingUrl,
  notes,
  className,
}: HotelCardProps) {
  return (...)
}
```

- Never use `any` on props
- Never pass more than 6–7 props — group into objects if needed
- Always accept optional `className` prop on primitive and illustration components

---

## Rule 4 — Server vs Client Decision

```
Default to server component.

Only add "use client" when you specifically need:
  - useState
  - useEffect / useRef
  - useInView (custom IntersectionObserver hook)
  - Event handlers (onClick, onChange, onSubmit)
  - Browser APIs (window, document, sessionStorage)
  - Any third-party library that uses hooks
```

### The thin client wrapper pattern

Keep server components as server components. Create a minimal client wrapper
for interactivity only.

```tsx
// OurStorySection.tsx — stays a server component
import { OurStoryTimeline } from "./OurStoryTimeline"
import type { StoryMilestone } from "@/types/sanity"

interface OurStorySectionProps {
  milestones: StoryMilestone[]
}

export function OurStorySection({ milestones }: OurStorySectionProps) {
  return (
    <section id="our-story" className="py-20 bg-blush">
      <h2 className="font-serif text-3xl text-ink text-center mb-12">Our Story</h2>
      <OurStoryTimeline milestones={milestones} />
    </section>
  )
}

// OurStoryTimeline.tsx — client component for scroll animations only
"use client"
import { useInView } from "@/hooks/useInView"

export function OurStoryTimeline({ milestones }: { milestones: StoryMilestone[] }) {
  return (
    <ul className="space-y-8 max-w-2xl mx-auto px-4">
      {milestones.map((milestone, index) => (
        <StoryMilestoneCard
          key={milestone._id}
          milestone={milestone}
          delay={index * 100}
        />
      ))}
    </ul>
  )
}
```

---

## Rule 5 — File Naming

```
Component files:      PascalCase.tsx      HeroSection.tsx
Illustration files:   PascalCase.tsx      FloralCorner.tsx
Hook files:           camelCase.ts        useInView.ts
Utility files:        kebab-case.ts       format-date.ts
Constant files:       kebab-case.ts       site-config.ts
```

---

## Rule 6 — Custom Hooks for Reusable Logic

Any hook logic used in more than one component becomes a custom hook.

```tsx
// WRONG — IntersectionObserver logic copy-pasted in every animated component
"use client"
export function OurStoryCard() {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)
  useEffect(() => { /* observer setup */ }, [])
}

// CORRECT — extracted to a reusable hook
// /hooks/useInView.ts
export function useInView(threshold = 0.15) { ... }

// Used cleanly in any component
"use client"
import { useInView } from "@/hooks/useInView"
export function OurStoryCard() {
  const { ref, isInView } = useInView()
  ...
}
```

Custom hooks:
- Live in `/hooks/`
- Always prefixed with `use`
- Named in camelCase: `useInView.ts`, `useRSVPForm.ts`

---

## Rule 7 — Component Size Limit

**Maximum 150 lines per component file.**

If a component exceeds 150 lines it is doing too much. Split it.

```
// A 300-line RSVPSection is wrong.
// Split into:

RSVPSection.tsx     → parent, section wrapper, title (~30 lines)
RSVPForm.tsx        → form fields, react-hook-form logic (~100 lines)
RSVPSuccess.tsx     → success state display (~30 lines)
```

**Illustration components** are exempt from the 150-line limit if the SVG path
data genuinely requires more — but split at 250 lines maximum.

---

## Rule 8 — Prop Drilling Limit

Maximum 2 levels of prop passing.

```
Page → SectionA → ComponentB ✅ (2 levels — acceptable)
Page → SectionA → ComponentB → ComponentC ❌ (3 levels — refactor)
```

Beyond 2 levels — restructure the component tree.

---

## Rule 9 — Single Responsibility

Each component does one thing.

If you describe a component with the word **"and"** — it is doing too much.

```
❌ "A card that shows hotel info AND handles hover animation
    AND opens a booking modal AND tracks click analytics"

✅ "A card that displays hotel information"
```

---

## Illustration Components — Additional Rules

```tsx
// FloralCorner.tsx — example pattern
interface FloralCornerProps {
  className?: string
  "aria-hidden"?: boolean | "true" | "false"
}

export function FloralCorner({
  className,
  "aria-hidden": ariaHidden = "true",
}: FloralCornerProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={cn("w-full h-auto", className)}
      aria-hidden={ariaHidden}
      fill="none"
    >
      {/* SVG paths here — use currentColor for stroke so Tailwind text- classes work */}
      <path stroke="currentColor" strokeWidth="1.5" d="..." />
    </svg>
  )
}
```

- Always `aria-hidden="true"` by default — illustrations are decorative
- Always `viewBox` with no `width`/`height` attributes — fluid sizing
- Use `currentColor` for stroke/fill where possible — colour driven by Tailwind `text-*` classes
- Keep under 250 lines — split into sub-components if the SVG is more complex

---

## Complete Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Component files | PascalCase.tsx | HeroSection.tsx |
| Illustration files | PascalCase.tsx | FloralCorner.tsx |
| Custom hooks | camelCase.ts | useInView.ts |
| Utilities | kebab-case.ts | format-date.ts |
| Constants | SCREAMING_SNAKE | MAX_GUEST_COUNT |
| Types / Interfaces | PascalCase | HotelCardProps |
| API routes | kebab-case | /api/rsvp |
| Supabase tables | snake_case | rsvps |
| Sanity schemas | camelCase | faqItem |
| Git branches | kebab-case | task/hero-section |
| Env variables | SCREAMING_SNAKE | RESEND_API_KEY |
