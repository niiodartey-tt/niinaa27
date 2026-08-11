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
        "rounded-card bg-ivory overflow-hidden p-3 sm:p-5",
        isInView ? "animate-fade-up opacity-0" : "opacity-0",
        isLast ? "border-2 border-gold-base" : "border border-hairline"
      )}
    >
      <p className="font-sans text-[10px] tracking-widest uppercase mb-1.5 text-taupe">
        {milestone.date}
      </p>
      <h3 className="font-serif text-sm sm:text-xl uppercase mb-2 text-ink">
        {milestone.title}
      </h3>
      <p className="font-serif text-sm sm:text-base leading-relaxed line-clamp-3 sm:line-clamp-none text-taupe">
        {milestone.description}
      </p>
    </div>
  )
}
