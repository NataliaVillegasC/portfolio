'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * The journey timeline inks itself in: the dashed border underneath is
 * the route ahead, and this solid line is the route already traveled.
 * It grows with scroll (scrubbed, so it moves both ways), with a pen-nib
 * dot riding the leading edge. Absolutely positioned over the parent's
 * left border — the parent must be `relative`.
 */
export function RouteInk() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el?.parentElement) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        el,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement,
            start: 'top 70%',
            end: 'bottom 55%',
            scrub: 0.7,
          },
        }
      )
    })

    return () => mm.revert()
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute -left-0.5 top-0 w-0.5 bg-accent opacity-70"
      style={{ height: 0 }}
    >
      <span className="absolute -bottom-1 -left-[5px] block h-3 w-3 rounded-full bg-accent shadow-[0_0_0_4px_var(--bg)]" />
    </div>
  )
}
