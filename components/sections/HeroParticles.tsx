"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

const COUNT = 80

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const canvas = canvasRef.current
    if (!canvas) return

    // Test on a throwaway canvas — acquiring a webgl1 context on the render canvas
    // would block Three.js from creating its webgl2 context on the same element.
    const probe = document.createElement("canvas")
    if (!probe.getContext("webgl2") && !probe.getContext("webgl")) return

    let W = window.innerWidth
    let H = window.innerHeight

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(W, H)
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, 0.1, 100)
    camera.position.z = 10

    const posArray = new Float32Array(COUNT * 3)
    const vx = new Float32Array(COUNT)
    const vy = new Float32Array(COUNT)

    for (let i = 0; i < COUNT; i++) {
      posArray[i * 3]     = (Math.random() - 0.5) * W
      posArray[i * 3 + 1] = (Math.random() - 0.5) * H
      posArray[i * 3 + 2] = 0
      vx[i] = (Math.random() - 0.5) * 0.22
      vy[i] = (Math.random() - 0.5) * 0.12 + 0.06 // gentle upward drift
    }

    const geo = new THREE.BufferGeometry()
    const attr = new THREE.BufferAttribute(posArray, 3)
    geo.setAttribute("position", attr)

    const mat = new THREE.PointsMaterial({
      color: 0xfbf9f4,
      size: 1.6,
      transparent: true,
      opacity: 0.32,
      sizeAttenuation: false,
    })

    scene.add(new THREE.Points(geo, mat))

    let animId: number

    function animate() {
      animId = requestAnimationFrame(animate)
      const halfW = W / 2
      const halfH = H / 2
      for (let i = 0; i < COUNT; i++) {
        // Local vars avoid noUncheckedIndexedAccess complaints on TypedArray reads
        let px = (posArray[i * 3]     ?? 0) + (vx[i] ?? 0)
        let py = (posArray[i * 3 + 1] ?? 0) + (vy[i] ?? 0)
        if (px >  halfW) px = -halfW
        if (px < -halfW) px =  halfW
        if (py >  halfH) py = -halfH
        if (py < -halfH) py =  halfH
        posArray[i * 3]     = px
        posArray[i * 3 + 1] = py
      }
      attr.needsUpdate = true
      renderer.render(scene, camera)
    }

    animate()

    function onResize() {
      W = window.innerWidth
      H = window.innerHeight
      renderer.setSize(W, H)
      camera.left   = -W / 2
      camera.right  =  W / 2
      camera.top    =  H / 2
      camera.bottom = -H / 2
      camera.updateProjectionMatrix()
    }
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", onResize)
      renderer.dispose()
      geo.dispose()
      mat.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}
