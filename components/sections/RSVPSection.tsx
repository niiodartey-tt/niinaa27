import { EnvelopeIcon } from "@/components/illustrations/SiteIconsSection"
import { FloralAccent } from "@/components/illustrations/FloralAccent"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { RSVPForm } from "@/components/sections/RSVPForm"

export function RSVPSection() {
  return (
    <SectionWrapper id="rsvp" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-floral-tile bg-repeat [background-size:309px_306px] pointer-events-none select-none filter invert contrast-[500%] brightness-50 opacity-[0.20]"
      />

      {/* Peony — top-left, statement bloom flanking the heading */}
      <FloralAccent
        src="/peony-1.png"
        width={612}
        height={408}
        position="top-left"
        className="w-[38vw] max-w-[160px] z-0"
        rotation={-15}
        opacity={0.80}
        feather
        sizes="(max-width: 768px) 38vw, 160px"
      />

      {/* Rose — top-right, lighter complement to the peony */}
      <FloralAccent
        src="/rose.png"
        width={391}
        height={511}
        position="top-right"
        className="w-[28vw] max-w-[120px] z-0"
        rotation={15}
        opacity={0.72}
        feather
        sizes="(max-width: 768px) 28vw, 120px"
      />

      {/* Allium — bottom-right, small accent near the note/message field */}
      <FloralAccent
        src="/allium-single.png"
        width={480}
        height={640}
        position="bottom-right"
        className="w-[22vw] max-w-[90px] bottom-[10%] z-0"
        rotation={-5}
        opacity={0.65}
        feather
        sizes="(max-width: 768px) 22vw, 90px"
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
