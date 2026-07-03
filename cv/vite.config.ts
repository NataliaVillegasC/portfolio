import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [sveltekit()],
  // @natalia/shared ships TypeScript source; let Vite transpile it
  ssr: { noExternal: ['@natalia/shared'] },
})
