"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { EnvelopeBody } from "./EnvelopeBody"
import { EnvelopeFlaps } from "./EnvelopeFlaps"
import { WaxSeal } from "./WaxSeal"
import { AmbientShimmer } from "./AmbientShimmer"
import { LightBurst } from "./LightBurst"
import type { EnvelopeState } from "./types"

// Near full-width envelope — matches reference (edge-to-edge on mobile)
const ENVELOPE_W = 'min(98vw, 560px)'
const ENVELOPE_ASPECT = 10 / 7

interface Props {
  onComplete: () => void
}

export function EnvelopeLanding({ onComplete }: Props) {
  const [state, setState] = useState<EnvelopeState>('idle')
  const [mounted, setMounted] = useState(true)

  const handleTap = useCallback(() => {
    if (state !== 'idle') return
    setState('triggered')

    setTimeout(() => setState('opening'), 600)
    setTimeout(() => setState('revealed'), 1800)
    setTimeout(() => {
      setMounted(false)
      onComplete()
    }, 2300)
  }, [state, onComplete])

  const [showHint, setShowHint] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 900)
    return () => clearTimeout(t)
  }, [])

  if (!mounted) return null

  return (
    <AnimatePresence>
      <motion.div
        key="envelope-landing"
        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        style={{ backgroundColor: '#F0EBE0' }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {/* Subtle warm radial bg wash */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 48%, rgba(245,235,210,0.9) 0%, rgba(224,212,188,0.4) 60%, transparent 90%)',
          }}
        />

        {/* Envelope wrapper — subtle card shadow so it lifts off background */}
        <motion.div
          animate={
            state === 'idle'
              ? { y: [0, -4, 0] }
              : state === 'triggered'
              ? { scale: 1.02, y: 0 }
              : state === 'opening'
              ? { scale: [1.02, 1.07, 1.04] }
              : { scale: 1.04, opacity: 0, y: -24 }
          }
          transition={
            state === 'idle'
              ? { duration: 4, repeat: Infinity, ease: 'easeInOut' }
              : state === 'opening'
              ? { duration: 0.8, ease: 'easeOut' }
              : state === 'revealed'
              ? { duration: 0.5, ease: 'easeIn' }
              : { duration: 0.35 }
          }
          className="relative cursor-pointer select-none"
          style={{
            width: ENVELOPE_W,
            aspectRatio: `${ENVELOPE_ASPECT}`,
            borderRadius: 16,
            boxShadow: '0 4px 22px rgba(0,0,0,0.10), 0 1px 6px rgba(0,0,0,0.07)',
          }}
          onClick={handleTap}
          role="button"
          tabIndex={0}
          aria-label="Open your invitation"
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') ? handleTap() : undefined}
        >
          {/* Corner shimmer — inside envelope so particles appear at its bottom corners */}
          <AmbientShimmer />

          {/* Light burst canvas */}
          <LightBurst active={state === 'triggered' || state === 'opening'} />

          {/* Envelope body (background layer) */}
          <EnvelopeBody />

          {/* Flaps */}
          <EnvelopeFlaps state={state} />

          {/* Wax seal + hourglass glow */}
          <WaxSeal state={state} />
        </motion.div>

        {/* Tap hint */}
        <AnimatePresence>
          {showHint && state === 'idle' && (
            <motion.p
              key="hint"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.7 }}
              className="mt-6 font-serif text-sm tracking-widest uppercase"
              style={{ color: 'rgba(138,114,103,0.75)' }}
            >
              Tap to open
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}
