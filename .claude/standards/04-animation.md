# 04 — Animation Standard

## Core Principle

CSS transitions, Intersection Observer, and Lenis (smooth scroll). No Framer Motion.
Animation must be lightweight, progressive, and fully reduced-motion-safe.

---

## The Three Tools — One Responsibility Each

| Tool | Responsibility | Never Use For |
|---|---|---|
| CSS transitions + keyframes | Entrance animations, scroll reveals, hover states, section transitions | Complex state machines, counters |
| Intersection Observer (`useInView` hook) | Triggering entrance animations when elements scroll into view | Framer-Motion-style declarative animation props |
| Tailwind Animate | Simple UI states: accordion open/close, modal fade, button press, toast slide-in | Scroll-triggered animations |

**Framer Motion is permanently banned.** See `.claude/project/known-issues.md` for the documented reason.
**Lenis is the scroll provider.** Initialized via `LenisProvider` (`lenis/react` → `ReactLenis root`) in `app/layout.tsx`. It intercepts anchor clicks and applies a negative offset matching the fixed nav height so headings clear the nav. Do not set `scroll-behavior: smooth` in CSS — Lenis owns smooth scrolling and the two will double-ease. IntersectionObserver and `useInView` are unaffected because Lenis drives native DOM scroll position, not a CSS transform virtual scroll.

---

## Why Not Framer Motion

Framer Motion 12.x (deduped from `@sanity/ui → motion`) fails to hydrate correctly
on React 19 in Next.js App Router production builds on Vercel. Elements rendered with
`style="opacity:0"` during SSR remain permanently invisible because `useLayoutEffect`
inside Framer Motion never fires on the client after React 19's adoption of the server DOM.

The fix is CSS animations — they apply at the browser paint level, independent of React
hydration. There is no React 19 hydration failure possible with pure CSS.

---

## Pattern 1 — CSS Entrance Animations (Scroll Reveals)

Use the `useInView` custom hook to trigger a CSS class addition when an element enters
the viewport. The animation is defined in Tailwind config or `globals.css`.

```tsx
// hooks/useInView.ts
import { useEffect, useRef, useState } from "react"

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect() // fires once only
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}
```

```tsx
// Usage in a section component
"use client"
import { useInView } from "@/hooks/useInView"

export function OurStoryCard({ milestone }: { milestone: StoryMilestone }) {
  const { ref, isInView } = useInView()

  return (
    <div
      ref={ref}
      className={cn(isInView ? "animate-fade-up opacity-0" : "opacity-0")}
    >
      <p>{milestone.title}</p>
    </div>
  )
}
```

**Never use CSS transitions for scroll reveals.** `transition-all` + class toggle
(`opacity-0 translate-y-6` ↔ `opacity-100 translate-y-0`) silently breaks when the
IntersectionObserver fires close to the React hydration moment — the browser has no
stable "before" paint to transition from so the property change is invisible. CSS
keyframe animations are driven independently of the paint cycle and do not have this
failure mode. See `known-issues.md` (Sprint 1) for the full diagnosis.

### Staggered entrance (multiple cards)

Pass `delay` as a prop and apply it as `animationDelay` inline style — this is an
acceptable inline style exception (dynamic runtime value that cannot be a Tailwind class):

```tsx
{milestones.map((milestone, index) => (
  <StoryCard
    key={milestone._id}
    milestone={milestone}
    delay={index * 150}
  />
))}
```

```tsx
interface StoryCardProps {
  milestone: StoryMilestone
  delay?: number
}

export function StoryCard({ milestone, delay = 0 }: StoryCardProps) {
  const { ref, isInView } = useInView()

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={cn(isInView ? "animate-fade-up opacity-0" : "opacity-0")}
    >
      ...
    </div>
  )
}
```

**How `opacity-0` + `animate-fade-up` works together:**
- `isInView = false` → class `opacity-0`. Hidden. No animation.
- `isInView = true` → class `animate-fade-up opacity-0`. During the `animationDelay`
  period, `opacity-0` keeps the element hidden (fill mode is `forwards`, not `backwards`,
  so no keyframe fires until the animation starts). When the animation runs, its keyframes
  override the class. After completion, `forwards` fill retains `opacity: 1` permanently,
  overriding the `opacity-0` class.

---

## Pattern 2 — CSS Keyframe Animations (Hero Entrance)

Above-the-fold animations (Hero section) should play on mount using CSS keyframes,
not on scroll. Define keyframes in `tailwind.config.ts` or `globals.css`:

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      animation: {
        "fade-up":       "fade-up 0.8s ease-out forwards",
        "fade-up-delay": "fade-up 0.8s ease-out 0.3s forwards",
        "fade-in":       "fade-in 0.6s ease-out forwards",
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
}
```

```tsx
// HeroSection.tsx — Server Component, CSS-only animations
export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-svh">
      <p className="animate-fade-in font-sans text-sm text-taupe tracking-widest uppercase">
        You are invited
      </p>
      <h1 className="animate-fade-up font-script text-5xl md:text-7xl text-ink">
        Nii & Naa
      </h1>
      <p className="animate-fade-up-delay font-serif text-xl text-taupe">
        2 January 2027
      </p>
    </section>
  )
}
```

Using `forwards` on the animation means the element stays at its final state
after the animation completes — no need for React state.

---

## Pattern 3 — Tailwind Animate (UI States)

Use `tailwindcss-animate` for simple, discrete UI state transitions that are not
scroll-triggered — accordion, modal, toast, button feedback.

**FAQ Accordion open/close:**
```tsx
<div className={cn(
  "overflow-hidden transition-all duration-300 ease-in-out",
  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
)}>
  <p className="pb-4 text-taupe">{answer}</p>
</div>
```

**Modal fade-in:**
```tsx
<div className="animate-in fade-in zoom-in-95 duration-200">
  <Modal />
</div>
```

**Toast slide-in:**
```tsx
<div className="animate-in slide-in-from-bottom-4 duration-300">
  <Toast message="RSVP received!" />
</div>
```

**Loading spinner:**
```tsx
<div className="animate-spin h-5 w-5 border-2 border-hairline border-t-rose rounded-full" />
```

---

## Pattern 4 — Canonical: Scroll Reveal with Decorative Element Inside

The most common component pattern on this site is a section card that both
scroll-reveals AND contains a decorative element (SVG or icon) inside the
same animated wrapper. This is the reference implementation all section
authors should follow.

> **Note (design pass, 07/08/2026):** `EventDetailsCard` was the original
> Pattern 4 reference but was retired when EventDetails was reworked into a
> single vertical timeline. The canonical reference is now `EventTimelineStep`.

```tsx
// EventTimelineStep.tsx — canonical combined pattern
"use client"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"
import type { ItineraryItem } from "@/types/sanity"

interface EventTimelineStepProps {
  event: ItineraryItem
  delay?: number
  isAnchor?: boolean
  isLast?: boolean
}

export function EventTimelineStep({ event, delay = 0, isAnchor = false, isLast = false }: EventTimelineStepProps) {
  const { ref, isInView } = useInView()

  return (
    <li className={cn("relative pl-12 md:pl-14", !isLast && "pb-10")}>
      {/* Connector line — aria-hidden decorative, independent of animation state */}
      {!isLast && (
        <span
          aria-hidden="true"
          className="absolute left-[15px] top-8 bottom-0 w-px bg-gradient-to-b from-rose/50 to-rose/10"
        />
      )}
      {/* Circle icon — aria-hidden, animates in WITH the content (correct: belongs to step) */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full border-2",
          isAnchor ? "bg-rose border-rose" : "bg-ivory border-rose/40"
        )}
      >
        <span className={cn("block w-2 h-2 rounded-full", isAnchor ? "bg-ivory" : "bg-rose/50")} />
      </span>
      {/* Animated content wrapper — ref on this div, not the <li> */}
      <div
        ref={ref}
        style={{ animationDelay: `${delay}ms` }}
        className={cn(isInView ? "animate-fade-up opacity-0" : "opacity-0")}
      >
        <h3 className="font-serif text-xl text-ink">{event.name}</h3>
        <p className="font-sans text-sm text-taupe mt-1">{event.time}</p>
      </div>
    </li>
  )
}
```

### Why this is safe — three axes confirmed independent

**1. aria-hidden vs animation state**
`aria-hidden="true"` is a DOM attribute — it removes the element from the
accessibility tree permanently, independent of any CSS property on itself
or its ancestors. `opacity:0` on the wrapper has no effect on this. The SVG
is always excluded from the accessibility tree, exactly as intended.

**2. Reduced motion vs aria-hidden**
When `prefersReducedMotion` is `true`, `useInView` initialises `isInView`
as `true`, so the wrapper renders at `opacity-100 translate-y-0` immediately.
The SVG renders immediately too — not because it is decorative, but because
the whole wrapper is visible from mount. These are independent axes: reduced
motion controls whether the wrapper animates; `aria-hidden` controls whether
the SVG is in the accessibility tree. Neither affects the other.

**3. The SVG animates in with the card — intentional**
Placing the `FloralCorner` inside the animated wrapper means it enters
visually together with the card content. This is the correct visual design:
the decoration belongs to the card, not to the section background. If a
decoration should persist while content fades in (e.g., a fixed background
floral), position it outside and above the animated div in the server
component wrapper.

---

## Transition Duration Reference

```
150ms → tooltip, very fast micro-interaction
200ms → dropdown, fast UI feedback
300ms → modal open/close, accordion, standard transitions
500ms–700ms → section entrance animations
800ms → hero headline entrance (above the fold)
```

---

## Reduced Motion — Mandatory

All entrance animations must respect `prefers-reduced-motion`.

**CSS approach (globals.css — covers everything):**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Tailwind approach (on individual animated elements):**
```tsx
className="animate-fade-up motion-reduce:animate-none motion-reduce:opacity-100"
```

**Intersection Observer approach:**
For `useInView`-based reveals, the initial `opacity-0 translate-y-6` state
may still flash before the media query kicks in. Add this to the hook:

```tsx
// hooks/useInView.ts — enhanced with reduced motion support
const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  // If reduced motion, start as visible — no animation at all
  const [isInView, setIsInView] = useState(prefersReducedMotion)
  ...
}
```

---

## What Never To Do

- Never install or import `framer-motion` — permanently banned
- Never add a second smooth-scroll library alongside Lenis — one scroll provider only
- Never use `motion.*` components from any library
- Never use `@keyframes` in component files — keyframes belong in `globals.css` or `tailwind.config.ts`
- Never animate opacity without also handling `prefers-reduced-motion`
- Never start an Intersection Observer that fires more than once (`disconnect()` after first trigger)
- Never use scroll-snap — sections flow naturally without forced snap
