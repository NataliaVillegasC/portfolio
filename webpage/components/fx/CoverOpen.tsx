'use client'

import { useEffect } from 'react'
import { profile } from '@natalia/shared'

/**
 * The journal's leather cover, shown closed for a beat and opened with a
 * page-turn when you first arrive. The animation itself is pure CSS
 * (see .journal-cover in globals.css); this component only decides
 * whether it plays and cleans up afterwards.
 *
 * The inline script runs during HTML parse, before first paint, so the
 * cover is there from the very first frame: once per session, never for
 * prefers-reduced-motion, and never without JS (the default state is
 * display: none).
 */
const coverScript = `try {
  if (!sessionStorage.getItem('journal-cover-played')
      && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('show-cover')
    sessionStorage.setItem('journal-cover-played', '1')
  }
} catch {}`

export function CoverOpen() {
  useEffect(() => {
    const html = document.documentElement
    if (!html.classList.contains('show-cover')) return

    const done = () => html.classList.remove('show-cover')
    // fallback in case the animationend event never fires
    const timer = setTimeout(done, 3000)
    const finish = () => {
      clearTimeout(timer)
      done()
    }

    const face = document.querySelector('.cover-face')
    face?.addEventListener('animationend', finish, { once: true })
    // impatient readers can open the cover themselves
    window.addEventListener('pointerdown', finish, { once: true })
    window.addEventListener('keydown', finish, { once: true })

    return () => {
      clearTimeout(timer)
      face?.removeEventListener('animationend', finish)
      window.removeEventListener('pointerdown', finish)
      window.removeEventListener('keydown', finish)
    }
  }, [])

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: coverScript }} />
      <div className="journal-cover" aria-hidden="true">
        <div className="cover-face">
          <div className="cover-frame">
            <p className="cover-kicker">Field notes · travel journal</p>
            <p className="cover-name">{profile.name.split(' ').slice(0, 2).join(' ')}</p>
            <p className="cover-sub">{profile.title}</p>
            <div className="cover-seal">✈</div>
            <p className="cover-hint">tap to open</p>
          </div>
        </div>
      </div>
    </>
  )
}
