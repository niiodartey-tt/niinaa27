interface GrowthMarkerProps {
  progress: number
  className?: string
}

function getStage(progress: number): 0 | 1 | 2 | 3 {
  return Math.min(3, Math.round(progress * 3)) as 0 | 1 | 2 | 3
}

export function GrowthMarker({ progress, className }: GrowthMarkerProps) {
  const stage = getStage(progress)

  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      {stage === 0 && (
        <line x1="10" y1="16" x2="10" y2="12" />
      )}

      {stage === 1 && (
        <>
          <line x1="10" y1="16" x2="10" y2="9" />
          <circle cx="7" cy="12" r="1.5" />
        </>
      )}

      {stage === 2 && (
        <>
          <line x1="10" y1="16" x2="10" y2="6" />
          <circle cx="13" cy="12" r="1.5" />
          <circle cx="7" cy="9" r="1.5" />
        </>
      )}

      {stage === 3 && (
        <g fill="currentColor" stroke="none">
          <rect x="9.25" y="5" width="1.5" height="11" rx="0.75" />
          <circle cx="13" cy="12" r="1.5" />
          <circle cx="7" cy="9" r="1.5" />
          <circle cx="10" cy="5" r="2" />
        </g>
      )}
    </svg>
  )
}
