#!/usr/bin/env node
/**
 * Regenerates src/data/countries.gen.ts from src/data/countries.csv.
 * Ran automatically by every dev/build script (`npm run gen` at the root).
 *
 * The CSV is the editing surface: add a row, run a build, done.
 * Kept dependency-free on purpose so it runs in any environment.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const csvPath = join(here, '../src/data/countries.csv')
const outPath = join(here, '../src/data/countries.gen.ts')

/** Minimal CSV parser with support for double-quoted fields. */
function parseCsv(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"'
        i++
      } else if (c === '"') {
        inQuotes = false
      } else {
        field += c
      }
    } else if (c === '"') {
      inQuotes = true
    } else if (c === ',') {
      row.push(field)
      field = ''
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      row.push(field)
      field = ''
      if (row.some((f) => f !== '')) rows.push(row)
      row = []
    } else {
      field += c
    }
  }
  if (field !== '' || row.length > 0) {
    row.push(field)
    if (row.some((f) => f !== '')) rows.push(row)
  }
  return rows
}

const CONTINENTS = ['South America', 'North America', 'Europe', 'Asia', 'Africa', 'Oceania']
const STATUSES = ['lived', 'visited']

const rows = parseCsv(readFileSync(csvPath, 'utf8'))
const header = rows.shift()
const expected = ['name', 'continent', 'status', 'map_key', 'lat', 'lng', 'note', 'counts_as']
if (!header || header.join(',') !== expected.join(',')) {
  console.error(`countries.csv header must be exactly: ${expected.join(',')}`)
  process.exit(1)
}

const countries = rows.map((r, i) => {
  const line = i + 2
  const [name, continent, status, mapKey, lat, lng, note, countsAs] = r
  if (!name) fail(line, 'name is required')
  if (!CONTINENTS.includes(continent))
    fail(line, `continent must be one of: ${CONTINENTS.join(', ')}`)
  if (!STATUSES.includes(status)) fail(line, `status must be one of: ${STATUSES.join(', ')}`)
  if (lat && isNaN(Number(lat))) fail(line, 'lat must be a number')
  if (lng && isNaN(Number(lng))) fail(line, 'lng must be a number')
  if (!['0', '1'].includes(countsAs)) fail(line, 'counts_as must be 0 or 1')
  return {
    name,
    continent,
    status,
    mapKey: mapKey ?? '',
    lat: lat ? Number(lat) : null,
    lng: lng ? Number(lng) : null,
    note: note ?? '',
    countsAs: Number(countsAs),
  }
})

function fail(line, msg) {
  console.error(`countries.csv line ${line}: ${msg}`)
  process.exit(1)
}

const visited = countries.reduce((n, c) => n + c.countsAs, 0)
const lived = countries.filter((c) => c.status === 'lived').length

const out = `// AUTO-GENERATED from countries.csv — do not edit by hand.
// Regenerate with \`npm run gen\` at the repository root.
import type { Country } from '../schemas'

export const countries: Country[] = ${JSON.stringify(countries, null, 2)}

export const countriesVisitedCount = ${visited}
export const countriesLivedCount = ${lived}
`

writeFileSync(outPath, out)
console.log(`✓ countries.gen.ts — ${countries.length} rows, ${visited} counted, ${lived} lived-in`)
