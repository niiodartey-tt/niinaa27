"use client"

import { Camera } from "lucide-react"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"
import { GrowthMarker } from "@/components/illustrations/GrowthMarker"
import type { StoryMilestone } from "@/types/sanity"

interface StoryMilestoneCardProps {
  milestone: StoryMilestone
  delay?: number
  isLast?: boolean
  progress: number
}

export function StoryMilestoneCard({
  milestone,
  delay = 0,
  isLast = false,
  progress,
}: StoryMilestoneCardProps) {
  const { ref, isInView } = useInView()

  return (
    <li className="pb-6 last:pb-0">
      <div
        ref={ref}
        style={{ animationDelay: `${delay}ms` }}
        className={cn(
          "relative pl-8",
          isInView ? "animate-fade-up opacity-0" : "opacity-0"
        )}
      >
        {/* Timeline growth marker */}
        <GrowthMarker
          progress={progress}
          className="absolute -left-2.5 top-4 w-5 h-5 text-rose shrink-0"
        />

        {/* Card surface */}
        <div
          className={cn(
            "rounded-card border overflow-hidden",
            isLast
              ? "bg-rose border-rose"
              : "bg-ivory border-hairline"
          )}
        >
          {/* Photo — real image when available, styled placeholder otherwise */}
          {milestone.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={milestone.imageUrl}
              alt={milestone.imageAlt ?? ""}
              className="w-full aspect-video object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className={cn(
                "w-full aspect-video flex items-center justify-center",
                isLast ? "bg-rose-dark/20" : "bg-blush/40"
              )}
            >
              <Camera className={cn("w-8 h-8", isLast ? "text-ivory/40" : "text-taupe/40")} aria-hidden="true" />
            </div>
          )}

          <div className="p-5 md:p-6">
            <p
              className={cn(
                "font-sans text-xs tracking-widest uppercase mb-1",
                isLast ? "text-ivory" : "text-taupe"
              )}
            >
              {milestone.date}
            </p>
            <h3
              className={cn(
                "font-serif text-xl md:text-2xl mb-2",
                isLast ? "text-ivory" : "text-ink"
              )}
            >
              {milestone.title}
            </h3>
            <p
              className={cn(
                "font-serif text-base leading-relaxed",
                isLast ? "text-ivory" : "text-taupe"
              )}
            >
              {milestone.description}
            </p>
          </div>
        </div>
      </div>
    </li>
  )
}
