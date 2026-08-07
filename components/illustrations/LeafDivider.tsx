import { cn } from "@/lib/utils"

interface LeafDividerProps {
  className?: string
  "aria-hidden"?: boolean | "true" | "false"
}

// Horizontal botanical divider — used between sections.
// A centre diamond flanked by branching stems with paired leaf shapes.
export function LeafDivider({
  className,
  "aria-hidden": ariaHidden = "true",
}: LeafDividerProps) {
  return (
    <svg
      viewBox="0 0 400 60"
      fill="none"
      aria-hidden={ariaHidden}
      className={cn("w-full h-auto", className)}
    >
      {/* Centre diamond */}
      <path
        d="M 200 10 L 212 30 L 200 50 L 188 30 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* Left horizontal stem */}
      <path
        d="M 188 30 L 50 30"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      {/* Left leaf pairs — upper and lower leaves at three positions */}
      <path d="M 158 30 C 155 22 163 16 166 25" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M 158 30 C 155 38 163 44 166 35" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M 122 30 C 119 20 129 13 132 23" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M 122 30 C 119 40 129 47 132 37" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M 88 30 C 85 21 95 14 98 24" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M 88 30 C 85 39 95 46 98 36" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      {/* Left end dot */}
      <circle cx="47" cy="30" r="2.5" stroke="currentColor" strokeWidth="1" />

      {/* Right horizontal stem */}
      <path
        d="M 212 30 L 350 30"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      {/* Right leaf pairs — mirror of left */}
      <path d="M 242 30 C 245 22 237 16 234 25" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M 242 30 C 245 38 237 44 234 35" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M 278 30 C 281 20 271 13 268 23" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M 278 30 C 281 40 271 47 268 37" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M 312 30 C 315 21 305 14 302 24" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M 312 30 C 315 39 305 46 302 36" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      {/* Right end dot */}
      <circle cx="353" cy="30" r="2.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}
