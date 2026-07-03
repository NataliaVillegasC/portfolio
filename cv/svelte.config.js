import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

// '' locally → served at /cv; '/portafolio' on GitHub Pages → /portafolio/cv
const base = `${process.env.BASE_PATH ?? ''}/cv`

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    paths: { base },
  },
}

export default config
