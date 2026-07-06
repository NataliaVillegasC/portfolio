'use client'

import { useEffect } from 'react'
import { profile } from '@natalia/shared'

/**
 * The journal's leather cover: the site opens on it, closed, and stays
 * closed until the reader taps (or presses a key, or tries to scroll).
 * The opening itself is pure CSS (see .journal-cover in globals.css):
 * the cover turns first, then two paper pages follow a beat behind.
 *
 * The inline script runs during HTML parse, before first paint, so the
 * cover is there from the very first frame: once per session, never for
 * prefers-reduced-motion, and never without JS (the default state is
 * display: none). The session flag is only set once the reader actually
 * opens it, so an unopened reload starts at the cover again.
 */
const coverScript = `try {
  if (!sessionStorage.getItem('journal-cover-played')
      && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('show-cover')
  }
} catch {}`

export function CoverOpen() {
  useEffect(() => {
    const html = document.documentElement
    if (!html.classList.contains('show-cover')) return

    let timer: ReturnType<typeof setTimeout> | undefined
    const lastPage = document.querySelector('.cover-page-under')

    const finish = () => {
      clearTimeout(timer)
      html.classList.remove('show-cover', 'cover-opening')
    }

    const open = () => {
      if (html.classList.contains('cover-opening')) return
      html.classList.add('cover-opening')
      try {
        sessionStorage.setItem('journal-cover-played', '1')
      } catch {}
      // the last page turning is what ends the overlay
      lastPage?.addEventListener('animationend', finish, { once: true })
      // fallback in case animationend never fires
      timer = setTimeout(finish, 3000)
    }

    window.addEventListener('pointerdown', open)
    window.addEventListener('keydown', open)
    window.addEventListener('wheel', open, { passive: true })
    window.addEventListener('touchmove', open, { passive: true })

    return () => {
      clearTimeout(timer)
      lastPage?.removeEventListener('animationend', finish)
      window.removeEventListener('pointerdown', open)
      window.removeEventListener('keydown', open)
      window.removeEventListener('wheel', open)
      window.removeEventListener('touchmove', open)
    }
  }, [])

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: coverScript }} />
      <div className="journal-cover" aria-hidden="true">
        <div className="cover-page cover-page-under" />
        <div className="cover-page cover-page-top" />
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
