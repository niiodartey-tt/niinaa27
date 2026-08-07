"use client"

import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"
import type { StoryMilestone } from "@/types/sanity"

interface StoryMilestoneCardProps {
  milestone: StoryMilestone
  delay?: number
  isLast?: boolean
}

export function StoryMilestoneCard({
  milestone,
  delay = 0,
  isLast = false,
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
        {/* Timeline dot */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute -left-[5px] top-5 block w-2.5 h-2.5 rounded-full ring-2",
            isLast
              ? "bg-rose ring-rose"
              : "bg-blush ring-rose/50"
          )}
        />

        {/* Card surface */}
        <div
          className={cn(
            "rounded-card p-5 md:p-6 border",
            isLast
              ? "bg-rose border-rose"
              : "bg-ivory border-hairline"
          )}
        >
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
    </li>
  )
}
