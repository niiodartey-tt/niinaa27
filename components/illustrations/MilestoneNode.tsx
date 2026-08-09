import { cn } from "@/lib/utils"

interface MilestoneNodeProps {
  index: number
  isLast: boolean
  className?: string
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-5 h-5">
      <path d="M10 17C10 17 3 13 3 8.5A4 4 0 0 1 10 5.2A4 4 0 0 1 17 8.5C17 13 10 17 10 17Z" />
    </svg>
  )
}

function BloomIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-5 h-5">
      <ellipse cx="10" cy="5.5" rx="2" ry="3.5" />
      <ellipse cx="14.5" cy="10" rx="3.5" ry="2" />
      <ellipse cx="10" cy="14.5" rx="2" ry="3.5" />
      <ellipse cx="5.5" cy="10" rx="3.5" ry="2" />
      <circle cx="10" cy="10" r="2.5" />
    </svg>
  )
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-5 h-5">
      <path d="M10 17C10 17 3 13 3 8.5A6 6 0 0 1 10 3A6 6 0 0 1 17 8.5C17 13 10 17 10 17Z" />
    </svg>
  )
}

function RingIcon() {
  return (
    <svg viewBox="0 0 22 18" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" className="w-5 h-5">
      <circle cx="8" cy="9" r="5.5" />
      <circle cx="14" cy="9" r="5.5" />
    </svg>
  )
}

const ICONS = [HeartIcon, BloomIcon, LeafIcon, RingIcon] as const

export function MilestoneNode({ index, isLast, className }: MilestoneNodeProps) {
  const Icon = isLast ? BloomIcon : (ICONS[index % 4] ?? HeartIcon)

  return (
    <div
      className={cn(
        "w-9 h-9 rounded-full border-2 flex items-center justify-center shrink-0",
        isLast
          ? "bg-rose border-rose text-ivory"
          : "bg-ivory border-rose text-rose",
        className
      )}
    >
      <Icon />
    </div>
  )
}
