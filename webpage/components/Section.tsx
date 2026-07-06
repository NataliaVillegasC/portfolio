import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

export function Section({
  id,
  kicker,
  title,
  children,
  className = '',
}: {
  id: string
  kicker: string
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-12 sm:py-16 ${className}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="section-kicker font-mono text-base uppercase tracking-[0.25em] text-accent">
            {kicker}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <svg
            className="ink-underline"
            viewBox="0 0 176 12"
            width="160"
            height="11"
            fill="none"
            aria-hidden="true"
          >
            <path pathLength={100} d="M2 7 C 24 2, 44 2, 66 6 S 108 11, 130 6 S 166 3, 174 7" />
          </svg>
        </Reveal>
        <div className="mt-8 sm:mt-10">{children}</div>
      </div>
    </section>
  )
}
