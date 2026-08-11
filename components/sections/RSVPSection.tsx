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
        src="/bloom-3.png"
        width={170}
        height={297}
        position="top-left"
        className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[26vw] max-w-[460px] z-0"
        rotation={-18}
        opacity={0.65}
        feather
        sizes="(min-width: 1024px) 26vw, (min-width: 768px) 240px, (min-width: 640px) 200px, 160px"
      />
      <FloralAccent
        src="/bloom-1.png"
        width={495}
        height={619}
        position="top-right"
        className="w-[120px] sm:w-[150px] md:w-[190px] lg:w-[20vw] max-w-[360px] z-0"
        rotation={20}
        opacity={0.58}
        feather
        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 190px, (min-width: 640px) 150px, 120px"
      />
      <FloralAccent
        src="/bloom-2.png"
        width={453}
        height={676}
        position="bottom-left"
        className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[26vw] max-w-[460px] z-0"
        rotation={8}
        opacity={0.62}
        feather
        sizes="(min-width: 1024px) 26vw, (min-width: 768px) 240px, (min-width: 640px) 200px, 160px"
      />
      <FloralAccent
        src="/bloom-3.png"
        width={170}
        height={297}
        position="bottom-right"
        className="w-[120px] sm:w-[150px] md:w-[190px] lg:w-[20vw] max-w-[360px] z-0"
        rotation={-8}
        opacity={0.55}
        feather
        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 190px, (min-width: 640px) 150px, 120px"
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
