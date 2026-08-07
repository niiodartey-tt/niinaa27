import { FloralArch } from "@/components/illustrations/FloralArch"
import { Monogram } from "@/components/illustrations/Monogram"
import { LeafDivider } from "@/components/illustrations/LeafDivider"
import { AbstractArc } from "@/components/illustrations/AbstractArc"
import { EventDetailsCard } from "@/components/sections/EventDetailsCard"
import { placeholderItinerary } from "@/lib/placeholder-data"

// Sprint 0 foundation preview — visual confirmation of design tokens, fonts,
// and illustration components before Sprint 1 sections are built.
// This page is replaced entirely in Sprint 1.

export default function HomePage() {
  const ceremony = placeholderItinerary[0]

  return (
    <main id="main-content" className="min-h-screen bg-ivory px-4 py-16 space-y-20">

      {/* ── Heading ───────────────────────────────────────────────── */}
      <section className="max-w-xl mx-auto text-center space-y-2">
        <p className="font-sans text-xs text-taupe tracking-widest uppercase">
          Sprint 0 — Foundation Preview
        </p>
        <h1 className="font-script text-5xl md:text-6xl text-ink">Nii & Naa</h1>
        <p className="font-serif text-lg text-taupe">2 January 2027</p>
      </section>

      {/* ── FloralArch ────────────────────────────────────────────── */}
      <section className="max-w-sm mx-auto text-center space-y-3">
        <p className="font-sans text-xs text-taupe tracking-widest uppercase">FloralArch</p>
        <FloralArch
          aria-hidden="true"
          className="text-rose w-full max-w-xs mx-auto"
        />
      </section>

      <LeafDivider aria-hidden="true" className="text-hairline max-w-lg mx-auto" />

      {/* ── Colour tokens ─────────────────────────────────────────── */}
      <section className="max-w-xl mx-auto space-y-4">
        <p className="font-sans text-xs text-taupe tracking-widest uppercase text-center">Colour tokens</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { token: "bg-ivory border border-hairline", label: "ivory" },
            { token: "bg-blush", label: "blush" },
            { token: "bg-rose", label: "rose" },
            { token: "bg-rose-dark", label: "rose-dark" },
            { token: "bg-ink", label: "ink" },
            { token: "bg-taupe", label: "taupe" },
            { token: "bg-hairline", label: "hairline" },
          ].map(({ token, label }) => (
            <div key={label} className="space-y-1">
              <div className={`${token} h-12 rounded-xl`} />
              <p className="font-sans text-xs text-taupe text-center">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <LeafDivider aria-hidden="true" className="text-hairline max-w-lg mx-auto" />

      {/* ── Typography ────────────────────────────────────────────── */}
      <section className="max-w-xl mx-auto space-y-6">
        <p className="font-sans text-xs text-taupe tracking-widest uppercase text-center">Typography</p>
        <div className="space-y-4">
          <div>
            <p className="font-sans text-xs text-taupe mb-1">Dancing Script — script accent</p>
            <p className="font-script text-4xl text-ink">Nii & Naa</p>
          </div>
          <div>
            <p className="font-sans text-xs text-taupe mb-1">Cormorant Garamond — body & headers</p>
            <p className="font-serif text-3xl text-ink">You are invited</p>
            <p className="font-serif text-base text-taupe mt-1 italic">
              We request the honour of your presence at our wedding celebration.
            </p>
          </div>
          <div>
            <p className="font-sans text-xs text-taupe mb-1">Inter — UI labels & forms</p>
            <p className="font-sans text-sm text-ink">RSVP by 1 December 2026</p>
          </div>
        </div>
      </section>

      <LeafDivider aria-hidden="true" className="text-hairline max-w-lg mx-auto" />

      {/* ── EventDetailsCard — Pattern 4 reference ────────────────── */}
      {ceremony !== undefined && (
        <section className="max-w-md mx-auto space-y-3">
          <p className="font-sans text-xs text-taupe tracking-widest uppercase text-center">
            EventDetailsCard — Pattern 4 (scroll reveal)
          </p>
          <EventDetailsCard event={ceremony} />
        </section>
      )}

      <LeafDivider aria-hidden="true" className="text-hairline max-w-lg mx-auto" />

      {/* ── Monogram + AbstractArc ────────────────────────────────── */}
      <section className="max-w-sm mx-auto text-center space-y-6">
        <div className="space-y-2">
          <p className="font-sans text-xs text-taupe tracking-widest uppercase">Monogram</p>
          <Monogram aria-hidden="true" className="text-ink w-24 mx-auto" />
        </div>
        <div className="space-y-2">
          <p className="font-sans text-xs text-taupe tracking-widest uppercase">AbstractArc</p>
          <AbstractArc aria-hidden="true" className="text-rose/40 max-w-xs mx-auto" />
        </div>
      </section>

    </main>
  )
}
