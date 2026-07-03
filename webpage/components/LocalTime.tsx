'use client'

import { useEffect, useState } from 'react'
import { profile } from '@natalia/shared'

/** 'Currently in Prague · 14:32 CET' — the global-citizen status line. */
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: profile.location.timezone,
      }).format(new Date())
    setTime(format())
    const id = setInterval(() => setTime(format()), 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <p className="font-mono text-xs tracking-wide text-fg-muted">
      <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-sage align-middle" />
      Currently in {profile.location.city}
      {time ? ` · ${time} ${profile.location.timezoneLabel}` : ''}
    </p>
  )
}
