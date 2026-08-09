"use client"

import { Camera } from "lucide-react"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"
import type { StoryMilestone } from "@/types/sanity"

interface StoryMilestoneCardProps {
  milestone: StoryMilestone
  index: number
  isLast?: boolean
}

export function StoryMilestoneCard({
  milestone,
  index,
  isLast = false,
}: StoryMilestoneCardProps) {
  const { ref, isInView } = useInView()

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${index * 100}ms` }}
      className={cn(
        "rounded-card border overflow-hidden",
        isInView ? "animate-fade-up opacity-0" : "opacity-0",
        isLast ? "bg-rose border-rose" : "bg-ivory border-hairline"
      )}
    >
      {/* Photo */}
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
          <Camera
            className={cn("w-6 h-6", isLast ? "text-ivory/40" : "text-taupe/40")}
            aria-hidden="true"
          />
        </div>
      )}

      <div className="p-4 sm:p-5">
        <p
          className={cn(
            "font-sans text-[10px] tracking-widest uppercase mb-1.5",
            isLast ? "text-ivory/70" : "text-taupe"
          )}
        >
          {milestone.date}
        </p>
        <h3
          className={cn(
            "font-serif text-base sm:text-xl uppercase mb-2",
            isLast ? "text-ivory" : "text-ink"
          )}
        >
          {milestone.title}
        </h3>
        <p
          className={cn(
            "font-serif text-sm sm:text-base leading-relaxed",
            isLast ? "text-ivory" : "text-taupe"
          )}
        >
          {milestone.description}
        </p>
      </div>
    </div>
  )
}
