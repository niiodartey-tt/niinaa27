"use client"

import { cn } from "@/lib/utils"
import { MilestoneNode } from "@/components/illustrations/MilestoneNode"
import { StoryMilestoneCard } from "@/components/sections/StoryMilestoneCard"
import type { StoryMilestone } from "@/types/sanity"

// Flip to true to re-enable the photo column once real images are ready per milestone.
// The 2022 photo (milestone order 2) is already configured below and will appear immediately.
const SHOW_PHOTOS = false

// Temporary static photo map — keyed by milestone order (1-based).
// Drop the file in public/our-story/, add an entry here, and set objectPosition
// if the default "center" crop cuts off faces or key detail.
// TODO: replace with Sanity image field + GROQ projection when CMS wiring is done.
type MilestonePhoto = {
  src: string
  objectFit?: React.CSSProperties["objectFit"]
  objectPosition?: string
}

const MILESTONE_PHOTOS: Record<number, MilestonePhoto> = {
  2: { src: "/our-story/2022.png" },
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
          const staticPhoto = MILESTONE_PHOTOS[milestone.order]
          const photoSrc =
            milestone.imageUrl ??
            staticPhoto?.src ??
            (index % 2 === 0 ? "/peony-1.png" : "/peony-2.png")
          const photoObjectFit = staticPhoto?.objectFit ?? "cover"
          const photoObjectPosition = staticPhoto?.objectPosition ?? "center"
          const photoAlt = milestone.imageUrl ? (milestone.imageAlt ?? "") : ""

          return (
            <li
              key={milestone._id}
              className={cn(
                "relative grid pb-10 sm:pb-14 last:pb-0",
                SHOW_PHOTOS
                  ? "grid-cols-[1fr_2.5rem_1fr] sm:grid-cols-[1fr_3rem_1fr]"
                  : "grid-cols-[2.5rem_1fr] sm:grid-cols-[3rem_1fr]"
              )}
            >
              {/* Segmented line: runs from this icon's bottom to the next icon's top only */}
              {!isLast && (
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute top-6 bottom-0 w-px bg-rose/30",
                    SHOW_PHOTOS
                      ? "left-1/2 -translate-x-px"
                      : "left-[1.25rem] sm:left-[1.5rem] -translate-x-px"
                  )}
                />
              )}

              {/* Node — col 2 when photos shown, col 1 when text-only */}
              <div
                className={cn(
                  "row-start-1 self-start flex items-start justify-center relative z-10",
                  SHOW_PHOTOS ? "col-start-2" : "col-start-1"
                )}
              >
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute top-1/2 -translate-y-px h-px w-5 bg-rose/40",
                    SHOW_PHOTOS
                      ? (isRight ? "left-full" : "right-full")
                      : "left-full"
                  )}
                />
                <MilestoneNode index={index} isLast={isLast} />
              </div>

              {/* Text card — alternates sides when photos shown, always right when text-only */}
              <div
                className={cn(
                  "row-start-1 self-start",
                  SHOW_PHOTOS
                    ? (isRight ? "col-start-3 pl-3 sm:pl-6" : "col-start-1 pr-3 sm:pr-6")
                    : "col-start-2 pl-3 sm:pl-6"
                )}
              >
                <StoryMilestoneCard milestone={milestone} index={index} isLast={isLast} />
              </div>

              {/* Photo cell — disabled until per-milestone images are ready.
                  Flip SHOW_PHOTOS above to re-enable; the 2022 image is already positioned. */}
              {SHOW_PHOTOS && (
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
                      className="w-full h-full"
                      style={{ objectFit: photoObjectFit, objectPosition: photoObjectPosition }}
                    />
                  </div>
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
