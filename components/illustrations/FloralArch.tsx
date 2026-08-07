import { cn } from "@/lib/utils"

interface FloralArchProps {
  className?: string
  "aria-hidden"?: boolean | "true" | "false"
}

// Hero illustration: two mirrored botanical branches curving upward to form
// a wedding arch. currentColor means Tailwind text-* classes control stroke colour.
export function FloralArch({
  className,
  "aria-hidden": ariaHidden = "true",
}: FloralArchProps) {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      aria-hidden={ariaHidden}
      className={cn("w-full h-auto", className)}
    >
      {/* Left main stem */}
      <path
        d="M 20 295 C 15 200 55 100 198 28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Right main stem */}
      <path
        d="M 380 295 C 385 200 345 100 202 28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Left leaves — almond shapes rotating outward along the stem */}
      <path
        d="M 42 242 C 10 225 8 196 40 188 C 55 184 60 210 42 242 Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M 75 188 C 42 170 40 141 72 134 C 88 130 93 158 75 188 Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M 112 133 C 82 114 82 86 112 80 C 128 77 132 106 112 133 Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M 152 80 C 126 62 128 36 155 32 C 170 29 173 56 152 80 Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />

      {/* Right leaves — mirror of left */}
      <path
        d="M 358 242 C 390 225 392 196 360 188 C 345 184 340 210 358 242 Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M 325 188 C 358 170 360 141 328 134 C 312 130 307 158 325 188 Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M 288 133 C 318 114 318 86 288 80 C 272 77 268 106 288 133 Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M 248 80 C 274 62 272 36 245 32 C 230 29 227 56 248 80 Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />

      {/* Apex — small circle bud where the two stems meet */}
      <circle cx="200" cy="24" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="200" cy="24" r="2" fill="currentColor" />
    </svg>
  )
}
