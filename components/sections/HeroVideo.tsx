"use client"

import { useEffect, useRef } from "react"

interface HeroVideoProps {
  src: string
  poster: string | undefined
}

export function HeroVideo({ src, poster }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches && videoRef.current) {
      videoRef.current.pause()
    }
  }, [])

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-cover"
    />
  )
}
