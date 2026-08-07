import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { EventDetailsCard } from "@/components/sections/EventDetailsCard"
import type { ItineraryItem } from "@/types/sanity"

interface EventDetailsSectionProps {
  items: ItineraryItem[]
}

export function EventDetailsSection({ items }: EventDetailsSectionProps) {
  return (
    <SectionWrapper id="event-details" className="bg-ivory">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="font-sans text-xs text-taupe tracking-widest uppercase mb-3">
            Save the date
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink">Event Details</h2>
          <p className="font-serif text-base text-taupe italic mt-3">
            Saturday, 2 January 2027 · Accra, Ghana
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <EventDetailsCard
              key={item._id}
              event={item}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
