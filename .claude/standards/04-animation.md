# 04 — Animation Standard

## Core Principle

GSAP (ScrollTrigger, SplitText) + Lenis (smooth scroll). No Framer Motion. No
IntersectionObserver for animation triggers. Animation must be cinematic,
progressive, and fully reduced-motion-safe.

This supersedes the earlier CSS + useInView approach. The shift is deliberate —
see `13-dependencies.md` for context and approved package list.

---

## The Tool Stack

| Tool | Responsibility | Never Use For |
|---|---|---|
| GSAP core | Tweening, timelines, kinetic transitions | Layout — only visual properties |
| GSAP ScrollTrigger | Scroll-driven triggers and scrubbing | Replacing Lenis (Lenis stays for smooth scroll feel) |
| GSAP SplitText | Character/word/line text splitting for stagger reveals | Body copy — headings and display text only |
| GSAP matchMedia | Responsive animation contexts + reduced-motion gating | Breakpoint layout changes (use Tailwind for that) |
| Lenis (ReactLenis root) | Smooth scrolling — intercepts native scroll and applies easing | Animation triggering — use ScrollTrigger for that |
| tailwindcss-animate | Simple discrete UI states: accordion, modal, toast | Scroll-triggered animations |
| Three.js | Hero particle system WebGL layer | Any other section — Hero only, lazy-loaded |

**Framer Motion is permanently banned.** See `.claude/project/known-issues.md`.
**`useInView` hook is retired.** It has been deleted. Do not re-create it.

---

## Plugin Registration

All GSAP plugins must be registered once, centrally, in `lib/gsap.ts`:

```ts
// lib/gsap.ts
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(ScrollTrigger, SplitText)
gsap.ticker.lagSmoothing(0) // prevents GSAP lag-compensation stacking on Lenis easing

export { gsap, ScrollTrigger, SplitText }
```

**Import GSAP only from `@/lib/gsap`**, never directly from `"gsap"` or
`"gsap/ScrollTrigger"` in component files. This guarantees plugins are always
registered before use and prevents duplicate registration.

---

## Lenis + ScrollTrigger Integration

`ReactLenis root` (current setup) runs Lenis in **native scroll mode**: it
updates `window.scrollY` directly rather than applying CSS transforms to a
virtual container. ScrollTrigger reads `window.scrollY` natively — no
`scrollerProxy()` wrapper is needed.

The one timing issue: Lenis applies easing per-frame, so the scroll position it
commits to the DOM may lag one tick behind when ScrollTrigger fires its
recalculation. Fix: call `ScrollTrigger.update()` inside Lenis's scroll
callback, via a syncer child inside `LenisProvider`:

```tsx
// components/providers/LenisProvider.tsx
import { ReactLenis, useLenis } from "lenis/react"
import { ScrollTrigger } from "@/lib/gsap"

function ScrollTriggerSyncer() {
  useLenis(() => ScrollTrigger.update())
  return null
}

export function LenisProvider({ children }) {
  return (
    <ReactLenis root options={{ duration: 1.2 }}>
      <ScrollTriggerSyncer />
      {children}
    </ReactLenis>
  )
}
```

`gsap.ticker.lagSmoothing(0)` is set in `lib/gsap.ts` at module load — this
prevents GSAP's own lag compensation from stacking on top of Lenis's easing.

No RAF loop conflict: `ReactLenis root` and GSAP each run their own RAF. Both
are passive read-modify cycles; there is no render contention.

---

## Reduced Motion — gsap.matchMedia()

All animations must be wrapped in a `gsap.matchMedia()` context. This is the
canonical GSAP pattern — it automatically reverses/cleans up contexts when the
media query changes, and it handles reduced-motion correctly without brittle
`window.matchMedia` polling.

```ts
// Standard pattern — use in every component that animates
import { gsap } from "@/lib/gsap"

useGSAP(() => {
  const mm = gsap.matchMedia()

  mm.add(
    {
      isDesktop: "(min-width: 768px)",
      reducedMotion: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      const { isDesktop, reducedMotion } = context.conditions!

      if (reducedMotion) {
        // Show final state immediately — no animation at all
        gsap.set(target, { opacity: 1, y: 0 })
        return
      }

      if (isDesktop) {
        // Desktop animation
      } else {
        // Mobile animation (or none)
      }
    }
  )

  return () => mm.revert()
}, { scope: containerRef })
```

**Never** use `window.matchMedia` directly in animation code. Always use
`gsap.matchMedia()` — it handles resize, SSR safety, and cleanup automatically.

Under `prefers-reduced-motion: reduce`:
- Show the element in its final visible state immediately (`gsap.set`)
- Do not play any timeline or tween
- Do not skip the Three.js particle layer with an opacity-0 trick — skip the
  entire component (conditional render, not hidden render)

---

## Pattern 1 — ScrollTrigger Triggered-Once Reveal

Use for: element entrances where the animation fires once and stays. Does not
reverse on scroll-back.

```tsx
"use client"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export function SomeCard({ delay = 0 }: { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none none", // fired once, never reverses
          },
        }
      )
    })
    // Under reduced motion: gsap.matchMedia automatically runs no animation
    // and the element is visible via CSS default (no opacity:0 initial state in JSX)
  }, { scope: ref })

  return <div ref={ref}>...</div>
}
```

**Initial visibility**: Do NOT set `opacity: 0` as a Tailwind class on the
element. GSAP's `fromTo` sets the from-state in JS, after hydration, so there
is no SSR flash. Under reduced-motion the `mm.add` for no-preference never
fires, the element is never set to `opacity:0`, and it renders visibly from
mount.

---

## Pattern 2 — ScrollTrigger Scrubbed Animation

Use for: animations tied precisely to scroll progress (0 → 1 as the trigger
passes through the viewport). Creates the cinematic "as you scroll" feel.

```tsx
useGSAP(() => {
  const mm = gsap.matchMedia()
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.to(element, {
      x: -totalWidth,
      ease: "none", // linear is required for scrub — eased scrub feels wrong
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: 1,        // 1s lag between scroll and animation — prevents jitter
        pin: true,       // pins the section in the viewport
        anticipatePin: 1,
      },
    })
  })
}, { scope: containerRef })
```

---

## Pattern 3 — SplitText Stagger Reveal

Use for: headings and display copy character-by-character or word-by-word
entrance. **Client-only** — SplitText manipulates the DOM and must never run
during SSR.

```tsx
"use client"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap, SplitText } from "@/lib/gsap"

export function AnimatedHeading({ children }: { children: string }) {
  const ref = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const split = new SplitText(ref.current, { type: "chars,words" })
      gsap.from(split.chars, {
        opacity: 0,
        y: 24,
        stagger: 0.03,
        duration: 0.6,
        ease: "power3.out",
      })
      return () => split.revert() // cleanup: restores original DOM
    })
  }, { scope: ref })

  return <h1 ref={ref}>{children}</h1>
}
```

`split.revert()` in the cleanup is mandatory — it restores the original text
DOM so that React's reconciliation does not fight with SplitText's injected
`<div>` wrappers.

---

## Pattern 4 — Responsive Animation via matchMedia

Use for: different animations on desktop vs mobile, or desktop-only pinning.

```ts
const mm = gsap.matchMedia()

mm.add(
  {
    isMobile: "(max-width: 767px)",
    isDesktop: "(min-width: 768px)",
    reducedMotion: "(prefers-reduced-motion: reduce)",
  },
  (context) => {
    const { isMobile, isDesktop, reducedMotion } = context.conditions!

    if (reducedMotion) { /* show final state, return */ }
    if (isDesktop) { /* pin + horizontal scroll */ }
    if (isMobile) { /* simple fade or nothing */ }
  }
)
```

The cleanup function returned from the `mm.add` callback runs automatically
when the media query no longer matches (e.g. window resize crosses 768px).
ScrollTriggers created inside the callback are automatically killed and
re-created when the query re-matches.

---

## useGSAP Hook

Always use `useGSAP` from `@gsap/react` instead of `useEffect` for GSAP
animations. It provides:
- Automatic cleanup of all tweens and ScrollTriggers created inside it
- Correct timing relative to React's commit phase
- `scope` option for scoped selector queries

```tsx
import { useGSAP } from "@gsap/react"
// GSAP registers this automatically — no manual registration needed
```

**Never** create GSAP tweens in a raw `useEffect`. The cleanup is unreliable and
leaked ScrollTrigger instances accumulate on every re-render.

---

## Three.js (Hero only)

Three.js is imported exclusively in `components/sections/HeroParticles.tsx` and
loaded via Next.js dynamic import with `ssr: false`:

```tsx
// In HeroSection.tsx
const HeroParticles = dynamic(
  () => import("@/components/sections/HeroParticles"),
  { ssr: false }
)
```

**Render conditions** (all three must be true):
1. `typeof window !== "undefined"` (client only)
2. WebGL available: `canvas.getContext("webgl") || canvas.getContext("experimental-webgl")`
3. `!window.matchMedia("(prefers-reduced-motion: reduce)").matches`

If any condition fails, `HeroParticles` returns `null` — no error, no fallback.

---

## Transition Duration Reference

```
30–50ms  → micro-interaction, icon swap
150ms    → tooltip, fast feedback
200–300ms → UI state (accordion, modal, dropdown)
500–700ms → scroll-reveal entrances
800ms–1.2s → hero headline SplitText stagger (full sequence, not per-char)
```

---

## What Never To Do

- Never install or import `framer-motion` — permanently banned
- Never import GSAP directly from `"gsap"` in component files — always `"@/lib/gsap"`
- Never use `useEffect` for GSAP animations — use `useGSAP` from `@gsap/react`
- Never re-create `useInView` — it has been retired; use ScrollTrigger
- Never add a second smooth-scroll library alongside Lenis
- Never add `scroll-snap` to any container
- Never create a ScrollTrigger without a cleanup path (useGSAP handles this)
- Never load Three.js in the main bundle — dynamic import only
- Never animate under `prefers-reduced-motion: reduce` — show final state via `gsap.set` or skip entirely
