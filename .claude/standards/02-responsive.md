# 02 — Responsive Design & Mobile

## Core Principle

Mobile-first always. Every component is built for mobile first,
then scaled up to larger screens. Never build desktop-first and shrink down.

Guests will primarily open this wedding invitation on their phones.
Mobile is not a secondary concern — it is the primary target.

---

## Tailwind Breakpoint System

```
Default (no prefix) → mobile:  0px – 639px
sm:                 → small:   640px and up
md:                 → medium:  768px and up
lg:                 → large:   1024px and up
xl:                 → xlarge:  1280px and up
```

---

## Rules — Apply to Every Component

### Layout
- Always start with the mobile layout, then scale up with breakpoint prefixes
- Grid columns must stack on mobile, expand on larger screens
  ```
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  ```
- Flex layouts must wrap on mobile
  ```
  flex flex-wrap md:flex-nowrap
  ```
- Never use fixed widths on layout containers — use `w-full` and `max-w-*`

### Spacing
- Padding and margin must scale — tighter on mobile, generous on desktop
  ```
  px-4 md:px-8 lg:px-16
  py-12 md:py-20 lg:py-28
  ```

### Typography
- Font sizes must scale — smaller on mobile, larger on desktop
  ```
  text-2xl md:text-4xl lg:text-6xl
  text-base md:text-lg
  ```
- Dancing Script headings especially — clamp or scale carefully on small screens
- Line height and letter spacing adjust at breakpoints where needed

### Navigation / Anchor Links
- All section `id` attributes must be present for in-page navigation
- No traditional hamburger nav — this is a single scrolling page
- Any floating nav or "back to top" button must have 44px minimum touch target

### Images and Illustrations
- SVG illustration components must scale responsively — never fixed pixel sizes
- Use `w-full h-auto` for fluid SVG sizing, constrained by parent `max-w-*`
- SVGs used as section separators must not create horizontal overflow at any width

### Touch Targets
- All interactive elements minimum 44px height on mobile
- Buttons and links must have sufficient padding for touch
  ```
  min-h-[44px] px-4 py-3
  ```
- RSVP form inputs must be at least 44px tall — easy to tap

### Overflow
- No horizontal scrolling on any screen size — ever
- Check `overflow-x-hidden` is set on root layout if needed
- Cards and illustration containers must not overflow at 375px

---

## Test Breakpoints Before Marking Any Task Complete

Test every component at these sizes before marking done:

| Size | Device |
|---|---|
| 375px | iPhone SE / small phones — smallest target |
| 390px | iPhone 14 |
| 768px | iPad |
| 1280px | Desktop |

**How to test in Chrome:**
1. Right click → Inspect
2. Click the phone/tablet icon in DevTools
3. Select device preset or enter custom width
4. Scroll through every section
5. Check horizontal overflow at every size

---

## Mobile Performance

- Animation complexity reduced via `prefers-reduced-motion` media query
- Scroll-triggered reveals via Intersection Observer — no layout cost
- Heavy below-fold sections dynamically imported where applicable

---

## Common Mistakes to Avoid

- Using `px-8` without a mobile-first `px-4` — always define mobile first
- Fixed pixel widths on containers — use `w-full max-w-*`
- SVG illustrations with `width` attribute set — use `className="w-full h-auto"` instead
- Touch targets under 44px — form fields and buttons that are hard to tap on phones
- Horizontal overflow from wide SVG artboards — always test at 375px
- Dancing Script at too large a size on narrow screens — scale with `clamp()` or breakpoints
