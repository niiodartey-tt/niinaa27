"use client"

export function EnvelopeBody() {
  return (
    <div
      className="absolute inset-0 rounded-lg overflow-hidden"
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

      {/* Embossed floral — top right */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/bloom-2.png"
        alt=""
        aria-hidden="true"
        className="absolute -top-6 -right-6 w-36 pointer-events-none select-none opacity-[0.12]"
        style={{
          filter:
            'sepia(0.1) drop-shadow(1.5px 1.5px 0 rgba(255,255,255,0.55)) drop-shadow(-0.8px -0.8px 0 rgba(0,0,0,0.10))',
        }}
      />

      {/* Embossed floral — bottom left (rotated for symmetry) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/bloom-3.png"
        alt=""
        aria-hidden="true"
        className="absolute -bottom-4 -left-4 w-28 rotate-180 pointer-events-none select-none opacity-[0.09]"
        style={{
          filter:
            'sepia(0.1) drop-shadow(1.5px 1.5px 0 rgba(255,255,255,0.55)) drop-shadow(-0.8px -0.8px 0 rgba(0,0,0,0.10))',
        }}
      />
    </div>
  )
}
