'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Global scroll choreography. Renders nothing; wires GSAP to elements
 * that opt in via data attributes:
 *
 *   data-parallax="40"  — drifts ±40px vertically as its parent crosses
 *                         the viewport (positive = moves with scroll,
 *                         negative = floats against it)
 *   data-pop            — pops in with a stamp-like overshoot when it
 *                         enters the viewport (timeline dots, pins)
 *
 * Everything lives inside gsap.matchMedia, so users who prefer reduced
 * motion get a perfectly still journal.
 */
export function ScrollFx() {
  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Parallax layers: journal depth — background stamps and the
      // polaroid drift at different speeds while the text holds still.
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const amount = parseFloat(el.dataset.parallax ?? '0')
        gsap.fromTo(
          el,
          { y: -amount },
          {
            y: amount,
            ease: 'none',
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        )
      })

      // Stamp-thump pop for small markers (journey dots, map pins).
      ScrollTrigger.batch('[data-pop]', {
        start: 'top 88%',
        once: true,
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.45,
              ease: 'back.out(2.5)',
              stagger: 0.08,
            }
          ),
      })
    })

    return () => mm.revert()
  }, [])

  return null
}
