# Natalia Villegas Calderón — Portfolio

Personal portfolio monorepo: a main website, a full academic CV, and a one-page résumé — all fed from a single shared data layer.

**Live:** `https://nataliavillegasc.github.io/portfolio` (main) · `/cv` · `/resume`

## Structure

| Package    | What it is                             | Stack                                  |
| ---------- | -------------------------------------- | -------------------------------------- |
| `shared/`  | Single source of truth: data + schemas | TypeScript + Zod                       |
| `webpage/` | Main site                              | Next.js 15 (App Router) + Tailwind CSS |
| `cv/`      | Full academic CV, print-perfect        | SvelteKit (static)                     |
| `resume/`  | One-page industry résumé               | SvelteKit (static)                     |

npm workspaces; Node ≥ 20 (`nvm use`).

## Development

```bash
npm install
npm run dev:web      # main site      → http://localhost:3000
npm run dev:cv       # CV             → http://localhost:5173/cv
npm run dev:resume   # résumé        → http://localhost:5173/resume
npm run build        # build all three
```

## Editing content — everything lives in `shared/src/data/`

> Owner's note: the full step-by-step manual (`EDITING.md`) and the review skill (`.claude/skills/portfolio-review/SKILL.md`) are kept local and gitignored on purpose; they are not part of the public repo.

- **`countries.csv`** — the world map. Add a row, rebuild, done. `status` is `lived` or `visited`; `map_key` must match the Natural Earth country name (build warns if it doesn't); tiny places get `lat`/`lng` and render as dots.
- **`profile.ts`** — name, tagline, contacts, greetings, languages, header stats.
- **`experience.ts` / `education.ts`** — CV facts. `resume: true` puts an entry on the one-pager too.
- **`projects.ts`** — all projects. `flagship: true` gives a project a case-study page; `draft: true` marks provisional copy (three entries are waiting for real descriptions + GitHub links).
- **`journey.ts`** — the timeline on the main site.
- **`photos.ts`** — the Postcards album. To swap in a real photo: drop `something.jpg` into `webpage/public/photos/`, point `file` at it, set `placeholder: false`. Portrait: replace `webpage/public/portrait.svg` reference in `webpage/components/Hero.tsx`.

Every data file is validated with Zod — a typo fails the build, not the live site.

## Deployment

### GitHub Pages (current)

One-time setup: repo **Settings → Pages → Source: "GitHub Actions"**. After that, every push to `main` builds and deploys everything via `.github/workflows/deploy.yml`.

Optional: rename the repo to `NataliaVillegasC.github.io` for the cleaner URL `https://nataliavillegasc.github.io/` — the workflow detects the rename and adjusts base paths automatically.

### Moving to a custom domain (later)

1. Buy the domain; set `productionUrl` in `shared/src/data/site-config.ts`.
2. **Cloudflare Pages:** create three projects on this repo —
   - main: build `BASE_PATH= npm run build:web`, output `webpage/out`, domain `yourdomain.com`
   - cv: build `BASE_PATH= npm run build:cv`, output `cv/build`, domain `cv.yourdomain.com` _(also change `base` in `cv/svelte.config.js` to `''` for subdomain hosting)_
   - resume: same pattern with `resume/`
3. Or keep GitHub Pages: add the domain under Settings → Pages and a `CNAME` DNS record.

### Docker (local prod-preview or VPS)

```bash
docker compose up --build   # → http://localhost:8080
```

## Conventions

- TypeScript strict everywhere; Prettier at the root (`npm run format`).
- All assets are local — no hotlinking; fonts self-hosted via Fontsource.
- `countries.gen.ts` is generated from the CSV by `npm run gen` (wired into every build) — never edit it by hand.
