"use client"

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
        "p-px rounded-card",
        isInView ? "animate-fade-up opacity-0" : "opacity-0",
        isLast ? "bg-rose" : "bg-gold-shimmer"
      )}
    >
      <div
        className={cn(
          "rounded-[27px] overflow-hidden p-3 sm:p-5",
          isLast ? "bg-rose" : "bg-ivory"
        )}
      >
        <p className={cn(
          "font-sans text-xs sm:text-sm tracking-widest uppercase mb-1.5",
          isLast ? "text-ivory/70" : "text-taupe"
        )}>
          {milestone.date}
        </p>
        <h3 className={cn(
          "font-serif text-sm sm:text-xl uppercase mb-2",
          isLast ? "text-ivory" : "text-ink"
        )}>
          {milestone.title}
        </h3>
        <p className={cn(
          "font-serif text-sm sm:text-base leading-relaxed line-clamp-3 sm:line-clamp-none",
          isLast ? "text-ivory" : "text-taupe"
        )}>
          {milestone.description}
        </p>
      </div>
    </div>
  )
}
