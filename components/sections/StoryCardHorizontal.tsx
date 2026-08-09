import { cn } from "@/lib/utils"
import type { StoryMilestone } from "@/types/sanity"

interface StoryCardHorizontalProps {
  milestone: StoryMilestone
  isLast: boolean
}

export function StoryCardHorizontal({ milestone, isLast }: StoryCardHorizontalProps) {
  return (
    <div
      className={cn(
        "w-[340px] shrink-0 rounded-3xl border p-7 flex flex-col justify-between h-[360px]",
        isLast
          ? "bg-rose border-rose"
          : "bg-ivory border-hairline"
      )}
    >
      <div>
        <p
          className={cn(
            "font-sans text-xs tracking-widest uppercase mb-2",
            isLast ? "text-ivory/70" : "text-taupe"
          )}
        >
          {milestone.date}
        </p>
        <h3
          className={cn(
            "font-serif text-2xl mb-3",
            isLast ? "text-ivory" : "text-ink"
          )}
        >
          {milestone.title}
        </h3>
        <p
          className={cn(
            "font-serif text-sm leading-relaxed",
            isLast ? "text-ivory/80" : "text-taupe"
          )}
        >
          {milestone.description}
        </p>
      </div>

      {/* Year badge at bottom */}
      <p
        className={cn(
          "font-sans text-4xl font-light tabular-nums self-end",
          isLast ? "text-ivory/30" : "text-hairline"
        )}
        aria-hidden="true"
      >
        {milestone.date.split(" ").at(-1)}
      </p>
    </div>
  )
}
