'use client'

import { useEffect, useState } from 'react'
import { profile } from '@natalia/shared'

/** Cycles the hero greeting through the languages of Natalia's life. */
export function Greeting() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % profile.greetings.length)
    }, 2800)
    return () => clearInterval(id)
  }, [])

  const greeting = profile.greetings[index] ?? profile.greetings[0]!

  return (
    <span
      key={greeting.text}
      lang={greeting.lang}
      className="greeting-swap text-accent"
      title={greeting.language}
    >
      {greeting.text}
    </span>
  )
}
