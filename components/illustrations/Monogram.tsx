import { cn } from "@/lib/utils"

interface MonogramProps {
  className?: string
  "aria-hidden"?: boolean | "true" | "false"
  wordmark?: boolean
}

// Interlocking T+L monogram. L's vertical threads behind T's crossbar via a
// 6-unit gap centred on y=34. Stroke weight contrast (thick verticals 2.5,
// thin horizontals 1.5) echoes Cormorant Garamond's high-contrast serif cut.
export function Monogram({
  className,
  "aria-hidden": ariaHidden = "true",
  wordmark = true,
}: MonogramProps) {
  return (
    <div
      aria-hidden={ariaHidden}
      className={cn("inline-flex flex-col items-center gap-1.5", className)}
    >
      <svg viewBox="0 0 100 92" fill="none" className="w-full h-auto">
        {/* Thick downstrokes: T stem + L vertical (two segments around gap) */}
        <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="butt">
          {/* T stem */}
          <line x1="43" y1="34" x2="43" y2="88" />
          {/* L vertical — upper stub, projects 24 units above T crossbar (no cap serif:
              plain end reads as "threading stroke" not a separate ornament) */}
          <line x1="68" y1="10" x2="68" y2="31" />
          {/* L vertical — lower body, resumes below T crossbar */}
          <line x1="68" y1="37" x2="68" y2="88" />
        </g>

        {/* Thin horizontals: T crossbar + L foot + L foot-end serif nub */}
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="butt">
          {/* T crossbar — symmetric (6→43←80), extends 12 units past L at x=68 */}
          <line x1="6" y1="34" x2="80" y2="34" />
          {/* L foot */}
          <line x1="68" y1="88" x2="94" y2="88" />
          {/* L foot-end serif nub */}
          <line x1="94" y1="84" x2="94" y2="92" />
        </g>

        {/* Fine serif terminal — T stem base only */}
        <line
          x1="38" y1="88" x2="48" y2="88"
          stroke="currentColor" strokeWidth="1.2" strokeLinecap="butt"
        />
      </svg>

      {wordmark && (
        <span className="font-serif text-[9px] tracking-[0.22em] uppercase text-current whitespace-nowrap block">
          Thomas + Leanne
        </span>
      )}
    </div>
  )
}
