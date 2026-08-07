interface BloomMarkerProps {
  progress: number
  className?: string
}

function getStage(progress: number): 0 | 1 | 2 | 3 {
  return Math.min(3, Math.round(progress * 3)) as 0 | 1 | 2 | 3
}

export function BloomMarker({ progress, className }: BloomMarkerProps) {
  const stage = getStage(progress)

  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {stage === 0 && (
        <g>
          {/* Closed bud — narrow pointed oval */}
          <path d="M10,3 C13,3 14,6.5 14,10 C14,13.5 13,17 10,17 C7,17 6,13.5 6,10 C6,6.5 7,3 10,3Z" />
          {/* Center vein suggesting tightly folded petals */}
          <line x1="10" y1="3" x2="10" y2="8" strokeWidth={1} />
        </g>
      )}

      {stage === 1 && (
        <g>
          {/* Slightly wider bud body — first separation at the seam */}
          <path d="M10,3 C14,3 15.5,6.5 15.5,10 C15.5,13.5 14,17 10,17 C6,17 4.5,13.5 4.5,10 C4.5,6.5 6,3 10,3Z" />
          {/* Two side petal arcs just beginning to emerge */}
          <path d="M4.5,8 C2.5,8 2,10 2.5,12" strokeWidth={1.2} />
          <path d="M15.5,8 C17.5,8 18,10 17.5,12" strokeWidth={1.2} />
        </g>
      )}

      {stage === 2 && (
        <g>
          {/* Four open petals — teardrop curves from centre to tip */}
          <path d="M10,10 C7.5,8 7.5,5 10,3 C12.5,5 12.5,8 10,10Z" />
          <path d="M10,10 C7.5,12 7.5,15 10,17 C12.5,15 12.5,12 10,10Z" />
          <path d="M10,10 C8,7.5 5,7.5 3,10 C5,12.5 8,12.5 10,10Z" />
          <path d="M10,10 C12,7.5 15,7.5 17,10 C15,12.5 12,12.5 10,10Z" />
          {/* Open centre disc */}
          <circle cx="10" cy="10" r="2" />
        </g>
      )}

      {stage === 3 && (
        /* Full bloom — filled solid, overrides root fill="none" and stroke */
        <g fill="currentColor" stroke="none">
          <path d="M10,10 C7.5,8 7.5,5 10,3 C12.5,5 12.5,8 10,10Z" />
          <path d="M10,10 C7.5,12 7.5,15 10,17 C12.5,15 12.5,12 10,10Z" />
          <path d="M10,10 C8,7.5 5,7.5 3,10 C5,12.5 8,12.5 10,10Z" />
          <path d="M10,10 C12,7.5 15,7.5 17,10 C15,12.5 12,12.5 10,10Z" />
          <circle cx="10" cy="10" r="2.5" />
        </g>
      )}
    </svg>
  )
}
