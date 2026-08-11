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
      <ol>
        {milestones.map((milestone, index) => {
          const isRight = index % 2 !== 0
          const isLast = index === milestones.length - 1
          const photoSrc = milestone.imageUrl ?? (index % 2 === 0 ? "/peony-1.png" : "/peony-2.png")
          const photoAlt = milestone.imageUrl ? (milestone.imageAlt ?? "") : ""

          return (
            <li
              key={milestone._id}
              className="relative grid grid-cols-[1fr_2.5rem_1fr] sm:grid-cols-[1fr_3rem_1fr] pb-10 sm:pb-14 last:pb-0"
            >
              {/* Segmented line: runs from this icon's bottom to the next icon's top only */}
              {!isLast && (
                <div
                  aria-hidden="true"
                  className="absolute top-6 bottom-0 left-1/2 -translate-x-px w-px bg-gold-base/30"
                />
              )}

              {/* Node — col 2, icon sits on the line with tick arm toward text card */}
              <div className="col-start-2 row-start-1 self-start flex items-start justify-center relative z-10">
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute top-1/2 -translate-y-px h-px w-5 bg-gold-base/40",
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
                <div className="rounded-card overflow-hidden aspect-video bg-gold-highlight/20">
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
