import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { RSVPForm } from "@/components/sections/RSVPForm"
import { LeafDivider } from "@/components/illustrations/LeafDivider"

export function RSVPSection() {
  return (
    <SectionWrapper id="rsvp" className="bg-ivory">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <p className="font-sans text-xs text-taupe tracking-widest uppercase mb-3">
            Kindly reply by 1 December 2026
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink">RSVP</h2>
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
