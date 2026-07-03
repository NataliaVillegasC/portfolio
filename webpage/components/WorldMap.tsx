import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { FeatureCollection, Geometry } from 'geojson'
import { countries, profile } from '@natalia/shared'
import world from 'world-atlas/countries-110m.json'
import { Section } from './Section'
import { Reveal } from './Reveal'
import { MapExplorer } from './MapExplorer'

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

/** Flag pins for the countries that have been home. */
const LIVED_FLAGS: Record<string, string> = {
  Colombia: '🇨🇴',
  'United Kingdom': '🇬🇧',
  Czechia: '🇨🇿',
  'South Korea': '🇰🇷',
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
  const flags: { x: number; y: number; flag: string; key: string }[] = []
  const shapes = features.map((f) => {
    const atlasName = f.properties?.name ?? ''
    const key = byMapKey.has(atlasName) ? atlasName : ATLAS_ALIASES[atlasName]
    const info = key ? byMapKey.get(key) : undefined
    if (key && info) {
      matched.add(key)
      if (info.status === 'lived' && LIVED_FLAGS[key]) {
        const [x, y] = path.centroid(f as never)
        flags.push({ x, y, flag: LIVED_FLAGS[key], key })
      }
    }
    return {
      d: path(f as never) ?? '',
      atlasName,
      info: info
        ? { ...info, label: info.names.join(' · '), flag: LIVED_FLAGS[key ?? ''] ?? '' }
        : undefined,
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

  return (
    <Section id="map" kicker="The map" title="Thirty-six countries, four homes">
      <Reveal>
        <p className="max-w-2xl text-lg leading-relaxed text-fg-muted">
          Every stamped shape is a story. <span className="text-fg">Click a country</span> — the
          flagged ones are the four I’ve called home.
        </p>
      </Reveal>

      <Reveal className="mt-10">
        <MapExplorer>
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
                  data-flag={s.info.flag}
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
            {flags.map((f) => {
              const info = byMapKey.get(f.key)
              return (
                <g
                  key={f.key}
                  className="map-flag"
                  transform={`translate(${f.x}, ${f.y - 14})`}
                  data-status="lived"
                  data-name={info?.names.join(' · ') ?? f.key}
                  data-note={info?.note ?? ''}
                  data-flag={f.flag}
                >
                  <line x1="0" y1="2" x2="0" y2="14" stroke="var(--fg-muted)" strokeWidth="1" />
                  <circle r="10" />
                  <text textAnchor="middle" dy="4" fontSize="12">
                    {f.flag}
                  </text>
                </g>
              )
            })}
          </svg>
        </MapExplorer>

        <div className="mt-4 flex flex-wrap items-center gap-6 font-mono text-xs text-fg-muted">
          <span className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-sm bg-accent" /> lived · flagged
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-sm bg-accent-soft" /> visited
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-sm bg-sand" /> not yet
          </span>
          <span className="font-hand text-lg normal-case tracking-normal text-fg-muted">
            36 stamps and counting…
          </span>
        </div>
      </Reveal>
    </Section>
  )
}
