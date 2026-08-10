import { cn } from "@/lib/utils"
import {
  SproutIcon,
  Heart2Icon,
  TreeOfLifeIcon,
  InfinityIcon,
  HeartLeafIcon,
  CelticKnotIcon,
  RingsIcon,
} from "@/components/illustrations/SiteIconsMilestone"

interface MilestoneNodeProps {
  index: number
  isLast: boolean
  className?: string
}

const ICONS = [
  SproutIcon,
  Heart2Icon,
  TreeOfLifeIcon,
  InfinityIcon,
  HeartLeafIcon,
  CelticKnotIcon,
  RingsIcon,
] as const

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
      <Icon className="w-5 h-5" />
    </div>
  )
}
