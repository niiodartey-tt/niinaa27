# 09 — Performance Standard

## Core Principle

Performance is built in from the start. This is a single scrolling page with
no photography and minimal JavaScript. It should be extremely fast by default.
The main performance concerns are: SVG/illustration weight, font loading, and
avoiding unnecessary JavaScript bundles.

---

## Core Web Vitals Targets

| Metric | Target | What It Measures |
|---|---|---|
| LCP | < 2.5 seconds | Largest element load time (likely the Hero heading) |
| INP | < 200ms | Response to user interaction (RSVP form) |
| CLS | < 0.1 | Layout shift during load |
| JS Bundle | < 300KB compressed | JavaScript weight |
| Total page weight | < 500KB | Very achievable with no photography |

Check before launch at: **pagespeed.web.dev**

---

## Rule 1 — Fonts (Critical — next/font Always)

### Always use next/font — never link to Google Fonts

```tsx
// app/layout.tsx
import { Dancing_Script, Cormorant_Garamond, Inter } from "next/font/google"

const script = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-script",
  weight: ["400", "700"],
})

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
})

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${script.variable} ${serif.variable} ${sans.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
```

Next.js font optimisation:
- Self-hosts Google Fonts — no external request, no privacy concern
- Preloads fonts so they arrive before render
- Prevents layout shift from font loading
- `display: "swap"` — shows fallback while loading, then swaps cleanly

**Only load the font weights actually used.** Loading unused weights adds bytes.
- Dancing Script: `["400", "700"]` — or just `["700"]` if only bold headings
- Cormorant Garamond: check actual weights used in design — don't load all six

---

## Rule 2 — SVG Illustrations (Primary Concern for This Project)

Since there is no photography, SVG illustrations are the main visual weight.

### Keep SVG components lean

```tsx
// WRONG — complex SVG with dozens of paths for a simple floral accent
// Each path adds bytes and GPU compositing cost

// CORRECT — minimal paths, same visual effect
// Aim for < 20 path elements per illustration component
// Use CSS/Tailwind for colour — not embedded style attributes
```

### Never embed raster images in SVGs

```tsx
// WRONG — PNG embedded in SVG defeats the point
<svg>
  <image href="data:image/png;base64,..." />
</svg>

// CORRECT — pure vector paths only
```

### Illustration sizing — fluid, not fixed

```tsx
// WRONG — fixed pixel dimensions, not responsive, may cause CLS
<FloralCorner style={{ width: "300px", height: "300px" }} />

// CORRECT — fills container, scales responsively
<div className="w-24 md:w-32">
  <FloralCorner className="w-full h-auto text-rose" />
</div>
```

### Repeated illustrations — consider memoisation

If the same illustration appears many times (e.g., LeafAccent used in every
hotel card), wrap in `React.memo` to avoid unnecessary re-renders.

---

## Rule 3 — next/image (Limited Use in This Project)

**There is no photography.** `next/image` is not a primary concern here.

The only contexts where `next/image` might be used:
- OG image preview (set via metadata, not rendered on page)
- A favicon or logo PNG in the footer (if not built as SVG)

If `next/image` is used in either case:
```tsx
import Image from "next/image"

// Footer monogram — if using PNG fallback
<Image
  src="/monogram.png"
  alt=""
  aria-hidden="true"
  width={64}
  height={64}
  priority  // if above the fold
/>
```

**Do not use `next/image` for decorative purposes** — use the SVG illustration
components instead. They are lighter, scalable, and colour-controllable via Tailwind.

If Sanity schemas are ever extended to include images (not planned), add
`cdn.sanity.io` to `remotePatterns` in `next.config.mjs` and use `urlFor()`.

---

## Rule 3b — Hero Video Budget

The Hero section background video is the only video on the site. It must be:

| Constraint | Value | Rationale |
|---|---|---|
| Resolution | 720p (1280×720) | Sufficient for background fill; 1080p doubles file size for no visible gain |
| Codec | H.264 (mp4) | Universal browser support; no WebM fallback needed at this budget |
| Duration | 6–10 seconds loop | Shorter loops → smaller file; longer loops → more natural |
| File size | ≤ 3 MB | Keeps total page weight under 500KB budget even with video added |
| Placement | `/public/hero-video.mp4` | Served as a static asset |
| Poster | `/public/hero-poster.jpg` | Shown before video loads; must be a single JPEG frame from the video |

**ffmpeg reference command (user handles compression):**
```bash
ffmpeg -i input.mp4 -vf scale=1280:720 -c:v libx264 -crf 28 -an -movflags +faststart output.mp4
```
- `-crf 28` — quality vs. size trade-off; lower = larger file. Increase to 30 if over 3 MB.
- `-an` — strips audio (no sound needed for background loop)
- `-movflags +faststart` — moov atom first, so video starts playing before fully downloaded

**LCP note:** With a video + poster, the LCP element shifts from the `<h1>` text to the poster image. Ensure the poster is ≤ 100 KB and specify `preload="metadata"` on the video element. The `HeroVideo` component already handles this.

---

## Rule 4 — Bundle Size — Dynamic Imports

The RSVP form is below the fold. It can be dynamically imported to keep
the initial page load lean.

```tsx
// app/page.tsx — dynamically import below-fold interactive sections
import dynamic from "next/dynamic"

const RSVPSection = dynamic(
  () => import("@/components/sections/RSVPSection"),
  { loading: () => <div className="h-96 bg-blush animate-pulse rounded-3xl" /> }
)
```

**Always dynamically import:**
- `RSVPSection` — contains react-hook-form + form state, not needed on initial load
- Any modal component that only appears after user interaction

**Never dynamically import:**
- HeroSection — above the fold, must render immediately
- OurStorySection — likely above the fold on mobile
- Any server component — dynamic imports only apply to client components

---

## Rule 5 — Preventing Layout Shift (CLS)

Layout shift causes Google CLS penalty and visual jankiness.

### Font-based CLS — prevented by next/font

`next/font` with `display: "swap"` reserves space for the font before it loads.
Dancing Script (script font) may have different metrics than its fallback —
consider `adjustFontFallback` or a `size-adjust` declaration if CLS is observed.

### SVG-based CLS — prevented by fluid sizing

Always use `w-full h-auto` on SVG illustration components with a `viewBox` —
the browser can reserve the correct aspect-ratio space before painting.

```tsx
// WRONG — no height, browser doesn't know how much space to reserve
<svg viewBox="0 0 200 200" className="w-24">

// CORRECT — browser reserves the correct space immediately
<svg viewBox="0 0 200 200" className="w-24 h-auto">
```

### Section backgrounds — set background-color immediately

Setting `bg-ivory` or `bg-blush` on sections means the browser paints the
background colour instantly — no white flash between section loads.

---

## Rule 6 — Third-Party Scripts

This project has minimal third-party scripts. Vercel Analytics is the only one,
and it loads automatically via the Vercel dashboard — no manual `<Script>` needed.

If any other script is ever added (e.g., a map embed for venue location):
```tsx
import Script from "next/script"

<Script
  src="https://maps.example.com/widget.js"
  strategy="lazyOnload"  // load after page is interactive
/>
```

Never use raw `<script>` tags. Always use `next/script` with an explicit strategy.

---

## Rule 7 — Metadata on Every Page

This is a single-page site — metadata lives in `app/layout.tsx` and optionally
in `app/page.tsx` via `generateMetadata`.

```tsx
// app/layout.tsx — base metadata
export const metadata: Metadata = {
  title: "Nii & Naa — Wedding Invitation",
  description: "You are invited to celebrate the wedding of Nii and Naa on 27 September 2026.",
  openGraph: {
    title: "Nii & Naa — Wedding Invitation",
    description: "Join us on 27 September 2026.",
    images: ["/og-default.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nii & Naa — Wedding Invitation",
    images: ["/og-default.jpg"],
  },
}
```

OG image must be 1200x630px. Create a branded static image (couple's names
on ivory background with minimal floral SVG) — this is the only raster image.

---

## Rule 8 — Internal Navigation

Anchor links within the page use plain `href="#section-id"`.
This is a single-page scroll site — Next.js `<Link>` is for multi-page navigation.

```tsx
// Single-page anchor navigation — plain anchor is correct
<a href="#rsvp" className="...">
  RSVP Now
</a>

// For true page navigation (if any future multi-page route is added)
import Link from "next/link"
<Link href="/admin">Admin</Link>
```

---

## Pre-Launch Checklist

```bash
# Check scores on Vercel preview URL — target all green
# pagespeed.web.dev

# Local build check
npm run build

# Check for unused/heavy imports
npx @next/bundle-analyzer  # optional
```

- [ ] LCP under 2.5 seconds on mobile
- [ ] CLS under 0.1 — SVGs have correct viewBox + `h-auto`
- [ ] INP under 200ms — RSVP form responds quickly
- [ ] Fonts loaded via `next/font` — no Google Fonts link tag
- [ ] Only font weights actually used are loaded
- [ ] SVG illustrations under 20 path elements each
- [ ] RSVPSection dynamically imported
- [ ] No raster images embedded in SVG components
- [ ] OG image created and specified (1200x630px)
- [ ] All pages have title and description metadata
- [ ] `next/script` used for any third-party scripts (not raw `<script>`)
- [ ] Hero video: 720p H.264, ≤ 3 MB, `-movflags +faststart`, audio stripped
- [ ] Hero poster: single JPEG frame, ≤ 100 KB
- [ ] Hero video LCP: verify poster loads before video on slow mobile
