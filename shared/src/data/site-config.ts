/**
 * ─────────────────────────────────────────────────────────────────
 *  THE one place to change when the custom domain arrives.
 *
 *  Today (GitHub Pages):   https://nataliavillegasc.github.io/portfolio
 *  Tomorrow (custom):      set `productionUrl` to e.g. 'https://nataliavillegas.com'
 *                          and follow README → "Moving to a custom domain".
 *
 *  Base paths are injected at build time via the BASE_PATH env var
 *  (the GitHub Actions workflow computes it automatically), so nothing
 *  else in the codebase hardcodes a URL.
 * ─────────────────────────────────────────────────────────────────
 */
export const siteConfig = {
  productionUrl: 'https://nataliavillegasc.github.io/portfolio',
  siteName: 'Natalia Villegas Calderón',
  description:
    'AI engineer and double Summa Cum Laude industrial & systems engineer. 36 countries, 4 homes, one portfolio.',
  /** Paths of the document apps relative to the deployment root */
  cvPath: '/cv',
  resumePath: '/resume',
} as const
