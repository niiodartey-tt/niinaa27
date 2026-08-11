import { ExternalLink } from "lucide-react"
import { CalendarIcon } from "@/components/illustrations/SiteIconsSection"
import { FloralAccent } from "@/components/illustrations/FloralAccent"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import type { ItineraryItem } from "@/types/sanity"

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=5.6506614326887075,-0.07227142411697524"

const linkClass =
  "inline-flex items-center gap-1.5 mt-3 min-h-[44px] font-sans text-sm text-rose hover:text-rose-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 rounded-sm"

const labelClass =
  "font-sans text-base tracking-widest uppercase font-semibold text-rose mb-3"

interface EventDetailsSectionProps {
  items: ItineraryItem[]
}

export function EventDetailsSection({ items }: EventDetailsSectionProps) {
  const sorted = [...items].sort((a, b) => a.order - b.order)
  const ceremony = sorted[0]
  const reception = sorted[1]

  return (
    <SectionWrapper id="event-details" className="bg-blush relative overflow-hidden">
      <FloralAccent
        src="/dahlia.png"
        width={469}
        height={426}
        position="bottom-left"
        className="w-[42vw] max-w-[230px] z-0"
        rotation={-12}
        opacity={0.70}
        feather
        sizes="(max-width: 768px) 42vw, 230px"
      />
      <div className="max-w-lg mx-auto text-center">

        <div className="mb-12 md:mb-16">
          <p className="font-sans text-xs text-taupe tracking-widest uppercase mb-3">
            Saturday, 2 January 2027
          </p>
          <CalendarIcon className="w-[22px] h-[22px] mx-auto mb-3 block" />
          <h2 className="font-serif text-3xl md:text-4xl text-ink uppercase">
            The Details
          </h2>
        </div>

        {/* DATE & TIME */}
        <div className="mb-10 md:mb-12">
          <p className={labelClass}>Date &amp; Time</p>
          <p className="font-serif text-base text-ink">Saturday, 2 January 2027</p>
          <p className="font-serif text-base text-ink mt-1">
            Ceremony at {ceremony?.time ?? "3:00 PM"}
          </p>
          <p className="font-serif text-base text-ink mt-1">
            Reception from {reception?.time ?? "5:00 PM"}
          </p>
        </div>

        {/* LOCATION */}
        <div className="mb-10 md:mb-12">
          <p className={labelClass}>Location</p>
          <p className="font-serif text-base text-ink">Skybox Event Centre</p>
          <p className="font-serif text-base text-ink">Lashibi, Accra, Ghana</p>
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get directions to Skybox Event Centre on Google Maps"
            className={linkClass}
          >
            Get directions
            <ExternalLink size={12} aria-hidden="true" />
          </a>
        </div>

        {/* KINDLY RESPOND — deadline is placeholder, confirm before launch */}
        <div className="mb-10 md:mb-12">
          <p className={labelClass}>Kindly Respond</p>
          <p className="font-serif text-base text-ink leading-relaxed">
            We hope you are able to join us. Kindly let us know by 1 December 2026.
          </p>
          <a href="#rsvp" className={linkClass}>
            Respond below ↓
          </a>
        </div>

        {/* DRESS CODE — placeholder, confirm before launch */}
        <div>
          <p className={labelClass}>Dress Code</p>
          <p className="font-serif text-base text-ink leading-relaxed">
            Smart / Elegant Attire — florals and prints are welcome.{" "}
            Please avoid all white.
          </p>
        </div>

      </div>
    </SectionWrapper>
  )
}
