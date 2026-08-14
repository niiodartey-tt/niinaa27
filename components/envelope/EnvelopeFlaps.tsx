"use client"

import { motion } from "framer-motion"
import type { EnvelopeState } from "./types"

const FLAP_COLOR = '#EDE8DF'
const FLAP_BORDER = 'rgba(180,160,130,0.25)'
// bloom-2 is already white — lift brightness, add carved light/shadow
const EW = 'brightness(1.45) contrast(0.72) drop-shadow(1.5px 1.5px 0 rgba(255,255,255,0.92)) drop-shadow(-0.8px -0.8px 0 rgba(0,0,0,0.07))'

interface Props { state: EnvelopeState }

const spring = { type: 'spring' as const, stiffness: 75, damping: 12 }

/* eslint-disable @next/next/no-img-element */
export function EnvelopeFlaps({ state }: Props) {
  const isOpen = state === 'opening' || state === 'revealed'

  return (
    <div
      className="absolute inset-0 rounded-[16px] overflow-hidden"
      style={{ perspective: '700px' }}
    >
      {/* ── Bottom flap ─────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: 'polygon(0% 100%, 100% 100%, 50% 55%)',
          backgroundColor: FLAP_COLOR,
          borderTop: `1px solid ${FLAP_BORDER}`,
          transformOrigin: 'bottom center',
          backfaceVisibility: 'hidden',
          willChange: 'transform',
        }}
        animate={isOpen ? { rotateX: -145 } : { rotateX: 0 }}
        transition={{ ...spring, delay: 0 }}
      >
        <img src="/bloom-2.png" alt="" aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{ bottom: '-5%', left: '10%', width: '38%', opacity: 0.36, filter: EW, transform: 'rotate(180deg)' }}
        />
        <img src="/bloom-2.png" alt="" aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{ bottom: '-5%', right: '8%', width: '35%', opacity: 0.32, filter: EW, transform: 'rotate(160deg)' }}
        />
      </motion.div>

      {/* ── Left flap ───────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: 'polygon(0% 0%, 0% 100%, 48% 50%)',
          backgroundColor: FLAP_COLOR,
          borderRight: `1px solid ${FLAP_BORDER}`,
          transformOrigin: 'left center',
          backfaceVisibility: 'hidden',
          willChange: 'transform',
        }}
        animate={isOpen ? { rotateY: 145 } : { rotateY: 0 }}
        transition={{ ...spring, delay: isOpen ? 0.15 : 0 }}
      >
        <img src="/bloom-2.png" alt="" aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{ top: '10%', left: '-22%', width: '60%', opacity: 0.28, filter: EW, transform: 'rotate(90deg)' }}
        />
      </motion.div>

      {/* ── Right flap ──────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: 'polygon(100% 0%, 100% 100%, 52% 50%)',
          backgroundColor: FLAP_COLOR,
          borderLeft: `1px solid ${FLAP_BORDER}`,
          transformOrigin: 'right center',
          backfaceVisibility: 'hidden',
          willChange: 'transform',
        }}
        animate={isOpen ? { rotateY: -145 } : { rotateY: 0 }}
        transition={{ ...spring, delay: isOpen ? 0.15 : 0 }}
      >
        <img src="/bloom-2.png" alt="" aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{ top: '10%', right: '-22%', width: '60%', opacity: 0.28, filter: EW, transform: 'rotate(-90deg)' }}
        />
      </motion.div>

      {/* ── Top flap — most visible in idle, densest floral ─────── */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 50% 48%)',
          backgroundColor: FLAP_COLOR,
          borderBottom: `1px solid ${FLAP_BORDER}`,
          transformOrigin: 'top center',
          backfaceVisibility: 'hidden',
          willChange: 'transform',
        }}
        animate={isOpen ? { rotateX: 145 } : { rotateX: 0 }}
        transition={{ ...spring, delay: isOpen ? 0.3 : 0 }}
      >
        {/* Left gardenia */}
        <img src="/bloom-2.png" alt="" aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{ top: '-18%', left: '2%', width: '44%', opacity: 0.42, filter: EW, transform: 'rotate(10deg)' }}
        />
        {/* Right gardenia */}
        <img src="/bloom-2.png" alt="" aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{ top: '-18%', right: '2%', width: '42%', opacity: 0.40, filter: EW, transform: 'rotate(-8deg)' }}
        />
        {/* Center gardenia — fills gap between the two outer ones */}
        <img src="/bloom-2.png" alt="" aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{ top: '-5%', left: '28%', width: '44%', opacity: 0.25, filter: EW, transform: 'rotate(3deg)' }}
        />
      </motion.div>
    </div>
  )
}
