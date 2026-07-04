'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * A dotted route down the right edge of the page with a tiny plane that
 * flies it as you scroll — the journal's "you are here". The inked trail
 * grows behind the plane. Desktop only; hidden below lg and for
 * reduced-motion readers (CSS handles the latter).
 */
export function FlightProgress() {
  const railRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    const plane = rail.querySelector<HTMLElement>('.plane')
    const trail = rail.querySelector<HTMLElement>('.trail')
    if (!plane || !trail) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1024px)', () => {
      const flight = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'max',
          scrub: 0.8,
        },
      })
      // Percent-based so the rail can be any height.
      flight
        .fromTo(plane, { top: '0%' }, { top: '100%', ease: 'none' }, 0)
        .fromTo(trail, { height: '0%' }, { height: '100%', ease: 'none' }, 0)
    })

    return () => mm.revert()
  }, [])

  return (
    <div ref={railRef} aria-hidden className="flight-rail hidden lg:block">
      <span className="trail" />
      <span className="plane">✈</span>
    </div>
  )
}
