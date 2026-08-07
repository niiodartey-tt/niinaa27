import { LeafDivider } from "@/components/illustrations/LeafDivider"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { OurStoryTimeline } from "@/components/sections/OurStoryTimeline"
import type { StoryMilestone } from "@/types/sanity"

interface OurStorySectionProps {
  milestones: StoryMilestone[]
}

export function OurStorySection({ milestones }: OurStorySectionProps) {
  return (
    <SectionWrapper id="our-story" className="bg-blush">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="font-sans text-xs text-taupe tracking-widest uppercase mb-3">
            How it began
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink">Our Story</h2>
        </div>

        <OurStoryTimeline milestones={milestones} />

        <div className="mt-16 md:mt-20">
          <LeafDivider aria-hidden="true" className="text-hairline w-full" />
        </div>
      </div>
    </SectionWrapper>
  )
}
