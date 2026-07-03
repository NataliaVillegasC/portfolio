import Link from 'next/link'
import { profile } from '@natalia/shared'
import { cvUrl, resumeUrl } from '@/lib/site'
import { ThemeToggle } from './ThemeToggle'

const nav = [
  { href: '/#about', label: 'About' },
  { href: '/#journey', label: 'Journey' },
  { href: '/#map', label: 'Map' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#postcards', label: 'Postcards' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight hover:text-accent"
        >
          {profile.shortName} Villegas<span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-fg-muted md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-accent">
              {item.label}
            </Link>
          ))}
          <a href={cvUrl} className="transition-colors hover:text-accent">
            CV
          </a>
          <a
            href={resumeUrl}
            className="rounded-full border border-line px-3.5 py-1.5 text-fg transition-colors hover:border-accent hover:text-accent"
          >
            Résumé
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
