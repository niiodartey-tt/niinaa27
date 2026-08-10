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
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 w-px bg-rose/30 left-1/2 -translate-x-px"
      />

      <ol>
        {milestones.map((milestone, index) => {
          const isRight = index % 2 !== 0
          const isLast = index === milestones.length - 1
          const photoSrc = milestone.imageUrl ?? (index % 2 === 0 ? "/peony-1.png" : "/peony-2.png")
          const photoAlt = milestone.imageUrl ? (milestone.imageAlt ?? "") : ""

          return (
            <li
              key={milestone._id}
              className="grid grid-cols-[1fr_2.5rem_1fr] sm:grid-cols-[1fr_3rem_1fr] pb-10 sm:pb-14 last:pb-0"
            >
              {/* Node — col 2, tick arm toward text */}
              <div className="col-start-2 row-start-1 self-start flex items-start justify-center relative z-10">
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute top-1/2 -translate-y-px h-px w-4 bg-rose/40",
                    isRight ? "left-full" : "right-full"
                  )}
                />
                <MilestoneNode index={index} isLast={isLast} />
              </div>

              {/* Text card — alternates col 1 / col 3, same as before */}
              <div
                className={cn(
                  "row-start-1 self-start",
                  isRight ? "col-start-3 pl-3 sm:pl-6" : "col-start-1 pr-3 sm:pr-6"
                )}
              >
                <StoryMilestoneCard milestone={milestone} index={index} isLast={isLast} />
              </div>

              {/* Photo cell — opposite column from text */}
              <div
                className={cn(
                  "row-start-1 self-start",
                  isRight ? "col-start-1 pr-3 sm:pr-6" : "col-start-3 pl-3 sm:pl-6"
                )}
              >
                <div className="rounded-card overflow-hidden aspect-video bg-blush">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photoSrc}
                    alt={photoAlt}
                    className="w-full h-full object-contain p-2 md:p-3"
                  />
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
