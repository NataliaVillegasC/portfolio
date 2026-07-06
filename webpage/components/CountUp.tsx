'use client'

import { useEffect, useRef } from 'react'

/** Counts the numeric part of a stat string up from zero when scrolled
 *  into view ("15,000+" rolls 0 → 15,000+; prefix and suffix stay put).
 *  The server renders the final value, so no-JS readers and crawlers
 *  always see the real number; reduced-motion users skip the roll. */
export function CountUp({ value, duration = 1300 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const match = value.match(/[\d,]*\d(?:\.\d+)?/)
    if (!match || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const target = Number(match[0].replace(/,/g, ''))
    const decimals = (match[0].split('.')[1] ?? '').length
    const prefix = value.slice(0, match.index)
    const suffix = value.slice((match.index ?? 0) + match[0].length)
    const format = (n: number) =>
      prefix +
      n.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: match[0].includes(','),
      }) +
      suffix

    let raf = 0
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1)
          el.textContent = format(target * (1 - Math.pow(1 - t, 3)))
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, duration])

  return <span ref={ref}>{value}</span>
}
