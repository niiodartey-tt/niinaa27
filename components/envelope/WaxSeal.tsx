"use client"

import { motion } from "framer-motion"
import { Monogram } from "@/components/illustrations/Monogram"
import type { EnvelopeState } from "./types"

interface Props { state: EnvelopeState }

export function WaxSeal({ state }: Props) {
  const isTriggered = state === 'triggered'
  const isGone = state === 'opening' || state === 'revealed'

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Hourglass glow aura — taller ellipse, brightest at center */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 90,
          height: 130,
          background:
            'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(212,175,106,0.75) 0%, rgba(212,175,106,0.25) 50%, transparent 75%)',
        }}
        animate={
          isGone
            ? { scale: 0, opacity: 0 }
            : isTriggered
            ? { scale: [1, 3.2, 2.4], opacity: [0.5, 1, 0.75] }
            : { scale: [0.85, 1.1, 0.85], opacity: [0.25, 0.55, 0.25] }
        }
        transition={
          isGone
            ? { duration: 0.25 }
            : isTriggered
            ? { duration: 0.55, ease: 'easeOut' }
            : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }
      />

      {/* Gold wax disc */}
      <motion.div
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: 64,
          height: 64,
          background:
            'radial-gradient(circle at 38% 35%, #F5E1A4 0%, #D4AF6A 45%, #9A7040 100%)',
          boxShadow:
            '0 2px 10px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.22)',
        }}
        animate={
          isGone
            ? { scale: 0, opacity: 0 }
            : isTriggered
            ? { scale: [1, 1.14, 1.06] }
            : { scale: 1 }
        }
        transition={
          isGone
            ? { duration: 0.2, delay: 0.05 }
            : isTriggered
            ? { duration: 0.5, ease: 'easeOut' }
            : {}
        }
      >
        {/* Ivory monogram impression on gold */}
        <Monogram alt="" className="w-10 h-10 invert opacity-80" sizes="40px" />
      </motion.div>
    </div>
  )
}
