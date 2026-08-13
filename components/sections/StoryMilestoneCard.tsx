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
        "rounded-card",
        isInView ? "animate-fade-up opacity-0" : "opacity-0",
        isLast ? "border-2 border-gold-base" : "p-px bg-gold-shimmer"
      )}
    >
      <div
        className={cn(
          "overflow-hidden bg-ivory",
          isLast ? "rounded-[26px] p-4 sm:p-6" : "rounded-[27px] p-3 sm:p-5"
        )}
      >
        <p className={cn(
          "font-sans text-xs sm:text-sm tracking-widest uppercase mb-1.5",
          isLast ? "text-ink" : "text-taupe"
        )}>
          {milestone.date}
        </p>
        <h3 className={cn(
          "font-serif text-sm sm:text-xl uppercase mb-2 text-ink"
        )}>
          {milestone.title}
        </h3>
        <p className={cn(
          "font-serif text-sm sm:text-base leading-relaxed",
          isLast ? "text-ink" : "text-taupe"
        )}>
          {milestone.description}
        </p>
      </div>
    </div>
  )
}
