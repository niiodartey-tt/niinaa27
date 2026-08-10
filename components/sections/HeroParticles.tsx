"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

// Per-particle sparkle via ShaderMaterial — PointsMaterial has one global opacity,
// which can't produce independent twinkle cycles per particle.

const COUNT = 130

const VERT = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute float aSpeed;
  uniform   float uTime;
  varying   float vAlpha;

  void main() {
    gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize;
    // Each particle has its own phase and speed → independent twinkle rhythm
    vAlpha = 0.55 + 0.40 * sin(uTime * aSpeed + aPhase);
  }
`

const FRAG = /* glsl */ `
  uniform vec3  uColor;
  varying float vAlpha;

  void main() {
    // Soft disc falloff — particles glow rather than appear as hard pixels
    float d     = length(gl_PointCoord - vec2(0.5));
    float alpha = smoothstep(0.5, 0.22, d) * vAlpha;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(uColor, alpha);
  }
`

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // ── Non-negotiable 1: prefers-reduced-motion ──────────────────────────────
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const canvas = canvasRef.current
    if (!canvas) return

    // ── Non-negotiable 2: WebGL graceful fallback ────────────────────────────
    // Probe a throwaway element — claiming a context on the render canvas
    // before Three.js gets it causes "existing context of a different type".
    const probe = document.createElement("canvas")
    if (!probe.getContext("webgl2") && !probe.getContext("webgl")) return

    // StrictMode double-invoke guard — flag short-circuits the RAF loop
    // before dispose() runs, preventing dangling animation after cleanup.
    let live = true

    let W = window.innerWidth
    let H = window.innerHeight

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(W, H)
    renderer.setClearColor(0x000000, 0)

    const scene  = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, 0.1, 100)
    camera.position.z = 10

    const posArray = new Float32Array(COUNT * 3)
    const vx       = new Float32Array(COUNT)
    const vy       = new Float32Array(COUNT)
    const sizes    = new Float32Array(COUNT)
    const phases   = new Float32Array(COUNT)
    const speeds   = new Float32Array(COUNT)

    for (let i = 0; i < COUNT; i++) {
      posArray[i * 3]     = (Math.random() - 0.5) * W
      posArray[i * 3 + 1] = (Math.random() - 0.5) * H
      posArray[i * 3 + 2] = 0
      vx[i]     = (Math.random() - 0.5) * 0.10
      vy[i]     = (Math.random() - 0.5) * 0.06 + 0.025 // gentle upward drift
      sizes[i]  = 2.0 + Math.random() * 3.5             // 2.0–5.5 px for depth variation
      phases[i] = Math.random() * Math.PI * 2            // random start in cycle
      speeds[i] = 0.8 + Math.random() * 1.7              // 0.8–2.5 Hz twinkle frequency
    }

    const geo     = new THREE.BufferGeometry()
    const posAttr = new THREE.BufferAttribute(posArray, 3)
    geo.setAttribute("position", posAttr)
    geo.setAttribute("aSize",    new THREE.BufferAttribute(sizes,  1))
    geo.setAttribute("aPhase",   new THREE.BufferAttribute(phases, 1))
    geo.setAttribute("aSpeed",   new THREE.BufferAttribute(speeds, 1))

    // Store uniform refs directly — avoids noUncheckedIndexedAccess on uniforms map
    const uTime  = { value: 0 }
    const uColor = { value: new THREE.Color(0xfaf7f0) } // warm ivory

    const mat = new THREE.ShaderMaterial({
      vertexShader:   VERT,
      fragmentShader: FRAG,
      uniforms:       { uTime, uColor },
      transparent:    true,
      depthWrite:     false,
    })

    scene.add(new THREE.Points(geo, mat))

    let   animId   = 0
    const t0       = performance.now()

    function animate() {
      if (!live) return
      animId = requestAnimationFrame(animate)
      uTime.value = (performance.now() - t0) / 1000

      const halfW = W / 2
      const halfH = H / 2
      for (let i = 0; i < COUNT; i++) {
        let px = (posArray[i * 3]     ?? 0) + (vx[i] ?? 0)
        let py = (posArray[i * 3 + 1] ?? 0) + (vy[i] ?? 0)
        if (px >  halfW) px = -halfW
        if (px < -halfW) px =  halfW
        if (py >  halfH) py = -halfH
        if (py < -halfH) py =  halfH
        posArray[i * 3]     = px
        posArray[i * 3 + 1] = py
      }
      posAttr.needsUpdate = true
      renderer.render(scene, camera)
    }
    animate()

    function onResize() {
      W = window.innerWidth
      H = window.innerHeight
      renderer.setSize(W, H)
      camera.left = -W / 2; camera.right  =  W / 2
      camera.top  =  H / 2; camera.bottom = -H / 2
      camera.updateProjectionMatrix()
    }
    window.addEventListener("resize", onResize)

    return () => {
      live = false
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", onResize)
      // Explicitly lose the WebGL context so the canvas is clean for any
      // subsequent mount (React StrictMode remounts in dev).
      renderer.getContext().getExtension("WEBGL_lose_context")?.loseContext()
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
