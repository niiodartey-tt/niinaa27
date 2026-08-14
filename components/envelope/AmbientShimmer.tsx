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

export function AmbientShimmer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const width = canvas.offsetWidth
    const height = canvas.offsetHeight
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    const particles: Particle[] = []
    let rafId: number

    function spawnParticle() {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.5 - 0.1,
        life: 0,
        maxLife: 80 + Math.random() * 60,
        size: Math.random() * 1.6 + 0.4,
      })
    }

    for (let i = 0; i < 20; i++) spawnParticle()

    function draw() {
      ctx!.clearRect(0, 0, width, height)

      if (Math.random() < 0.15) spawnParticle()

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]!
        p.x += p.vx
        p.y += p.vy
        p.life++

        const progress = p.life / p.maxLife
        const alpha = progress < 0.3
          ? progress / 0.3
          : progress > 0.7
          ? (1 - progress) / 0.3
          : 1

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(212,175,106,${alpha * 0.55})`
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
