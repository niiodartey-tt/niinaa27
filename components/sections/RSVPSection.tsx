import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { RSVPForm } from "@/components/sections/RSVPForm"
import { LeafDivider } from "@/components/illustrations/LeafDivider"
import { FloralAccent } from "@/components/illustrations/FloralAccent"

export function RSVPSection() {
  return (
    <SectionWrapper id="rsvp" className="bg-ivory relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-floral-tile bg-repeat [background-size:309px_306px] pointer-events-none select-none filter invert contrast-[500%] brightness-50 opacity-[0.20]"
      />
      {/* Diagonal pair: top-left + bottom-right — no position preset to avoid left-0 conflict with bleed offset */}
      <FloralAccent
        src="/peony-1.png"
        width={612}
        height={408}
        className="absolute -left-2.5 top-0 w-44 md:w-56 [&_img]:w-full [&_img]:h-auto"
        rotation={-8}
        opacity={0.50}
        sizes="(min-width: 768px) 224px, 176px"
      />
      <FloralAccent
        src="/peony-2.png"
        width={1000}
        height={666}
        className="absolute -right-2.5 bottom-0 w-44 md:w-56 [&_img]:w-full [&_img]:h-auto"
        rotation={5}
        opacity={0.50}
        sizes="(min-width: 768px) 224px, 176px"
      />
      <div className="relative z-[1] max-w-lg mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <p className="font-sans text-xs text-taupe tracking-widest uppercase mb-3">
            Kindly reply by 1 December 2026
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink uppercase">RSVP</h2>
          <p className="font-serif text-base text-taupe italic mt-3">
            We would love to know if you can join us.
          </p>
        </div>
        <LeafDivider
          aria-hidden="true"
          className="text-hairline w-48 md:w-56 mx-auto mb-8 md:mb-10"
        />
        <RSVPForm />
      </div>
    </SectionWrapper>
  )
}

