import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { HotelCard } from "@/components/sections/HotelCard"
import { VenueMap } from "@/components/sections/VenueMap"
import type { Hotel } from "@/types/sanity"

interface TravelStaySectionProps {
  hotels: Hotel[]
}

export function TravelStaySection({ hotels }: TravelStaySectionProps) {
  return (
    <SectionWrapper id="travel-stay">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="font-sans text-xs text-taupe tracking-widest uppercase mb-3">
            Getting there
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink">
            Travel & Stay
          </h2>
          <p className="font-serif text-base text-taupe italic mt-3">
            We recommend the following hotels for guests joining from out of town.
          </p>
        </div>

        <VenueMap />

        <p className="font-sans text-xs text-taupe tracking-widest uppercase mb-8 text-center">
          Where to stay
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel, index) => (
            <HotelCard
              key={hotel._id}
              hotel={hotel}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
