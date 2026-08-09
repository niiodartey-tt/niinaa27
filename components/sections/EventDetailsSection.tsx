import { SectionWrapper } from "@/components/layout/SectionWrapper"
import type { ItineraryItem } from "@/types/sanity"

interface EventDetailsSectionProps {
  items: ItineraryItem[]
}

export function EventDetailsSection({ items }: EventDetailsSectionProps) {
  const sorted = [...items].sort((a, b) => a.order - b.order)
  const ceremony = sorted[0]
  const reception = sorted[1]

  return (
    <SectionWrapper id="event-details" className="bg-blush">
      <div className="max-w-xl mx-auto text-center">

        {/* Script header */}
        <p className="font-script text-2xl text-taupe leading-none">the</p>
        <h2 className="font-script text-6xl md:text-7xl text-ink leading-none mt-1 mb-4">
          Details
        </h2>
        <p className="font-sans text-xs tracking-widest uppercase text-taupe mb-14 md:mb-16">
          Saturday, 2 January 2027
        </p>

        {/* Two-column Ceremony / Reception split */}
        <div className="relative flex flex-col sm:flex-row mb-14 md:mb-16">
          {/* Diamond ornament at divider centre — desktop only */}
          <div
            aria-hidden="true"
            className="absolute hidden sm:block left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-2 h-2 bg-blush rotate-45 border border-hairline"
          />

          {/* Ceremony */}
          <div className="flex-1 pb-8 sm:pb-0 sm:pr-10 md:pr-14 border-b border-hairline sm:border-b-0 sm:border-r sm:border-hairline">
            <p className="font-sans text-[10px] tracking-widest uppercase text-rose mb-3">
              Ceremony
            </p>
            <p className="font-serif text-sm text-taupe italic leading-relaxed mb-4">
              Join us as we exchange our vows and begin this new chapter together.
            </p>
            <p className="font-sans text-sm tracking-widest uppercase text-ink">
              {ceremony?.time ?? "3:00 PM"}
            </p>
          </div>

          {/* Reception */}
          <div className="flex-1 pt-8 sm:pt-0 sm:pl-10 md:pl-14">
            <p className="font-sans text-[10px] tracking-widest uppercase text-rose mb-3">
              Reception
            </p>
            <p className="font-serif text-sm text-taupe italic leading-relaxed mb-4">
              Celebrate with us over drinks, dinner, and an evening to remember.
            </p>
            <p className="font-sans text-sm tracking-widest uppercase text-ink">
              {reception?.time ?? "5:00 PM"}
            </p>
          </div>
        </div>

        {/* Venue */}
        <div className="mb-10 md:mb-12">
          <p className="font-serif text-base text-ink mb-0.5">Skybox Event Centre</p>
          <p className="font-sans text-xs tracking-wide text-taupe">Lashibi, Accra, Ghana</p>
        </div>

        {/* Dress code */}
        <div className="mb-10 md:mb-12">
          <p className="font-sans text-[10px] tracking-widest uppercase text-taupe mb-2">
            Dress Code
          </p>
          <p className="font-serif text-sm text-ink leading-relaxed">
            Smart / Elegant Attire — florals and prints are welcome. Please avoid all white.
          </p>
        </div>

        {/* RSVP reminder */}
        <p className="font-serif text-sm text-taupe italic">
          Kindly RSVP by 1 December 2026.{" "}
          <a href="#rsvp" className="text-rose underline underline-offset-2 not-italic">
            Respond here ↓
          </a>
        </p>

      </div>
    </SectionWrapper>
  )
}
