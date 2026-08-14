"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
}

// Spawn only in bottom-left and bottom-right corner zones of the envelope
function spawnCornerParticle(W: number, H: number): Particle {
  const side = Math.random() < 0.5 ? 'left' : 'right'
  const zoneW = W * 0.28
  const zoneH = H * 0.35
  const x = side === 'left'
    ? Math.random() * zoneW
    : W - Math.random() * zoneW
  const y = H - Math.random() * zoneH
  return {
    x, y,
    vx: (Math.random() - 0.5) * 0.5,
    vy: -Math.random() * 0.7 - 0.2,
    life: 0,
    maxLife: 60 + Math.random() * 50,
    size: Math.random() * 1.8 + 0.5,
  }
}

export function AmbientShimmer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

    const particles: Particle[] = []
    let rafId: number

    // Seed initial particles
    for (let i = 0; i < 12; i++) particles.push(spawnCornerParticle(W, H))

    function draw() {
      ctx!.clearRect(0, 0, W, H)

      if (Math.random() < 0.12) particles.push(spawnCornerParticle(W, H))

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]!
        p.x += p.vx
        p.y += p.vy
        p.life++

        const progress = p.life / p.maxLife
        const alpha = progress < 0.25
          ? progress / 0.25
          : progress > 0.65
          ? (1 - progress) / 0.35
          : 1

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(180,140,60,${alpha * 0.65})`
        ctx!.fill()

        if (p.life >= p.maxLife) particles.splice(i, 1)
      }

      rafId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
