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
    <Icon
      className={cn(
        "w-6 h-6 shrink-0",
        isLast ? "text-rose-dark" : "text-rose",
        className
      )}
    />
  )
}
