"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { EnvelopeBody } from "./EnvelopeBody"
import { EnvelopeFlaps } from "./EnvelopeFlaps"
import { WaxSeal } from "./WaxSeal"
import { AmbientShimmer } from "./AmbientShimmer"
import { LightBurst } from "./LightBurst"
import type { EnvelopeState } from "./types"

const ENVELOPE_W = 'min(340px, 88vw)'
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

  // Pulse hint text fade after idle
  const [showHint, setShowHint] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 800)
    return () => clearTimeout(t)
  }, [])

  if (!mounted) return null

  const envelopeH = `calc(${ENVELOPE_W} / ${ENVELOPE_ASPECT})`

  return (
    <AnimatePresence>
      <motion.div
        key="envelope-landing"
        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        style={{ backgroundColor: '#120D08' }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {/* Background shimmer */}
        <div className="absolute inset-0">
          <AmbientShimmer />
        </div>

        {/* Floating envelope */}
        <motion.div
          animate={
            state === 'idle'
              ? { y: [0, -6, 0] }
              : state === 'triggered'
              ? { scale: 1.04, y: 0 }
              : state === 'opening'
              ? { scale: [1.04, 1.12, 1.08] }
              : { scale: 1.08, opacity: 0, y: -30 }
          }
          transition={
            state === 'idle'
              ? { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
              : state === 'opening'
              ? { duration: 0.8, ease: 'easeOut' }
              : state === 'revealed'
              ? { duration: 0.5, ease: 'easeIn' }
              : { duration: 0.4 }
          }
          className="relative cursor-pointer select-none"
          style={{ width: ENVELOPE_W, height: envelopeH }}
          onClick={handleTap}
          role="button"
          tabIndex={0}
          aria-label="Open your invitation"
          onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? handleTap() : undefined}
        >
          {/* Light burst canvas — active when seal fires */}
          <LightBurst active={state === 'triggered' || state === 'opening'} />

          {/* Body (background layer) */}
          <EnvelopeBody />

          {/* Flaps (sit on top of body) */}
          <EnvelopeFlaps state={state} />

          {/* Wax seal (center, above all) */}
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
              transition={{ duration: 0.6 }}
              className="mt-8 font-serif text-sm tracking-widest uppercase"
              style={{ color: 'rgba(212,175,106,0.6)' }}
            >
              Tap to open
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}
