# 07 — Data Fetching Patterns

## The Decision Rule

```
CMS content (couple info, story, events, hotels, FAQ, registry) → SSG with ISR revalidate
RSVP submission (write operation)                               → API route
User-driven interactive updates (none in this project)         → N/A
```

---

## Pattern 1 — Static Generation with ISR (Sanity Content)

**When to use:** All Sanity CMS content — couple info, story milestones, event details,
hotels, FAQ, registry. Content updates occasionally but not in real time.

```tsx
// app/page.tsx — fetch all Sanity content at build time, revalidate periodically
import { sanityFetch } from "@/sanity/lib/client"
import {
  coupleInfoQuery,
  storyMilestonesQuery,
  itineraryQuery,
  hotelsQuery,
  faqQuery,
  registryQuery,
} from "@/sanity/lib/queries"

// ISR — revalidate every 60 seconds so content updates appear without a redeploy
export const revalidate = 60

export default async function HomePage() {
  const [couple, milestones, itinerary, hotels, faqItems, registry] =
    await Promise.all([
      sanityFetch<CoupleInfo>(coupleInfoQuery),
      sanityFetch<StoryMilestone[]>(storyMilestonesQuery),
      sanityFetch<ItineraryItem[]>(itineraryQuery),
      sanityFetch<Hotel[]>(hotelsQuery),
      sanityFetch<FaqItem[]>(faqQuery),
      sanityFetch<RegistryInfo[]>(registryQuery),
    ])

  if (!couple) return <ComingSoon />

  return (
    <main id="main-content">
      <HeroSection couple={couple} />
      <OurStorySection milestones={milestones} />
      <EventDetailsSection items={itinerary} />
      <TravelStaySection hotels={hotels} />
      <RSVPSection />
      <RegistrySection items={registry} />
      <FAQSection items={faqItems} />
      <FooterSection couple={couple} />
    </main>
  )
}
```

**Why `Promise.all`:** Fetches all Sanity content in parallel at build/revalidate time.
Avoids sequential round-trips which would slow down page generation.

---

## Pattern 2 — API Routes for Mutations (RSVP)

**When to use:** RSVP form submission — the only write operation in this project.

Never write to Supabase directly from a client component.
All write operations go through `app/api/rsvp/route.ts`.

```tsx
// app/api/rsvp/route.ts
import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
import { z } from "zod"

const rsvpSchema = z.object({
  name: z.string().min(1, "Name is required").max(100).trim(),
  email: z.string().email("Valid email required").toLowerCase().trim(),
  attending: z.boolean(),
  guestCount: z.number().int().min(1).max(10).default(1),
  dietaryNotes: z.string().max(500).trim().optional(),
  message: z.string().max(1000).trim().optional(),
  _honeypot: z.string().max(0).optional(),
})

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json()

    // Honeypot check — before any other processing
    if (body._honeypot) {
      return NextResponse.json({ success: true }) // silent — bot never learns
    }

    // Rate limiting (see 12-security.md for implementation)
    const ip = request.headers.get("x-forwarded-for") ?? "unknown"
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      )
    }

    // Validate with Zod
    const result = rsvpSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      )
    }

    const { name, email, attending, guestCount, dietaryNotes, message } = result.data

    // Write to Supabase
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY! // anon key — RLS enforces insert-only
    )

    const { error } = await supabase.from("rsvps").insert({
      name,
      email,
      attending,
      guest_count: guestCount,
      dietary_notes: dietaryNotes ?? null,
      message: message ?? null,
    })

    if (error) {
      console.error("Supabase insert error:", error.code)
      return NextResponse.json(
        { error: "Submission failed. Please try again." },
        { status: 500 }
      )
    }

    // TODO Sprint 3: Send confirmation email via Resend
    // await sendConfirmationEmail({ name, email, attending })

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error("RSVP API error:", err)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
```

```tsx
// RSVPForm.tsx — client component calls the API route
"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

async function onSubmit(data: RSVPFormData) {
  setStatus("loading")
  try {
    const response = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error()
    setStatus("success")
  } catch {
    setStatus("error")
  }
}
```

---

## Sanity Specific Pattern

### Client setup — one file, used everywhere

```tsx
// /sanity/lib/client.ts
import { createClient } from "next-sanity"

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: true,
})

export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T> {
  return sanityClient.fetch<T>(query, params ?? {})
}
```

### Queries — all GROQ in one file

```tsx
// /sanity/lib/queries.ts
import { groq } from "next-sanity"

export const coupleInfoQuery = groq`
  *[_type == "coupleInfo"][0] {
    _id,
    names,
    bio,
    weddingDate,
    locationName
  }
`

export const storyMilestonesQuery = groq`
  *[_type == "storyMilestone"] | order(date asc) {
    _id,
    date,
    title,
    description
  }
`

export const itineraryQuery = groq`
  *[_type == "itineraryItem"] | order(time asc) {
    _id,
    eventName,
    time,
    venue,
    address,
    notes
  }
`

export const hotelsQuery = groq`
  *[_type == "hotel"] | order(_createdAt asc) {
    _id,
    name,
    distance,
    rate,
    bookingUrl,
    notes
  }
`

export const faqQuery = groq`
  *[_type == "faqItem"] | order(order asc) {
    _id,
    question,
    answer
  }
`

export const registryQuery = groq`
  *[_type == "registryInfo"] | order(_createdAt asc) {
    _id,
    storeName,
    url,
    notes
  }
`
```

---

## State Handling — Mandatory on Every Fetch

Every data fetch must handle all states before rendering:

```tsx
// Server component — null check on Sanity data
const couple = await sanityFetch<CoupleInfo>(coupleInfoQuery)
if (!couple) return <ComingSoon />

// Empty array check
const milestones = await sanityFetch<StoryMilestone[]>(storyMilestonesQuery)
if (!milestones || milestones.length === 0) return null // section hidden until content added
```

### RSVP form states — mandatory

```tsx
type Status = "idle" | "loading" | "success" | "error"

// Must handle all four states:
if (status === "loading") return <LoadingSpinner />
if (status === "success") return <RSVPSuccessMessage />
if (status === "error")   return <RSVPErrorMessage />
// idle: render the form
```

---

## HTTP Status Codes for the RSVP API Route

```
200 → success
400 → validation error (bad input)
429 → rate limited
500 → server error (Supabase failure, unexpected error)
```

---

## Forbidden Patterns

- Never write inline GROQ queries outside `queries.ts`
- Never fetch Sanity data in client components for initial render
- Never write to Supabase directly from a client component
- Never render data without null/empty check first
- Never skip error handling on any async operation
- Never import `SUPABASE_ANON_KEY` in a client component (it lives in `app/api/rsvp/route.ts` only)
