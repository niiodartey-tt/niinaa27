"use client"

import { cn } from "@/lib/utils"
import { MilestoneNode } from "@/components/illustrations/MilestoneNode"
import { StoryMilestoneCard } from "@/components/sections/StoryMilestoneCard"
import type { StoryMilestone } from "@/types/sanity"

interface OurStoryTimelineProps {
  milestones: StoryMilestone[]
}

export function OurStoryTimeline({ milestones }: OurStoryTimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line: left-edge on mobile, centered at sm+ */}
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 w-px bg-rose/30 left-[1.25rem] sm:left-1/2 sm:-translate-x-px"
      />

      <ol>
        {milestones.map((milestone, index) => {
          const isRight = index % 2 !== 0
          const isLast = index === milestones.length - 1

          return (
            <li
              key={milestone._id}
              className="grid grid-cols-[2.5rem_1fr] gap-x-3 sm:grid-cols-[1fr_3rem_1fr] sm:gap-x-0 pb-10 sm:pb-14 last:pb-0"
            >
              {/* Node cell: col1 on mobile, col2 centered on sm+ */}
              <div className="sm:col-start-2 sm:row-start-1 sm:self-start flex items-start justify-center relative z-10">
                {/* Tick arm: desktop only — extends toward the card side */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "hidden sm:block absolute top-1/2 -translate-y-px h-px w-4 bg-rose/40",
                    isRight ? "left-full" : "right-full"
                  )}
                />
                <MilestoneNode index={index} isLast={isLast} />
              </div>

              {/* Card cell: col2 on mobile, col1 or col3 on sm+ */}
              <div
                className={cn(
                  "sm:row-start-1",
                  isRight
                    ? "sm:col-start-3 sm:pl-6"
                    : "sm:col-start-1 sm:pr-6"
                )}
              >
                <StoryMilestoneCard
                  milestone={milestone}
                  index={index}
                  isLast={isLast}
                />
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
