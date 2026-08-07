"use client"

import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"
import type { StoryMilestone } from "@/types/sanity"

interface StoryMilestoneCardProps {
  milestone: StoryMilestone
  delay?: number
}

export function StoryMilestoneCard({ milestone, delay = 0 }: StoryMilestoneCardProps) {
  const { ref, isInView } = useInView()

  return (
    <li className="pb-10 last:pb-0">
      {/* ref on inner div — useInView is typed HTMLDivElement, li is HTMLLIElement */}
      <div
        ref={ref}
        style={{ animationDelay: `${delay}ms` }}
        className={cn(
          "relative pl-8",
          isInView ? "animate-fade-up opacity-0" : "opacity-0"
        )}
      >
        <span
          aria-hidden="true"
          className="absolute -left-[5px] top-1.5 block w-2.5 h-2.5 rounded-full bg-blush ring-2 ring-rose/50"
        />
        <p className="font-sans text-xs text-taupe tracking-widest uppercase mb-1">
          {milestone.date}
        </p>
        <h3 className="font-serif text-xl md:text-2xl text-ink mb-2">
          {milestone.title}
        </h3>
        <p className="font-serif text-base text-taupe leading-relaxed">
          {milestone.description}
        </p>
      </div>
    </li>
  )
}
