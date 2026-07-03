'use client'

import { useRef, useState, type ReactNode } from 'react'

type Tip = { x: number; y: number; name: string; note: string; status: string }

/**
 * Client shell around the server-rendered map SVG.
 * Delegated hover: any child with [data-name] gets an elegant tooltip.
 */
export function MapTooltip({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [tip, setTip] = useState<Tip | null>(null)

  function onMove(e: React.MouseEvent) {
    const target = (e.target as Element).closest('[data-name]')
    const wrap = wrapRef.current
    if (!target || !wrap) {
      setTip(null)
      return
    }
    const rect = wrap.getBoundingClientRect()
    setTip({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      name: target.getAttribute('data-name') ?? '',
      note: target.getAttribute('data-note') ?? '',
      status: target.getAttribute('data-status') ?? '',
    })
  }

  return (
    <div ref={wrapRef} className="relative" onMouseMove={onMove} onMouseLeave={() => setTip(null)}>
      {children}
      {tip && (
        <div
          className="pointer-events-none absolute z-10 max-w-56 rounded-xl border border-line bg-card px-4 py-3 shadow-lg"
          style={{ left: tip.x + 14, top: tip.y - 10 }}
          role="status"
        >
          <p className="font-display text-sm font-semibold">{tip.name}</p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-accent">
            {tip.status === 'lived' ? 'Lived here' : 'Visited'}
          </p>
          {tip.note && <p className="mt-1 text-xs leading-relaxed text-fg-muted">{tip.note}</p>}
        </div>
      )}
    </div>
  )
}
