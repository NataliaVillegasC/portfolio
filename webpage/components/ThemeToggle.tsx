'use client'

import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  function toggle() {
    const next = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
    setDark(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg-muted transition-colors hover:border-accent hover:text-accent"
    >
      {/* Render both; CSS picks one — avoids hydration mismatch. SVGs, not glyphs, so they center exactly. */}
      <svg
        className="hidden dark:block"
        aria-hidden
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
      </svg>
      <svg
        className="block dark:hidden"
        aria-hidden
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M20.4 14.7A8.5 8.5 0 0 1 9.3 3.6a8.5 8.5 0 1 0 11.1 11.1Z" />
      </svg>
    </button>
  )
}
