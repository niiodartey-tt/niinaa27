import { OurStoryHorizontal } from "@/components/sections/OurStoryHorizontal"
import type { StoryMilestone } from "@/types/sanity"

interface OurStorySectionProps {
  milestones: StoryMilestone[]
}

export function OurStorySection({ milestones }: OurStorySectionProps) {
  return <OurStoryHorizontal milestones={milestones} />
}
