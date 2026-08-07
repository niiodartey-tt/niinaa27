"use client"

import { StoryMilestoneCard } from "@/components/sections/StoryMilestoneCard"
import type { StoryMilestone } from "@/types/sanity"

interface OurStoryTimelineProps {
  milestones: StoryMilestone[]
}

export function OurStoryTimeline({ milestones }: OurStoryTimelineProps) {
  return (
    <ol className="relative ml-4 md:ml-8 space-y-0">
      {/* Gradient connector line replacing the flat border-l */}
      <div
        aria-hidden="true"
        className="absolute left-0 inset-y-0 w-px bg-gradient-to-b from-rose/70 via-rose/30 to-rose/10"
      />
      {milestones.map((milestone, index) => (
        <StoryMilestoneCard
          key={milestone._id}
          milestone={milestone}
          delay={index * 120}
          isLast={index === milestones.length - 1}
          progress={milestones.length <= 1 ? 1 : index / (milestones.length - 1)}
        />
      ))}
    </ol>
  )
}
