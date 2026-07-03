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
          className="polaroid tape z-10 mt-6 flex w-full flex-col !rotate-0 p-5 sm:absolute sm:right-6 sm:top-6 sm:mt-0 sm:max-h-[calc(100%-3rem)] sm:w-[22rem] sm:p-6"
          style={{ ['--z' as string]: 10 }}
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            aria-label="Close"
            className="absolute right-2.5 top-2 font-mono text-sm text-fg-muted hover:text-accent"
          >
            ✕
          </button>
          {/* scroll lives on an inner div so the tape (which overhangs the card) isn't clipped */}
          <div className="min-h-0 overflow-y-auto">
            <div className="flex items-center gap-3 pr-5">
              {selected.flag && <span className="text-3xl">{selected.flag}</span>}
              <h3 className="font-display text-xl font-semibold leading-tight">{selected.name}</h3>
            </div>
            <span
              className={`stamp stamp-rect mt-3 inline-flex px-3 py-1 text-[10px] ${
                selected.status === 'lived' ? 'text-accent' : 'text-postal'
              }`}
              style={{ ['--rot' as string]: '-2deg' }}
            >
              {selected.status === 'lived' ? 'Lived here' : 'Visited'}
            </span>
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
          </div>
        </aside>
      )}
    </div>
  )
}
