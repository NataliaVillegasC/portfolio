'use client'

import { useState, type ReactNode } from 'react'

type Selected = { name: string; status: string; note: string; flag: string }

/**
 * Client shell around the server-rendered map SVG.
 * Click any element with [data-name] to open its journal card.
 */
export function MapExplorer({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<Selected | null>(null)

  function onClick(e: React.MouseEvent) {
    const target = (e.target as Element).closest('[data-name]')
    if (!target) {
      setSelected(null)
      return
    }
    setSelected({
      name: target.getAttribute('data-name') ?? '',
      status: target.getAttribute('data-status') ?? '',
      note: target.getAttribute('data-note') ?? '',
      flag: target.getAttribute('data-flag') ?? '',
    })
  }

  return (
    <div className="relative">
      {/* Delegated click on server-rendered SVG children; Escape/close button for keyboards */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
      <div onClick={onClick}>{children}</div>

      {selected && (
        <aside
          role="dialog"
          aria-label={`About ${selected.name}`}
          className="polaroid tape absolute right-2 top-2 z-10 w-72 max-w-[85%] !rotate-0 p-5 sm:right-6 sm:top-6"
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            aria-label="Close"
            className="absolute right-2.5 top-2 font-mono text-sm text-fg-muted hover:text-accent"
          >
            ✕
          </button>
          <div className="flex items-center gap-3">
            {selected.flag && <span className="text-3xl">{selected.flag}</span>}
            <div>
              <h3 className="font-display text-lg font-semibold leading-tight">{selected.name}</h3>
              <span
                className={`stamp stamp-rect mt-1 inline-flex px-2 py-0.5 text-[9px] ${
                  selected.status === 'lived' ? 'text-accent' : 'text-postal'
                }`}
                style={{ ['--rot' as string]: '-2deg' }}
              >
                {selected.status === 'lived' ? 'Lived here' : 'Visited'}
              </span>
            </div>
          </div>
          {selected.note && (
            <p className="font-hand mt-3 text-xl leading-snug text-fg-muted">{selected.note}</p>
          )}
          {selected.status === 'lived' && (
            <a
              href="#journey"
              className="mt-3 inline-block text-sm text-postal underline decoration-dashed underline-offset-4 hover:text-accent"
              onClick={() => setSelected(null)}
            >
              Read this chapter in the journey ↑
            </a>
          )}
        </aside>
      )}
    </div>
  )
}
