import type { NextConfig } from 'next'

// BASE_PATH is '' locally, '/portafolio' on GitHub Pages (computed by CI),
// and '' again once a custom domain exists. Single knob, set at build time.
const basePath = process.env.BASE_PATH ?? ''

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  transpilePackages: ['@natalia/shared'],
  images: {
    // Static export has no image optimization server; assets ship pre-sized.
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
}

export default nextConfig
