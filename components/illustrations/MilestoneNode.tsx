import { cn } from "@/lib/utils"

interface MilestoneNodeProps {
  index: number
  isLast: boolean
  className?: string
}

// All icons: viewBox 0 0 20 20, strokeWidth 1.75, strokeLinecap round, no bezier curves or ellipses.

function SproutIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" aria-hidden="true" className="w-5 h-5">
      <line x1="10" y1="16" x2="10" y2="12" />
      <line x1="10" y1="12" x2="7" y2="8" />
      <line x1="10" y1="12" x2="13" y2="8" />
      <circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="13" cy="7" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function SaplingIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" aria-hidden="true" className="w-5 h-5">
      <line x1="10" y1="17" x2="10" y2="5" />
      <line x1="10" y1="11" x2="6.5" y2="8" />
      <line x1="10" y1="11" x2="13.5" y2="8" />
      <circle cx="6" cy="7" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="14" cy="7" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="10" cy="4" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" aria-hidden="true" className="w-5 h-5">
      <line x1="10" y1="10" x2="4" y2="4" />
      <line x1="10" y1="10" x2="16" y2="4" />
      <line x1="10" y1="10" x2="16" y2="16" />
      <line x1="10" y1="10" x2="4" y2="16" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" aria-hidden="true" className="w-5 h-5">
      <circle cx="10" cy="10" r="3" />
      <line x1="10" y1="5.5" x2="10" y2="2" />
      <line x1="13.9" y1="7.8" x2="16.9" y2="6" />
      <line x1="13.9" y1="12.2" x2="16.9" y2="14" />
      <line x1="10" y1="14.5" x2="10" y2="18" />
      <line x1="6.1" y1="12.2" x2="3.1" y2="14" />
      <line x1="6.1" y1="7.8" x2="3.1" y2="6" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" aria-hidden="true" className="w-5 h-5">
      <circle cx="7.5" cy="8" r="3" />
      <circle cx="12.5" cy="8" r="3" />
      <line x1="4.5" y1="9" x2="10" y2="17.5" />
      <line x1="15.5" y1="9" x2="10" y2="17.5" />
    </svg>
  )
}

function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" aria-hidden="true" className="w-5 h-5">
      <line x1="10" y1="8" x2="10" y2="17" />
      <line x1="10" y1="4" x2="5.5" y2="9" />
      <line x1="10" y1="4" x2="14.5" y2="9" />
    </svg>
  )
}

function RingIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" aria-hidden="true" className="w-5 h-5">
      <circle cx="7" cy="10" r="5" />
      <circle cx="13" cy="10" r="5" />
    </svg>
  )
}

const ICONS = [SproutIcon, SaplingIcon, SparkIcon, SunIcon, HeartIcon, ArrowUpIcon, RingIcon] as const

export function MilestoneNode({ index, isLast, className }: MilestoneNodeProps) {
  const Icon = ICONS[index % ICONS.length] ?? SproutIcon

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
