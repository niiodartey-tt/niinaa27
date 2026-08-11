"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  weddingDate: string
}

function parseTarget(iso: string): Date {
  const parts = iso.split("-")
  const year = Number(parts[0])
  const month = Number(parts[1])
  const day = Number(parts[2])
  if (!year || !month || !day) return new Date(0)
  return new Date(year, month - 1, day)
}

function getRemaining(target: Date) {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  }
}

type TimeState = ReturnType<typeof getRemaining> | null

export function CountdownTimer({ weddingDate }: CountdownTimerProps) {
  const [time, setTime] = useState<TimeState>(null)

  useEffect(() => {
    const target = parseTarget(weddingDate)
    setTime(getRemaining(target))
    const id = setInterval(() => setTime(getRemaining(target)), 1000)
    return () => clearInterval(id)
  }, [weddingDate])

  const units = [
    { label: "Days", value: time?.days },
    { label: "Hours", value: time?.hours },
    { label: "Mins", value: time?.minutes },
    { label: "Secs", value: time?.seconds },
  ]

  return (
    <div
      className="flex gap-2 md:gap-3 mt-8 md:mt-10"
      aria-label="Countdown to the wedding"
    >
      {units.map(({ label, value }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-1.5 border border-ivory/15 bg-white/5 backdrop-blur-sm rounded-xl px-3 py-3 md:px-4 min-w-[60px] md:min-w-[68px] shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
        >
          <span className="font-serif text-2xl md:text-3xl text-ivory/85 tabular-nums leading-none">
            {value !== undefined ? String(value).padStart(2, "0") : "--"}
          </span>
          <span className="font-sans text-[10px] text-ivory/40 tracking-widest uppercase">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
