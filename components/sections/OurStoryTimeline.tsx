"use client"

import { cn } from "@/lib/utils"
import { MilestoneNode } from "@/components/illustrations/MilestoneNode"
import { StoryMilestoneCard } from "@/components/sections/StoryMilestoneCard"
import type { StoryMilestone } from "@/types/sanity"

// Temporary static photo map — keyed by milestone order (1-based).
// Drop the file in public/our-story/ and add one line here to wire a new photo.
// TODO: replace with Sanity image field + GROQ projection when CMS wiring is done.
const MILESTONE_PHOTOS: Record<number, string> = {
  2: "/our-story/2022.png",
}

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
          const photoSrc =
            milestone.imageUrl ??
            MILESTONE_PHOTOS[milestone.order] ??
            (index % 2 === 0 ? "/peony-1.png" : "/peony-2.png")
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
                  className="absolute top-6 bottom-0 left-1/2 -translate-x-px w-px bg-rose/30"
                />
              )}

              {/* Node — col 2, icon sits on the line with tick arm toward text card */}
              <div className="col-start-2 row-start-1 self-start flex items-start justify-center relative z-10">
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute top-1/2 -translate-y-px h-px w-5 bg-rose/40",
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

              {/* Photo cell — opposite column from text.
                  Mobile: no self-start → stretches to grid row height (= text card height).
                  Desktop (lg+): self-start + aspect-[3/2] gives a landscape crop
                  roughly half the portrait height, independent of text card height. */}
              <div
                className={cn(
                  "row-start-1 lg:self-start",
                  isRight ? "col-start-1 pr-3 sm:pr-6" : "col-start-3 pl-3 sm:pl-6"
                )}
              >
                <div className="rounded-card overflow-hidden h-full lg:h-auto lg:aspect-[3/2] bg-blush">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photoSrc}
                    alt={photoAlt}
                    className="w-full h-full object-cover"
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
