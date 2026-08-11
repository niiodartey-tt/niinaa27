import { EnvelopeIcon } from "@/components/illustrations/SiteIconsSection"
import { FloralAccent } from "@/components/illustrations/FloralAccent"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { RSVPForm } from "@/components/sections/RSVPForm"

export function RSVPSection() {
  return (
    <SectionWrapper id="rsvp" className="bg-ivory relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-floral-tile bg-repeat [background-size:309px_306px] pointer-events-none select-none filter invert contrast-[500%] brightness-50 opacity-[0.20]"
      />

      <FloralAccent
        src="/peony-1.png"
        width={612}
        height={408}
        position="top-left"
        className="w-[26vw] max-w-[400px] z-0"
        rotation={-15}
        opacity={0.68}
        feather
        sizes="(max-width: 1280px) 26vw, 400px"
      />
      <FloralAccent
        src="/rose.png"
        width={391}
        height={511}
        position="top-right"
        className="w-[22vw] max-w-[340px] z-0"
        rotation={15}
        opacity={0.72}
        feather
        sizes="(max-width: 1280px) 22vw, 340px"
      />
      <FloralAccent
        src="/allium-single.png"
        width={480}
        height={640}
        position="bottom-left"
        className="w-[20vw] max-w-[300px] z-0"
        rotation={8}
        opacity={0.62}
        feather
        sizes="(max-width: 1280px) 20vw, 300px"
      />

      <div className="relative z-[1] max-w-lg mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <p className="font-sans text-xs text-taupe tracking-widest uppercase mb-3">
            Kindly reply by 1 December 2026
          </p>
          <EnvelopeIcon className="w-[22px] h-[22px] mx-auto mb-3 block" />
          <h2 className="font-serif text-3xl md:text-4xl text-ink uppercase">RSVP</h2>
          <p className="font-serif text-base text-taupe italic mt-3">
            We would love to know if you can join us.
          </p>
        </div>
        <RSVPForm />
      </div>
    </SectionWrapper>
  )
}
