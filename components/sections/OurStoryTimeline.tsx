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
      {/* Central line: equal 1fr cols mean left-1/2 is always node-column centre */}
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 w-px bg-rose/30 left-1/2 -translate-x-px"
      />

      <ol>
        {milestones.map((milestone, index) => {
          const isRight = index % 2 !== 0
          const isLast = index === milestones.length - 1

          return (
            <li
              key={milestone._id}
              className="grid grid-cols-[1fr_2.5rem_1fr] sm:grid-cols-[1fr_3rem_1fr] pb-10 sm:pb-14 last:pb-0"
            >
              {/* Node cell: col2 at all widths */}
              <div className="col-start-2 row-start-1 self-start flex items-start justify-center relative z-10">
                {/* Tick arm toward card — visible at all widths */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute top-1/2 -translate-y-px h-px w-4 bg-rose/40",
                    isRight ? "left-full" : "right-full"
                  )}
                />
                <MilestoneNode index={index} isLast={isLast} />
              </div>

              {/* Card cell: col1 or col3 at all widths */}
              <div
                className={cn(
                  "row-start-1",
                  isRight
                    ? "col-start-3 pl-3 sm:pl-6"
                    : "col-start-1 pr-3 sm:pr-6"
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
