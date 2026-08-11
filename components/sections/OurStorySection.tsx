import { Heart1Icon } from "@/components/illustrations/SiteIconsSection"
import { FloralAccent } from "@/components/illustrations/FloralAccent"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { OurStoryTimeline } from "@/components/sections/OurStoryTimeline"
import type { StoryMilestone } from "@/types/sanity"

interface OurStorySectionProps {
  milestones: StoryMilestone[]
}

export function OurStorySection({ milestones }: OurStorySectionProps) {
  return (
    <SectionWrapper id="our-story" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-floral-tile bg-repeat [background-size:309px_306px] pointer-events-none select-none filter invert contrast-[500%] brightness-50 opacity-[0.20]"
      />
      <FloralAccent
        src="/bloom-1.png"
        width={495}
        height={619}
        position="top-left"
        className="w-[120px] sm:w-[150px] md:w-[190px] lg:w-[20vw] max-w-[360px] z-0"
        rotation={-15}
        opacity={0.55}
        feather
        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 190px, (min-width: 640px) 150px, 120px"
      />
      <FloralAccent
        src="/bloom-2.png"
        width={453}
        height={676}
        position="top-right"
        className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[26vw] max-w-[460px] z-0"
        rotation={12}
        opacity={0.62}
        feather
        sizes="(min-width: 1024px) 26vw, (min-width: 768px) 240px, (min-width: 640px) 200px, 160px"
      />
      <FloralAccent
        src="/bloom-3.png"
        width={170}
        height={297}
        position="bottom-left"
        className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[26vw] max-w-[460px] z-0"
        rotation={-18}
        opacity={0.62}
        feather
        sizes="(min-width: 1024px) 26vw, (min-width: 768px) 240px, (min-width: 640px) 200px, 160px"
      />
      <FloralAccent
        src="/bloom-1.png"
        width={495}
        height={619}
        position="bottom-right"
        className="w-[120px] sm:w-[150px] md:w-[190px] lg:w-[20vw] max-w-[360px] z-0"
        rotation={10}
        opacity={0.55}
        feather
        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 190px, (min-width: 640px) 150px, 120px"
      />
      <div className="max-w-4xl mx-auto relative z-[1]">
        <div className="text-center mb-12 md:mb-16">
          <p className="font-sans text-xs text-taupe tracking-widest uppercase mb-3">
            How it began
          </p>
          <Heart1Icon className="w-[22px] h-[22px] mx-auto mb-3 block" />
          <h2 className="font-serif text-3xl md:text-4xl text-ink uppercase">Our Story</h2>
        </div>

        <OurStoryTimeline milestones={milestones} />

      </div>
    </SectionWrapper>
  )
}
