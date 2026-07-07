const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const

/** '2026-01' → 'Jan 2026'; 'Present' and other non-dates pass through untouched */
export function formatMonthYear(value: string): string {
  const match = /^(\d{4})-(\d{2})$/.exec(value)
  if (!match) return value
  const month = MONTHS[Number(match[2]) - 1]
  return month ? `${month} ${match[1]}` : value
}

/** '2026-01' + 'Present' → 'Jan 2026 – Present' */
export function formatRange(start: string, end: string): string {
  return `${formatMonthYear(start)} – ${formatMonthYear(end)}`
}

/** '2026-01' → 2026 */
export function yearOf(value: string): number {
  return Number(value.slice(0, 4))
}

/**
 * Joins the two email parts into a full address. Call it only from code that
 * runs in the browser (useEffect / onMount), never during prerender — that
 * keeps the address out of static HTML and JS bundles where harvesters
 * regex for email patterns.
 */
export function buildEmail(parts: readonly [string, string]): string {
  return `${parts[0]}@${parts[1]}`
}
