# 11 — TypeScript Standard

## Core Principle

TypeScript strict mode always. No `any`. No guessing at types.
If the type is unknown, use `unknown` with a type guard.
TypeScript is the standard across every file — `.js` files are not allowed
in `app/` or `components/`.

---

## tsconfig.json — Required Settings

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true,
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## Type vs Interface

```tsx
// Use interface for object shapes and component props
interface HotelCardProps {
  name: string
  distance: string
  rate: string
  bookingUrl: string
  notes?: string
  className?: string
}

// Use type for unions, primitives, and computed types
type RSVPStatus = "idle" | "loading" | "success" | "error"
type AttendingOption = "yes" | "no"
type Nullable<T> = T | null
```

---

## Never Use any

```tsx
// WRONG
function processRSVP(data: any) { ... }
const result: any = await fetch(url)

// CORRECT — use unknown with type guard
function processRSVP(data: unknown) {
  if (typeof data !== "object" || data === null) throw new Error("Invalid data")
  // TypeScript now knows data is an object
}

// CORRECT — type the response properly
interface RSVPApiResponse {
  success: boolean
  error?: string
}
const result: RSVPApiResponse = await response.json()
```

---

## Component Props — Always Typed

```tsx
// Every component with props has an interface above it

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  className?: string  // always optional on primitives
}

export function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  className,
}: FAQItemProps) {
  return (...)
}
```

---

## Async Functions — Always Typed Return

```tsx
// WRONG — no return type
async function getRSVPs() {
  const { data, error } = await supabase.from("rsvps").select("*")
  return data
}

// CORRECT — explicit return type
async function getRSVPs(): Promise<RSVP[]> {
  const { data, error } = await supabase.from("rsvps").select("*")
  if (error) throw new Error(error.message)
  return data ?? []
}

// CORRECT — API route handler
export async function POST(request: Request): Promise<Response> {
  ...
  return NextResponse.json({ success: true })
}
```

---

## Supabase Type Safety

Generate types from the Supabase schema after creating the `rsvps` table:

```bash
npx supabase gen types typescript \
  --project-id YOUR_PROJECT_ID \
  > types/supabase.ts
```

Use generated types in the API route:

```tsx
import type { Database } from "@/types/supabase"

type RSVPInsert = Database["public"]["Tables"]["rsvps"]["Insert"]
type RSVPRow = Database["public"]["Tables"]["rsvps"]["Row"]

const supabase = createClient<Database>(url, key)

// Now fully typed
const { data, error } = await supabase
  .from("rsvps")
  .insert({ ... } satisfies RSVPInsert)
```

---

## Sanity Type Safety

Define TypeScript interfaces matching every Sanity schema:

```tsx
// types/sanity.ts

export interface CoupleInfo {
  _id: string
  _type: "coupleInfo"
  names: string        // e.g., "Nii & Naa"
  bio?: string
  weddingDate: string  // ISO date string from Sanity
  locationName: string
}

export interface StoryMilestone {
  _id: string
  _type: "storyMilestone"
  date: string         // ISO date string
  title: string
  description: string
}

export interface ItineraryItem {
  _id: string
  _type: "itineraryItem"
  eventName: string    // "Ceremony" | "Reception"
  time: string         // e.g., "14:00"
  venue: string
  address: string
  notes?: string
}

export interface Hotel {
  _id: string
  _type: "hotel"
  name: string
  distance: string     // e.g., "0.3 miles from venue"
  rate: string         // e.g., "From $150/night"
  bookingUrl: string
  notes?: string
}

export interface FaqItem {
  _id: string
  _type: "faqItem"
  question: string
  answer: string
  order: number
}

export interface RegistryInfo {
  _id: string
  _type: "registryInfo"
  storeName: string
  url: string
  notes?: string
}
```

---

## Environment Variable Types

```tsx
// types/env.d.ts — declare env var types once, eliminating undefined
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SANITY_PROJECT_ID: string
    NEXT_PUBLIC_SANITY_DATASET: string
    SUPABASE_URL: string
    SUPABASE_ANON_KEY: string
    RESEND_API_KEY: string
    NEXT_PUBLIC_SITE_URL: string
  }
}
```

This eliminates `string | undefined` on all env var accesses.

---

## Non-null Assertion — Use Sparingly

```tsx
// WRONG — unsafe, crashes if undefined
const couple = await getCoupleInfo()
return couple!.names

// CORRECT — check first, then access
const couple = await getCoupleInfo()
if (!couple) return <ComingSoon />
return couple.names

// Acceptable — environment variables declared in env.d.ts
const url = process.env.SUPABASE_URL!
// This is acceptable because env.d.ts guarantees the type is string
```

---

## Optional Chaining and Nullish Coalescing

```tsx
// Prefer optional chaining over null checks
return hotel?.bookingUrl ?? "#"
return milestone?.date ?? "Date TBD"
const count = hotels?.length ?? 0
```

---

## Generic Types for Reusable Patterns

```tsx
// Generic API response wrapper
interface ApiResponse<T = void> {
  data?: T
  error?: string
  success: boolean
}

// Generic empty state props
interface EmptyStateProps {
  message: string
  className?: string
}
```

---

## Pre-Merge TypeScript Check

Always run before every sprint merge:

```bash
npx tsc --noEmit
```

Zero errors required. Fix all TypeScript errors before merging.
TypeScript errors in development become runtime crashes in production.

---

## Never Do

- Never use `any` — use `unknown` with type guards
- Never use `@ts-ignore` — fix the underlying type issue
- Never use `@ts-expect-error` without a comment explaining why
- Never use `as any` casting
- Never skip typing async function return values
- Never use the `object` type — define the exact shape
- Never use the `Function` type — use specific function signatures
