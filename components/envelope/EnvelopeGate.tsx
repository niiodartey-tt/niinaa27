"use client"

import { useState } from "react"
import { EnvelopeLanding } from "./EnvelopeLanding"

interface Props {
  children: React.ReactNode
}

export function EnvelopeGate({ children }: Props) {
  const [opened, setOpened] = useState(false)

  return (
    <>
      {!opened && <EnvelopeLanding onComplete={() => setOpened(true)} />}
      {children}
    </>
  )
}
