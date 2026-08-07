# 05 — Breaking Points & Defensive Rules

## Core Principle

Apply these rules defensively on every component — not just when
explicitly reminded. These are the failure patterns most likely to break
this project in production.

---

## Next.js App Router

### "use client" missing

```tsx
// WRONG — build error if component uses hooks or browser APIs
import { useState } from "react"
export function RSVPForm() {
  const [status, setStatus] = useState("idle") // error: hook in server component
  return <form>...</form>
}

// CORRECT
"use client"
import { useState } from "react"
export function RSVPForm() {
  const [status, setStatus] = useState("idle")
  return <form>...</form>
}
```

**Rule:** Any component using `useState`, `useEffect`, `useRef`, `useInView`,
event handlers, or browser APIs must have `"use client"` as line 1.

---

### Fetching data in client components

```tsx
// WRONG — loses SSR, exposes keys, hurts SEO
"use client"
export function FAQSection() {
  const [items, setItems] = useState([])
  useEffect(() => {
    sanityClient.fetch(faqQuery).then(...)
  }, [])
}

// CORRECT — fetch in server component, pass as props
// app/page.tsx (server component)
export default async function HomePage() {
  const faqItems = await sanityFetch<FaqItem[]>(faqQuery)
  return <FAQSection items={faqItems} />
}

// FAQSection.tsx (client component — accordion state only)
"use client"
export function FAQSection({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  ...
}
```

---

### useSearchParams without Suspense

```tsx
// WRONG — build error in production
"use client"
import { useSearchParams } from "next/navigation"
export function SomeComponent() {
  const params = useSearchParams() // error without Suspense boundary
}

// CORRECT
import { Suspense } from "react"
export default function Page() {
  return (
    <Suspense fallback={null}>
      <SomeComponent />
    </Suspense>
  )
}
```

---

## CSS Animations

### Intersection Observer not disconnecting

```tsx
// WRONG — observer keeps firing on every scroll past
useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) setIsInView(true)
    // no disconnect — observer re-fires on re-entry
  }, { threshold: 0.15 })
  observer.observe(el)
  return () => observer.disconnect()
}, [])

// CORRECT — disconnect after first trigger
useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      setIsInView(true)
      observer.disconnect() // fires once, done
    }
  }, { threshold: 0.15 })
  observer.observe(el)
  return () => observer.disconnect()
}, [])
```

---

### Animation not visible because initial state persists without "forwards"

```tsx
// WRONG — element snaps back to opacity:0 when animation ends
className="animate-fade-up"
// keyframe: 0% opacity:0 → 100% opacity:1
// without "forwards", final state is not retained

// CORRECT — "forwards" keeps the element at the final keyframe state
// tailwind.config.ts
animation: {
  "fade-up": "fade-up 0.8s ease-out forwards",  // "forwards" is critical
}
```

---

### CSS entrance animation flashing before reduced motion kicks in

```tsx
// WRONG — element briefly shows opacity:0 before @media reduce kicks in
const { ref, isInView } = useInView()
// if user has reduced motion, they still see a flash of the invisible state

// CORRECT — check reduced motion in hook, start as visible
const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

const [isInView, setIsInView] = useState(prefersReducedMotion)
// if reduced motion → starts true → element visible immediately, no animation
```

---

## Supabase

### Service role key exposed or used incorrectly

```tsx
// WRONG — the RSVP route uses anon key + RLS, not service role
// For this project: use SUPABASE_ANON_KEY in the API route
// SUPABASE_SERVICE_ROLE_KEY is not in this project at all

// CORRECT — in app/api/rsvp/route.ts
import { createClient } from "@supabase/supabase-js"
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY! // anon key — RLS controls access
)
```

---

### No error handling on Supabase queries

```tsx
// WRONG — crashes if error is non-null
const { data } = await supabase.from("rsvps").insert(rsvp)

// CORRECT
const { data, error } = await supabase.from("rsvps").insert(rsvp)
if (error) {
  console.error("RSVP insert error:", error.code)
  return NextResponse.json({ error: "Submission failed." }, { status: 500 })
}
```

---

### RLS blocking RSVP inserts silently

Supabase RLS returns an error (not empty data) on a blocked INSERT.
The error code will be `42501` (insufficient privilege) or similar.

**Rule:** When `rsvp` API route returns 500 with no obvious cause, check:
1. Supabase dashboard → Authentication → Policies — is the anon INSERT policy present?
2. The error code logged in the Vercel function logs

---

## Sanity

### Using .asset.url directly

```tsx
// WRONG — for this project: no Sanity images at all
// There are no SanityImage fields in any schema
// If an image field is ever added, use urlFor() — never .asset.url
<img src={item.image.asset.url} />  // wrong in any case

// This project has no photography — this pattern should never appear
```

---

### Inline GROQ queries

```tsx
// WRONG — scattered data layer
export default async function HomePage() {
  const faq = await client.fetch(`*[_type == "faqItem"]`)
}

// CORRECT — all queries in one file
// /sanity/lib/queries.ts
export const faqQuery = groq`
  *[_type == "faqItem"] | order(order asc) {
    _id, question, answer
  }
`

// page.tsx
import { faqQuery } from "@/sanity/lib/queries"
const faqItems = await sanityFetch<FaqItem[]>(faqQuery)
```

---

### No null check on Sanity returns

```tsx
// WRONG — crashes if content not published in Sanity yet
const couple = await getCoupleInfo()
return <h1>{couple.names}</h1>

// CORRECT
const couple = await getCoupleInfo()
if (!couple) return <p>Loading content...</p>
return <h1>{couple.names}</h1>
```

---

## General React

### Missing key props on mapped lists

```tsx
// WRONG
milestones.map((item, index) => <Card key={index} />)  // index — wrong
milestones.map(item => <Card />)                        // no key — error

// CORRECT — use Sanity _id
milestones.map(item => <Card key={item._id} />)
```

---

### SVG illustration overflow at small viewports

```tsx
// WRONG — fixed viewBox with width in px causes overflow at 375px
<svg width="600" height="200" viewBox="0 0 600 200">

// CORRECT — fluid SVG, scales to container
<svg
  viewBox="0 0 600 200"
  className="w-full h-auto"
  aria-hidden="true"
>
```

---

### Environment variables without NEXT_PUBLIC_ prefix used client-side

```tsx
// WRONG — returns undefined in client component
"use client"
const url = process.env.SUPABASE_URL // undefined — server only

// For this project: there is no client-side Supabase usage.
// All Supabase calls are in app/api/rsvp/route.ts (server).
// This mistake should never occur — flag if it does.
```

---

## Quick Reference — Common Bugs

| Symptom | Likely Cause | First Check |
|---|---|---|
| Section invisible on Vercel, fine locally | CSS animation needs `forwards` | Check keyframe/animation definition |
| Entrance animation fires immediately | IntersectionObserver not firing | Is `useInView` hook used? Is ref attached? |
| RSVP form silently fails | API route error, Supabase RLS blocking | Vercel function logs, Supabase dashboard |
| FAQ accordion not animating | Missing `tailwindcss-animate` or wrong class | Is `tailwindcss-animate` in plugins? |
| Sanity data not appearing | Content not published | Sanity Studio — is document Published (not Draft)? |
| Works dev, breaks production | Env var missing in Vercel | Vercel dashboard → environment variables |
| TypeScript error only in build | Strict config, stale generated types | `npx tsc --noEmit` locally |
| SVG overflows at 375px | Fixed width attribute on SVG | Use `className="w-full h-auto"` and `viewBox` only |
| Images not loading | External domain not in `next.config.mjs` remotePatterns | Check remotePatterns — Sanity CDN must be listed |
