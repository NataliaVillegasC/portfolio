import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

// '' locally → served at /resume; '/portafolio' on GitHub Pages → /portafolio/resume
const base = `${process.env.BASE_PATH ?? ''}/resume`

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    paths: { base },
  },
}

export default config
