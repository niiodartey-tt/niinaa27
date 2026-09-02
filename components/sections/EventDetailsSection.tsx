import { ExternalLink } from "lucide-react"
import { CalendarIcon } from "@/components/illustrations/SiteIconsSection"
import { FloralAccent } from "@/components/illustrations/FloralAccent"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { RevealWrapper } from "@/components/layout/RevealWrapper"
const DIRECTIONS_URL = "https://maps.app.goo.gl/AG2VCBrt5tz5nQa1A"

const linkClass =
  "inline-flex items-center justify-center gap-1.5 mt-4 min-h-[44px] rounded-full border border-gold-base bg-transparent px-6 py-2.5 font-sans text-sm text-ink transition-colors duration-200 hover:bg-gold-highlight/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-base focus-visible:ring-offset-2 focus-visible:ring-offset-blush"

const labelClass =
  "font-sans text-base tracking-widest uppercase font-semibold text-gold-base mb-3"

export function EventDetailsSection() {
  return (
    <SectionWrapper id="event-details" className="bg-blush relative overflow-hidden">
      <FloralAccent
        src="/bloom-1.png"
        width={495}
        height={619}
        position="bottom-left"
        className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[26vw] max-w-[460px] z-0"
        rotation={-14}
        opacity={0.65}
        feather
        sizes="(min-width: 1024px) 26vw, (min-width: 768px) 240px, (min-width: 640px) 200px, 160px"
      />
      <RevealWrapper className="max-w-lg mx-auto text-center relative z-[1]">

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
          <p className="font-serif text-base text-ink mb-4">Saturday, 2 January 2027</p>
          <div className="space-y-2 inline-flex flex-col items-start text-left">
            <div className="flex items-baseline gap-3">
              <span className="font-sans text-xs text-taupe tabular-nums w-16 shrink-0">1:00 PM</span>
              <span className="font-serif text-base text-ink">Blessing of the Marriage</span>
            </div>
          </div>
          <p className="font-serif text-xl md:text-2xl text-ink italic mt-5">
            Reception to follow
          </p>
          <p className="font-serif text-sm text-taupe italic mt-3">All at the same venue.</p>
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

        {/* DRESS CODE */}
        <div>
          <p className={labelClass}>Dress Code</p>
          <p className="font-serif text-base text-ink leading-relaxed">
            Elegant &amp; Classy.
          </p>
        </div>

      </RevealWrapper>
    </SectionWrapper>
  )
}
