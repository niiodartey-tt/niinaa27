"use client"

import { StoryMilestoneCard } from "@/components/sections/StoryMilestoneCard"
import type { StoryMilestone } from "@/types/sanity"

interface OurStoryTimelineProps {
  milestones: StoryMilestone[]
}

export function OurStoryTimeline({ milestones }: OurStoryTimelineProps) {
  return (
    <ol className="relative border-l border-hairline ml-4 md:ml-8 space-y-0">
      {milestones.map((milestone, index) => (
        <StoryMilestoneCard
          key={milestone._id}
          milestone={milestone}
          delay={index * 120}
        />
      ))}
    </ol>
  )
}
