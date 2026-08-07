import { cn } from "@/lib/utils"

interface AbstractArcProps {
  className?: string
  "aria-hidden"?: boolean | "true" | "false"
}

// Minimal geometric arc — a clean half-circle with an echo line and terminal dots.
// Used as a subtle background/structural element: behind section headings,
// inside card decorations, as a section transition marker.
export function AbstractArc({
  className,
  "aria-hidden": ariaHidden = "true",
}: AbstractArcProps) {
  return (
    <svg
      viewBox="0 0 400 200"
      fill="none"
      aria-hidden={ariaHidden}
      className={cn("w-full h-auto", className)}
    >
      {/* Primary arc */}
      <path
        d="M 20 180 Q 200 20 380 180"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Echo arc — slightly smaller, lower opacity */}
      <path
        d="M 44 185 Q 200 44 356 185"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.4"
      />
      {/* Terminal dots */}
      <circle cx="20" cy="180" r="3" fill="currentColor" />
      <circle cx="380" cy="180" r="3" fill="currentColor" />
    </svg>
  )
}
