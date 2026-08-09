import { cn } from "@/lib/utils"

interface MonogramProps {
  className?: string
  "aria-hidden"?: boolean | "true" | "false"
}

// T & L monogram in line art — used in Footer.
// Letters drawn as geometric strokes; ampersand as a flowing cursive path.
export function Monogram({
  className,
  "aria-hidden": ariaHidden = "true",
}: MonogramProps) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      aria-hidden={ariaHidden}
      className={cn("w-full h-auto", className)}
    >
      {/* Thin circular border */}
      <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="0.75" opacity="0.35" />

      {/* Left T — crossbar + vertical stem */}
      <path
        d="M 28 52 L 58 52 M 43 52 L 43 112"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Ampersand — flowing cursive stroke */}
      <path
        d="M 83 66 C 83 55 71 50 65 57 C 58 65 67 76 80 84
           C 94 93 100 105 92 115 C 84 124 67 122 61 111
           M 92 115 L 102 122"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right L — vertical stroke + horizontal foot */}
      <path
        d="M 102 52 L 102 112 L 132 112"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
