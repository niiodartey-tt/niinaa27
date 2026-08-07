import { cn } from "@/lib/utils"

interface TornEdgeDividerProps {
  topColor: string
  bottomColor: string
  className?: string
}

export function TornEdgeDivider({
  topColor,
  bottomColor,
  className,
}: TornEdgeDividerProps) {
  return (
    <div className={cn("overflow-hidden h-10 md:h-12", className)}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-full block"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="1440" height="80" fill={bottomColor} />
        <path
          fill={topColor}
          d="M0,0 L1440,0 L1440,65 C1400,50 1360,74 1310,55 C1265,38 1230,72 1180,52 C1130,32 1085,70 1030,58 C985,48 940,74 885,50 C835,28 795,68 745,55 C700,44 660,74 605,50 C555,28 510,68 460,55 C415,44 370,74 315,50 C265,28 225,68 175,55 C130,44 85,72 35,55 C20,50 8,60 0,54 Z"
        />
      </svg>
    </div>
  )
}
