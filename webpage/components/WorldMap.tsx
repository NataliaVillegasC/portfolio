import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { FeatureCollection, Geometry } from 'geojson'
import { countries, profile } from '@natalia/shared'
import world from 'world-atlas/countries-110m.json'
import { Section } from './Section'
import { Reveal } from './Reveal'
import { MapTooltip } from './MapTooltip'

const WIDTH = 960
const HEIGHT = 470

/**
 * world-atlas (Natural Earth) names occasionally differ from ours.
 * Every alias here maps a possible atlas name → our map_key.
 */
const ATLAS_ALIASES: Record<string, string> = {
  'Czech Republic': 'Czechia',
  'United States': 'United States of America',
  'Republic of Korea': 'South Korea',
  'Korea, South': 'South Korea',
  Türkiye: 'Turkey',
  'West Bank': 'Palestine',
}

type CountryFeature = { type: 'Feature'; properties: { name?: string }; geometry: Geometry }

export function WorldMap() {
  const topo = world as unknown as Parameters<typeof feature>[0]
  const objects = (world as unknown as { objects: { countries: never } }).objects.countries
  const collection = feature(topo, objects) as unknown as FeatureCollection
  const features = (collection.features as CountryFeature[]).filter(
    (f) => f.properties?.name !== 'Antarctica'
  )

  const projection = geoNaturalEarth1().fitSize([WIDTH, HEIGHT], {
    type: 'FeatureCollection',
    features,
  } as FeatureCollection)
  const path = geoPath(projection).digits(1)

  // status per atlas name; when UK nations share one geometry, 'lived' wins
  const byMapKey = new Map<string, { status: 'lived' | 'visited'; names: string[]; note: string }>()
  for (const c of countries) {
    if (!c.mapKey) continue
    const existing = byMapKey.get(c.mapKey)
    if (existing) {
      existing.names.push(c.name)
      if (c.status === 'lived') existing.status = 'lived'
      if (c.note) existing.note = c.note
    } else {
      byMapKey.set(c.mapKey, { status: c.status, names: [c.name], note: c.note })
    }
  }

  const matched = new Set<string>()
  const shapes = features.map((f) => {
    const atlasName = f.properties?.name ?? ''
    const key = byMapKey.has(atlasName) ? atlasName : ATLAS_ALIASES[atlasName]
    const info = key ? byMapKey.get(key) : undefined
    if (key && info) matched.add(key)
    return {
      d: path(f as never) ?? '',
      atlasName,
      info: info ? { ...info, label: info.names.join(' · ') } : undefined,
    }
  })

  // Places with no geometry at this scale (Singapore, Malta…) become dots
  const dots = countries
    .filter((c) => c.lat !== null && c.lng !== null && !matched.has(c.mapKey))
    .map((c) => {
      const point = projection([c.lng!, c.lat!])
      return point
        ? { x: point[0], y: point[1], name: c.name, status: c.status, note: c.note }
        : null
    })
    .filter((d) => d !== null)

  for (const [key] of byMapKey) {
    if (
      !matched.has(key) &&
      !dots.some((d) => d.name === key || byMapKey.get(key)?.names.includes(d.name))
    ) {
      console.warn(`[WorldMap] no geometry or dot for "${key}" — check map_key in countries.csv`)
    }
  }

  const lived = countries.filter((c) => c.status === 'lived')

  return (
    <Section id="map" kicker="The map" title="Thirty-six countries, four homes">
      <Reveal>
        <p className="max-w-2xl text-lg leading-relaxed text-fg-muted">
          Every highlighted shape is a stamp in the passport; the deepest terracotta marks the
          places that have been home — {lived.map((c) => c.name).join(', ')}.
        </p>
      </Reveal>

      <Reveal className="mt-10">
        <MapTooltip>
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            role="img"
            aria-label={`World map highlighting the ${profile.stats.countriesVisited} countries Natalia has visited and the ${profile.stats.countriesLived} she has lived in`}
            className="map-appear h-auto w-full"
          >
            {shapes.map((s, i) =>
              s.info ? (
                <path
                  key={i}
                  d={s.d}
                  className="map-country"
                  data-status={s.info.status}
                  data-name={s.info.label}
                  data-note={s.info.note}
                />
              ) : (
                <path key={i} d={s.d} className="map-country" />
              )
            )}
            {dots.map((d) => (
              <circle
                key={d.name}
                cx={d.x}
                cy={d.y}
                r={4}
                className="map-dot"
                data-status={d.status}
                data-name={d.name}
                data-note={d.note}
              />
            ))}
          </svg>
        </MapTooltip>

        <div className="mt-4 flex flex-wrap items-center gap-6 font-mono text-xs text-fg-muted">
          <span className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-sm bg-accent" /> lived
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-sm bg-accent-soft" /> visited
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-sm bg-sand" /> not yet
          </span>
        </div>
      </Reveal>

      <Reveal className="mt-8">
        <details className="group">
          <summary className="cursor-pointer font-mono text-xs uppercase tracking-[0.2em] text-fg-muted transition-colors hover:text-accent">
            All {profile.stats.countriesVisited} countries ↓
          </summary>
          <div className="mt-4 space-y-3">
            {(['South America', 'North America', 'Europe', 'Asia'] as const).map((continent) => {
              const list = countries.filter((c) => c.continent === continent)
              if (list.length === 0) return null
              return (
                <div key={continent} className="flex flex-wrap items-baseline gap-2">
                  <span className="w-32 shrink-0 font-mono text-xs text-sage">{continent}</span>
                  {list.map((c) => (
                    <span
                      key={c.name}
                      className={`rounded-full px-3 py-1 text-xs ${
                        c.status === 'lived' ? 'bg-accent text-bg' : 'bg-sand text-fg-muted'
                      }`}
                    >
                      {c.name}
                    </span>
                  ))}
                </div>
              )
            })}
          </div>
        </details>
      </Reveal>
    </Section>
  )
}
