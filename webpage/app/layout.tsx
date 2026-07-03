import type { Metadata } from 'next'
import '@fontsource-variable/fraunces'
import '@fontsource-variable/inter'
import '@fontsource/jetbrains-mono'
import './globals.css'
import { profile, siteConfig } from '@natalia/shared'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.productionUrl),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s — ${profile.shortName} Villegas`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: siteConfig.description,
    type: 'website',
    locale: 'en',
  },
}

// Applies the saved (or system) theme before first paint to avoid a flash.
const themeScript = `
try {
  const stored = localStorage.getItem('theme')
  const dark = stored ? stored === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches
  if (dark) document.documentElement.classList.add('dark')
} catch {}
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
