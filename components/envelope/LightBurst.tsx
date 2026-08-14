"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Props { active: boolean }

export function LightBurst({ active }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const activeRef = useRef(false)

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const W = canvas.offsetWidth
    const H = canvas.offsetHeight
    canvas.width = W * dpr
    canvas.height = H * dpr
    ctx.scale(dpr, dpr)

    interface Spark {
      angle: number
      speed: number
      dist: number
      maxDist: number
      size: number
      life: number
      maxLife: number
    }

    const sparks: Spark[] = []
    let rafId: number
    let globalAlpha = 0

    function spawnSpark() {
      sparks.push({
        angle: Math.random() * Math.PI * 2,
        speed: 1.8 + Math.random() * 2.5,
        dist: 0,
        maxDist: 60 + Math.random() * 80,
        size: 1 + Math.random() * 1.4,
        life: 0,
        maxLife: 35 + Math.random() * 30,
      })
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H)
      const cx = W / 2
      const cy = H / 2

      if (activeRef.current) {
        globalAlpha = Math.min(1, globalAlpha + 0.08)
        if (Math.random() < 0.35) spawnSpark()
      } else {
        globalAlpha = Math.max(0, globalAlpha - 0.05)
      }

      if (globalAlpha <= 0 && sparks.length === 0) {
        rafId = requestAnimationFrame(draw)
        return
      }

      // 10 radial rays
      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2
        const len = 50 + Math.sin(Date.now() / 700 + i) * 12
        const grad = ctx!.createLinearGradient(
          cx, cy,
          cx + Math.cos(angle) * len,
          cy + Math.sin(angle) * len
        )
        grad.addColorStop(0, `rgba(245,225,164,${0.55 * globalAlpha})`)
        grad.addColorStop(1, `rgba(245,225,164,0)`)
        ctx!.beginPath()
        ctx!.moveTo(cx, cy)
        ctx!.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len)
        ctx!.strokeStyle = grad
        ctx!.lineWidth = 1.2
        ctx!.stroke()
      }

      // Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]!
        s.dist += s.speed
        s.life++
        const px = cx + Math.cos(s.angle) * s.dist
        const py = cy + Math.sin(s.angle) * s.dist
        const t = s.life / s.maxLife
        const alpha = t < 0.2 ? t / 0.2 : t > 0.6 ? (1 - t) / 0.4 : 1
        ctx!.beginPath()
        ctx!.arc(px, py, s.size, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(245,225,164,${alpha * globalAlpha * 0.85})`
        ctx!.fill()
        if (s.life >= s.maxLife || s.dist >= s.maxDist) sparks.splice(i, 1)
      }

      rafId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.4 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />
    </motion.div>
  )
}
