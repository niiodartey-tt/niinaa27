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
        src="/allium-double.png"
        width={365}
        height={547}
        position="top-right"
        className="w-[15vw] max-w-[260px] z-0"
        rotation={12}
        opacity={0.68}
        feather
        sizes="(max-width: 1280px) 15vw, 260px"
      />
      <FloralAccent
        src="/peony-1.png"
        width={612}
        height={408}
        position="bottom-left"
        className="w-[14vw] max-w-[240px] z-0"
        rotation={-18}
        opacity={0.70}
        feather
        sizes="(max-width: 1280px) 14vw, 240px"
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
