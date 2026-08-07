# 03 — Styling Rules

## Core Principle

Tailwind CSS only. No inline styles except for dynamic runtime values
that cannot be expressed as Tailwind classes. No CSS-in-JS. No custom
CSS files except `globals.css` for base styles and keyframes.

---

## The Rule

```
✅ Tailwind classes always
✅ Inline style only for dynamic runtime values
❌ style={{ }} for layout, spacing, colour, or typography
❌ styled-components, emotion, or any CSS-in-JS
❌ Custom CSS files except globals.css for base styles
```

---

## Acceptable Inline Style Exceptions

Only these cases justify inline styles:

**1. Dynamic runtime values Tailwind cannot know at build time:**
```tsx
// Width calculated from JavaScript at runtime
<div style={{ width: `${progressPercentage}%` }}>

// Animation delay driven by item index
<div style={{ transitionDelay: `${index * 80}ms` }}>
```

**2. CSS custom properties set dynamically:**
```tsx
// Animation speed controlled by props
<div style={{ '--duration': `${speed}ms` }}>
```

Everything else — layout, spacing, colour, typography, borders,
shadows, transitions — uses Tailwind.

---

## Tailwind Class Ordering

Always order classes consistently:

```
Layout → Spacing → Typography → Colour → Border → Animation → State
```

Example:
```tsx
className="flex flex-col gap-4 px-6 py-4 text-lg font-medium
           text-ink bg-ivory border border-hairline
           rounded-3xl transition-all duration-200
           hover:bg-blush focus:outline-none focus-visible:ring-2
           focus-visible:ring-rose focus-visible:ring-offset-2"
```

---

## The cn() Utility — Always Use for Conditional Classes

Never build className strings manually with template literals.
Always use the `cn()` utility from `clsx` + `tailwind-merge`:

```tsx
// /lib/utils.ts — create once
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

```tsx
// Usage — clean conditional classes
import { cn } from "@/lib/utils"

<button
  className={cn(
    "px-6 py-3 rounded-full font-medium transition-colors",
    variant === "primary" && "bg-rose text-ivory hover:bg-rose-dark",
    variant === "ghost" && "border border-rose text-rose hover:bg-blush",
    disabled && "opacity-50 cursor-not-allowed",
    className  // always accept external className prop on primitives
  )}
>
```

```tsx
// WRONG — never do this
className={`px-4 py-2 ${variant === "primary" ? "bg-rose" : "bg-ivory"}`}
```

---

## Tailwind Configuration

### Colour tokens — define once in tailwind.config.ts

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        ivory:     "#FBF9F4",
        blush:     "#F0DCD0",
        rose:      "#B56A52",
        "rose-dark": "#8A4E3C",
        ink:       "#3A2A22",
        taupe:     "#8A7267",
        hairline:  "#E4DFD3",
      },
      fontFamily: {
        script: ["var(--font-script)"],   // Dancing Script
        serif:  ["var(--font-serif)"],    // Cormorant Garamond
        sans:   ["var(--font-sans)"],     // Inter
      },
      borderRadius: {
        card: "28px",  // primary card radius
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

Always use colour tokens in classes — never hardcode hex in className:
```tsx
✅ className="bg-ivory text-ink border-hairline"
❌ className="bg-[#FBF9F4] text-[#3A2A22]"
```

Arbitrary values `bg-[#hex]` are acceptable only for genuine one-off values
not worth adding to the config (e.g., a subtle overlay at a precise opacity).

---

## globals.css — Base Styles and Keyframes Only

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  * {
    box-sizing: border-box;
  }

  body {
    background-color: theme('colors.ivory');
    color: theme('colors.ink');
    -webkit-tap-highlight-color: transparent;
    text-rendering: optimizeLegibility;
  }
}

/* Keyframes for CSS animations not expressible in Tailwind config */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Reduced motion — disable all animations */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Never put component styles in `globals.css`.
Use `globals.css` only for: base resets, CSS custom properties, keyframes
that Tailwind config cannot hold (e.g., multi-step animations).

---

## Hero Video Overlay Gradient

The Hero section uses a full-bleed background video with a dark gradient overlay for text legibility. Approved values:

```tsx
// HeroSection.tsx overlay div
className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/65"
```

- `from-black/30` at top → `to-black/65` at bottom keeps footage readable while ensuring `text-ivory` passes 4.5:1 AA over the overlaid text zone.
- These are arbitrary Tailwind opacity values — acceptable per the styling rule since no named token maps to an overlay at these specific opacities.
- If footage changes and legibility is affected, adjust only these two values.

---

## Dark Mode

This project does not use dark mode. Do not configure `darkMode` in Tailwind.
The palette is fixed: ivory background, ink text. Do not add dark variants.

---

## Never Do

- `style={{ padding: '16px' }}` — use `className="p-4"`
- `style={{ color: '#B56A52' }}` — use `className="text-rose"`
- `style={{ display: 'flex' }}` — use `className="flex"`
- Manual string concatenation for conditional classes
- Import CSS modules for component styles
- Use `!important` — fix specificity issues with Tailwind utilities instead
- Hardcode hex values in className when a token exists
