"use client"

import { motion } from "framer-motion"
import type { EnvelopeState } from "./types"

const FLAP_COLOR = '#EDE8DF'
const FLAP_BORDER = 'rgba(180,160,130,0.35)'

interface Props { state: EnvelopeState }

const spring = { type: 'spring' as const, stiffness: 75, damping: 12 }

export function EnvelopeFlaps({ state }: Props) {
  const isOpen = state === 'opening' || state === 'revealed'

  return (
    <div
      className="absolute inset-0"
      style={{ perspective: '700px' }}
    >
      {/* Bottom flap — delay 0 */}
      <motion.div
        className="absolute inset-0"
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
      />

      {/* Left flap — delay 0.15 */}
      <motion.div
        className="absolute inset-0"
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
      />

      {/* Right flap — delay 0.15 */}
      <motion.div
        className="absolute inset-0"
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
      />

      {/* Top flap — delay 0.30 (opens upward, rotates on X toward viewer) */}
      <motion.div
        className="absolute inset-0"
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
      />
    </div>
  )
}
