import { ExternalLink } from "lucide-react"
import { PlaneIcon } from "@/components/illustrations/SiteIconsSection"
import { FloralAccent } from "@/components/illustrations/FloralAccent"
import { SectionWrapper } from "@/components/layout/SectionWrapper"

export function TravelStaySection() {
  return (
    <SectionWrapper id="travel-stay" className="relative overflow-hidden">
      <FloralAccent
        src="/bloom-3.png"
        width={170}
        height={297}
        position="top-left"
        className="w-[120px] sm:w-[150px] md:w-[190px] lg:w-[20vw] max-w-[360px] z-0"
        rotation={-10}
        opacity={0.58}
        feather
        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 190px, (min-width: 640px) 150px, 120px"
      />
      <FloralAccent
        src="/bloom-1.png"
        width={495}
        height={619}
        position="top-right"
        className="w-[120px] sm:w-[150px] md:w-[190px] lg:w-[20vw] max-w-[360px] z-0"
        rotation={15}
        opacity={0.52}
        feather
        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 190px, (min-width: 640px) 150px, 120px"
      />
      <FloralAccent
        src="/bloom-2.png"
        width={453}
        height={676}
        position="bottom-right"
        className="w-[120px] sm:w-[150px] md:w-[190px] lg:w-[20vw] max-w-[360px] z-0"
        rotation={12}
        opacity={0.58}
        feather
        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 190px, (min-width: 640px) 150px, 120px"
      />
      <div className="max-w-5xl mx-auto relative z-[1]">
        <div className="text-center mb-12 md:mb-16">
          <p className="font-sans text-xs text-taupe tracking-widest uppercase mb-3">
            Getting there
          </p>
          <PlaneIcon className="w-[22px] h-[22px] mx-auto mb-3 block" />
          <h2 className="font-serif text-3xl md:text-4xl text-ink uppercase">
            Travel & Stay
          </h2>
          <p className="font-serif text-base text-taupe italic mt-3">
            A few things to help you plan your journey to Accra.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="p-px rounded-card bg-gold-shimmer">
            <div className="rounded-[27px] bg-ivory p-6 md:p-8 flex flex-col h-full">
              <p className="font-sans text-xs tracking-widest uppercase text-taupe mb-4">
                Where to stay
              </p>
              <div className="w-8 h-px bg-gold-base mb-5" aria-hidden="true" />
              <p className="font-serif text-base text-ink leading-relaxed flex-1">
                We recommend looking in Osu, Spintex, East Legon, and Tse Addo — each a
                short drive from Skybox Event Centre. A good range of hotels and serviced
                apartments is available across each area. Browse and book directly on
                Booking.com.
              </p>
              <div className="w-8 h-px bg-gold-base mt-5 mb-5" aria-hidden="true" />
              <a
                href="https://www.booking.com/city/gh/accra.html"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Search for hotels in Accra on Booking.com"
                className="inline-flex items-center justify-center gap-1.5 min-h-[44px] rounded-full border border-gold-base bg-transparent px-6 py-2.5 font-sans text-sm text-ink transition-colors duration-200 hover:bg-gold-highlight/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-base focus-visible:ring-offset-2"
              >
                Search on Booking.com
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="p-px rounded-card bg-gold-shimmer">
            <div className="rounded-[27px] bg-ivory p-6 md:p-8 flex flex-col h-full">
              <p className="font-sans text-xs tracking-widest uppercase text-taupe mb-4">
                Visa information
              </p>
              <div className="w-8 h-px bg-gold-base mb-5" aria-hidden="true" />
              <p className="font-serif text-base text-ink leading-relaxed flex-1">
                Most international guests will need a visa to enter Ghana. Requirements and
                processing times vary by nationality, so we recommend applying through the
                official Ghana Immigration Service e-Visa portal well ahead of your trip.
              </p>
              <div className="w-8 h-px bg-gold-base mt-5 mb-5" aria-hidden="true" />
              <a
                href="https://evisa.immigration.gov.gh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit the Ghana Immigration Service e-Visa portal"
                className="inline-flex items-center justify-center gap-1.5 min-h-[44px] rounded-full border border-gold-base bg-transparent px-6 py-2.5 font-sans text-sm text-ink transition-colors duration-200 hover:bg-gold-highlight/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-base focus-visible:ring-offset-2"
              >
                Visit Ghana e-Visa Portal
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
