export default function GoldGradientDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <linearGradient id="gold-shimmer" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#7A5C2E" />
          <stop offset="25%"  stopColor="#D4AF6A" />
          <stop offset="50%"  stopColor="#F5E1A4" />
          <stop offset="75%"  stopColor="#D4AF6A" />
          <stop offset="100%" stopColor="#7A5C2E" />
        </linearGradient>
      </defs>
    </svg>
  )
}
