import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

/**
 * A handwritten aside taped into the margin — the nerdy fact or field
 * observation a traveler scribbles next to the "real" text. Use <strong>
 * inside for the bit worth underlining.
 */
export function MarginNote({
  children,
  rotate = -2,
  tapeRotate = 3,
  className = '',
}: {
  children: ReactNode
  rotate?: number
  tapeRotate?: number
  className?: string
}) {
  return (
    <Reveal className={className}>
      <aside
        className="margin-note"
        style={{
          ['--rot' as string]: `${rotate}deg`,
          ['--tape-rot' as string]: `${tapeRotate}deg`,
        }}
      >
        {children}
      </aside>
    </Reveal>
  )
}
