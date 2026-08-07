# 08 — Accessibility (WCAG 2.1 AA)

## Core Principle

This site must meet WCAG 2.1 AA. It is a personal site but the guests
reading it will span ages and abilities. Accessibility also affects
mobile usability and SEO. It is not optional.

A site must be:
- **Perceivable** — users can see or hear the content
- **Operable** — users can navigate using keyboard or assistive tech
- **Understandable** — content and interactions make sense
- **Robust** — works across browsers and assistive technologies

---

## Rule 1 — Semantic HTML

Use the right HTML element for the right job. Never wrap everything in divs.

```tsx
// WRONG
<div onClick={handleClick}>
  <div className="text-2xl">Our Story</div>
  <div>We met in 2019...</div>
  <div onClick={openRSVP}>RSVP Now</div>
</div>

// CORRECT
<section aria-labelledby="our-story-heading">
  <h2 id="our-story-heading">Our Story</h2>
  <p>We met in 2019...</p>
  <a href="#rsvp">RSVP Now</a>
</section>
```

### Correct element usage

```
<header>      → site header if present
<nav>         → navigation (e.g., a floating section nav)
<main>        → primary page content — one per page, id="main-content"
<section>     → thematic grouping with aria-labelledby pointing to heading
<article>     → self-contained entry (story milestone card, FAQ item)
<footer>      → site footer
<h1>–<h6>    → headings in correct hierarchy — only one h1 per page
<button>      → actions (toggle, submit, open modal)
<a>           → navigation to a URL or in-page anchor
<ul> / <ol>  → lists (milestones, hotels, FAQ items)
```

### Button vs anchor

```tsx
// Use <a> when navigating to a section or URL
<a href="#rsvp">RSVP Now</a>

// Use <button> when performing an action
<button onClick={toggleAccordion}>What is the dress code?</button>

// WRONG — div as interactive element (keyboard users cannot use this)
<div onClick={toggleAccordion}>What is the dress code?</div>
```

---

## Rule 2 — Heading Hierarchy

Every page must have exactly one `<h1>`. Headings flow in order.
Never skip a level. Never use headings for visual sizing.

```tsx
// CORRECT — one h1 in the Hero, h2 for each section
<h1>Nii & Naa</h1>           // Hero
  <h2>Our Story</h2>          // Our Story section
  <h2>Event Details</h2>      // Event Details section
    <h3>Ceremony</h3>         // Ceremony card
    <h3>Reception</h3>        // Reception card
  <h2>Travel & Stay</h2>
  <h2>RSVP</h2>
  <h2>Registry</h2>
  <h2>FAQ</h2>
    <h3>What is the dress code?</h3>  // FAQ question as h3

// WRONG — heading used for visual size only
<h4 className="text-4xl">Big decorative text</h4>

// CORRECT — use p with Tailwind for visual sizing
<p className="text-4xl font-script">Big decorative text</p>
```

---

## Rule 3 — Image and SVG Alt Text

Every `<img>` needs meaningful `alt`. Every `<Image>` needs meaningful `alt`.
Decorative SVG illustrations must be `aria-hidden="true"`.

```tsx
// Decorative SVG illustrations — always aria-hidden
<FloralCorner aria-hidden="true" className="text-rose w-24" />
<Monogram aria-hidden="true" className="text-ink w-16" />

// If an SVG carries meaning (e.g., a location pin icon in a button)
<button aria-label="View map">
  <LocationPinIcon aria-hidden="true" className="h-5 w-5" />
</button>

// next/image usage (rare in this project — no photography)
// If used for OG image preview or favicon-adjacent use:
<Image
  src="/og-default.jpg"
  alt="Nii & Naa — Wedding Invitation — 27 September 2026"
  width={1200}
  height={630}
/>
```

---

## Rule 4 — Colour Contrast

```
Normal text (below 18px):   4.5:1 contrast ratio minimum
Large text (18px+ or bold): 3:1 contrast ratio minimum
UI components / focus ring: 3:1 minimum
```

**Project palette verification required:**
- `ink #3A2A22` on `ivory #FBF9F4` — verify at webaim.org/resources/contrastchecker
- `taupe #8A7267` on `ivory #FBF9F4` — check for muted text use cases
- `ivory #FBF9F4` on `rose #B56A52` (pill buttons) — verify
- `rose #B56A52` on `ivory #FBF9F4` — verify for link/accent text

**Never use text opacity below 80%:**
```tsx
// RISKY
<p className="text-ink/50">   // ink at 50% — may fail contrast
<p className="text-taupe/70"> // likely fails

// SAFE — use the full token at intended use
<p className="text-taupe">    // full taupe for muted text
<p className="text-ink">      // full ink for body text
```

---

## Rule 5 — Keyboard Navigation

Every interactive element must be reachable and operable by keyboard.

```tsx
// WRONG — not keyboard accessible
<div onClick={openAccordion} className="cursor-pointer">What is the dress code?</div>

// CORRECT — button is keyboard accessible by default
<button onClick={openAccordion} className="w-full text-left">
  What is the dress code?
</button>
```

### Focus indicators — never remove

```tsx
// WRONG — removes focus ring entirely
<button className="outline-none focus:outline-none">

// CORRECT — style it but never remove it
<button className="focus:outline-none focus-visible:ring-2
                   focus-visible:ring-rose focus-visible:ring-offset-2
                   focus-visible:ring-offset-ivory">
```

---

## Rule 6 — ARIA Labels

When semantic HTML alone is not enough:

```tsx
// Icon-only buttons — always need label
<button aria-label="Close">
  <XIcon aria-hidden="true" className="h-5 w-5" />
</button>

// Section with heading — associate them
<section aria-labelledby="rsvp-heading">
  <h2 id="rsvp-heading">RSVP</h2>
  ...
</section>

// RSVP form live region — announce success/error to screen readers
<div aria-live="polite" aria-atomic="true">
  {status === "success" && <p>Your RSVP has been received!</p>}
  {status === "error"   && <p>Something went wrong. Please try again.</p>}
</div>
```

---

## Rule 7 — Form Accessibility

Every input must have an associated label. Placeholder is not a label.

```tsx
// WRONG
<input type="text" placeholder="Your name" />

// CORRECT
<div className="flex flex-col gap-1">
  <label htmlFor="name" className="text-sm font-sans text-taupe">
    Full name
  </label>
  <input
    id="name"
    type="text"
    placeholder="Your name"
    aria-describedby={errors.name ? "name-error" : undefined}
    aria-invalid={!!errors.name}
    className={cn("px-4 py-3 rounded-xl border", errors.name && "border-rose")}
  />
  {errors.name && (
    <p id="name-error" className="text-sm text-rose" role="alert">
      {errors.name.message}
    </p>
  )}
</div>
```

### RSVP form honeypot field — accessibility note

The honeypot field must be completely hidden from screen readers and keyboard:

```tsx
<input
  type="text"
  {...register("_honeypot")}
  aria-hidden="true"
  tabIndex={-1}
  className="absolute left-[-9999px] opacity-0 pointer-events-none"
  autoComplete="off"
/>
```

---

## Rule 8 — Reduced Motion

Some users have vestibular disorders where motion causes physical discomfort.

```css
/* globals.css — covers all CSS animations and transitions */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

For `useInView`-based reveals, also start as already-visible:
```tsx
const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

const [isInView, setIsInView] = useState(prefersReducedMotion)
```

**Background video — CSS media query is NOT enough.** `prefers-reduced-motion` in CSS cannot pause `<video autoplay>`. A JS `matchMedia` check in `useEffect` is required:

```tsx
// HeroVideo.tsx
"use client"
import { useEffect, useRef } from "react"

export function HeroVideo({ src, poster }: { src: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches && videoRef.current) {
      videoRef.current.pause()
    }
  }, [])

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-cover"
    />
  )
}
```

The `aria-hidden="true"` on the video element means screen readers skip it entirely — the decorative motion is the only concern, handled by the JS pause.

---

## Rule 9 — Skip Navigation Link

A hidden link at the top of every page letting keyboard users skip
straight to main content.

```tsx
// app/layout.tsx — first element in the body
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4
             focus:left-4 focus:z-50 focus:px-4 focus:py-2
             focus:bg-rose focus:text-ivory focus:rounded-lg"
>
  Skip to main content
</a>

// app/page.tsx
<main id="main-content">
  ...
</main>
```

---

## Checklist Before Marking Any Component Complete

- [ ] Correct semantic HTML elements used
- [ ] Heading hierarchy correct — no skipped levels
- [ ] All decorative SVGs have `aria-hidden="true"`
- [ ] All icon-only buttons have `aria-label`
- [ ] All form inputs have associated labels via `htmlFor`/`id`
- [ ] All form errors use `role="alert"` and `aria-describedby`
- [ ] Colour contrast verified for text on backgrounds
- [ ] All interactive elements reachable by keyboard
- [ ] Focus indicators visible — not removed with `outline-none` alone
- [ ] CSS animations respect `prefers-reduced-motion`
- [ ] Background video pauses under `prefers-reduced-motion` (JS `matchMedia` check in `useEffect`)
- [ ] Skip navigation link present in root layout
- [ ] RSVP form live region announces success/error to screen readers
