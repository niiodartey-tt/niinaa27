"use client"

const EW = 'brightness(1.45) contrast(0.72) drop-shadow(1.5px 1.5px 0 rgba(255,255,255,0.92)) drop-shadow(-0.8px -0.8px 0 rgba(0,0,0,0.07))'
const EC = 'grayscale(1) brightness(1.55) contrast(0.70) drop-shadow(1.5px 1.5px 0 rgba(255,255,255,0.95)) drop-shadow(-0.8px -0.8px 0 rgba(0,0,0,0.06))'

/* eslint-disable @next/next/no-img-element */
export function EnvelopeBody() {
  return (
    <div
      className="absolute inset-0 rounded-[16px] overflow-hidden"
      style={{ backgroundColor: '#FBF9F4' }}
    >
      {/* Diagonal fold lines from each corner to center */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <line x1="0"    y1="0"    x2="50%" y2="50%" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
        <line x1="100%" y1="0"    x2="50%" y2="50%" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
        <line x1="0"    y1="100%" x2="50%" y2="50%" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
        <line x1="100%" y1="100%" x2="50%" y2="50%" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
      </svg>

      {/* Body florals — revealed as flaps peel open during animation */}
      <img src="/bloom-2.png" alt="" aria-hidden="true"
        className="absolute pointer-events-none select-none"
        style={{ top: '-10%', left: '-5%', width: '50%', opacity: 0.35, filter: EW, transform: 'rotate(-12deg)' }}
      />
      <img src="/bloom-2.png" alt="" aria-hidden="true"
        className="absolute pointer-events-none select-none"
        style={{ top: '-10%', right: '-5%', width: '46%', opacity: 0.35, filter: EW, transform: 'rotate(10deg)' }}
      />
      <img src="/peony-1.png" alt="" aria-hidden="true"
        className="absolute pointer-events-none select-none"
        style={{ bottom: '-8%', right: '-6%', width: '48%', opacity: 0.30, filter: EC, transform: 'rotate(175deg)' }}
      />
      <img src="/peony-1.png" alt="" aria-hidden="true"
        className="absolute pointer-events-none select-none"
        style={{ bottom: '-8%', left: '-4%', width: '40%', opacity: 0.30, filter: EC, transform: 'rotate(190deg)' }}
      />

      {/* Subtle parchment vignette */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[16px]"
        style={{
          background: 'radial-gradient(ellipse 120% 120% at 50% 50%, transparent 55%, rgba(200,185,160,0.15) 100%)',
        }}
      />
    </div>
  )
}
