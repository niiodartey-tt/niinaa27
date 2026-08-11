import { PlaneIcon } from "@/components/illustrations/SiteIconsSection"
import { FloralAccent } from "@/components/illustrations/FloralAccent"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { HotelCard } from "@/components/sections/HotelCard"
import type { Hotel } from "@/types/sanity"

interface TravelStaySectionProps {
  hotels: Hotel[]
}

export function TravelStaySection({ hotels }: TravelStaySectionProps) {
  return (
    <SectionWrapper id="travel-stay" className="relative overflow-hidden">
      <FloralAccent
        src="/allium-double.png"
        width={365}
        height={547}
        position="top-left"
        className="w-[13vw] max-w-[200px] z-0"
        rotation={-10}
        opacity={0.60}
        feather
        sizes="(max-width: 1280px) 13vw, 200px"
      />
      <FloralAccent
        src="/rose.png"
        width={391}
        height={511}
        position="bottom-right"
        className="w-[12vw] max-w-[185px] z-0"
        rotation={10}
        opacity={0.60}
        feather
        sizes="(max-width: 1280px) 12vw, 185px"
      />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="font-sans text-xs text-taupe tracking-widest uppercase mb-3">
            Getting there
          </p>
          <PlaneIcon className="w-[22px] h-[22px] mx-auto mb-3 block" />
          <h2 className="font-serif text-3xl md:text-4xl text-ink uppercase">
            Travel & Stay
          </h2>
          <p className="font-serif text-base text-taupe italic mt-3">
            We recommend the following hotels for guests joining from out of town.
          </p>
        </div>

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
