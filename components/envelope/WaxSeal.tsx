"use client"

import { motion } from "framer-motion"
import { Monogram } from "@/components/illustrations/Monogram"
import type { EnvelopeState } from "./types"

interface Props { state: EnvelopeState }

export function WaxSeal({ state }: Props) {
  const isTriggered = state === 'triggered'
  const isOpen = state === 'opening'
  const isGone = state === 'revealed'

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* ── Hourglass / lantern glow — erupts from center on trigger ── */}
      <motion.div
        className="absolute inset-0 rounded-[16px]"
        style={{
          background: [
            'radial-gradient(ellipse 80% 60% at 50% 0%,   rgba(255,205,70,0.96) 0%, rgba(240,175,40,0.55) 38%, transparent 68%)',
            'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,205,70,0.96) 0%, rgba(240,175,40,0.55) 38%, transparent 68%)',
            'radial-gradient(circle at 50% 50%,           rgba(255,230,120,0.85) 0%, transparent 18%)',
          ].join(', '),
          mixBlendMode: 'multiply',
        }}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={
          isGone
            ? { opacity: 0, scale: 1.1 }
            : isOpen
            ? { opacity: 0.88, scale: 1 }
            : isTriggered
            ? { opacity: 0.72, scale: 1 }
            : { opacity: 0, scale: 0.4 }
        }
        transition={
          isGone
            ? { duration: 0.35 }
            : isTriggered
            ? { duration: 0.5, ease: 'easeOut' }
            : isOpen
            ? { duration: 0.4, ease: 'easeOut' }
            : { duration: 0.3 }
        }
      />

      {/* Soft inner glow around seal (idle pulse) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 110,
          height: 150,
          background:
            'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(212,175,106,0.6) 0%, rgba(212,175,106,0.18) 55%, transparent 75%)',
        }}
        animate={
          isGone
            ? { scale: 0, opacity: 0 }
            : isTriggered || isOpen
            ? { scale: 0, opacity: 0 }
            : { scale: [0.85, 1.1, 0.85], opacity: [0.3, 0.65, 0.3] }
        }
        transition={
          isGone || isTriggered || isOpen
            ? { duration: 0.2 }
            : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }
      />

      {/* Gold wax disc */}
      <motion.div
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: 80,
          height: 80,
          background:
            'radial-gradient(circle at 38% 35%, #F5E1A4 0%, #D4AF6A 45%, #9A7040 100%)',
          boxShadow:
            '0 3px 14px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)',
        }}
        animate={
          isGone
            ? { scale: 0, opacity: 0 }
            : isTriggered
            ? { scale: [1, 1.18, 1.08] }
            : isOpen
            ? { scale: 0.85, opacity: 0.5 }
            : { scale: 1 }
        }
        transition={
          isGone
            ? { duration: 0.2 }
            : isTriggered
            ? { duration: 0.5, ease: 'easeOut' }
            : isOpen
            ? { duration: 0.4 }
            : {}
        }
      >
        <Monogram alt="" className="w-12 h-12 invert opacity-80" sizes="48px" />
      </motion.div>
    </div>
  )
}
