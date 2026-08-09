"use client"

import { useState, useEffect } from "react"
import { KineticDigit } from "@/components/sections/KineticDigit"

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
    { label: "Days",  value: time?.days    },
    { label: "Hours", value: time?.hours   },
    { label: "Mins",  value: time?.minutes },
    { label: "Secs",  value: time?.seconds },
  ]

  return (
    <div
      className="flex gap-2 md:gap-3 mt-8 md:mt-10"
      aria-label="Countdown to the wedding"
    >
      {units.map(({ label, value }) => (
        <KineticDigit
          key={label}
          label={label}
          value={value !== undefined ? String(value).padStart(2, "0") : "--"}
        />
      ))}
    </div>
  )
}
