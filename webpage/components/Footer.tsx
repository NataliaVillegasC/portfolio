import { profile } from '@natalia/shared'
import { cvUrl, resumeUrl } from '@/lib/site'
import { LocalTime } from './LocalTime'

export function Footer() {
  return (
    <footer id="contact">
      <div className="airmail" aria-hidden />
      <div className="border-t border-line bg-bg-elevated/60">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Contact</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Wherever in the world you’re reading this — let’s talk.
          </h2>
          <a
            href={`mailto:${profile.email}`}
            className="mt-6 inline-block text-lg text-accent underline decoration-dashed decoration-accent-soft underline-offset-4 hover:decoration-accent"
          >
            {profile.email}
          </a>

          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-fg-muted">
            <a href={profile.github} rel="noopener noreferrer" className="hover:text-accent">
              GitHub ↗
            </a>
            <a href={profile.linkedin} rel="noopener noreferrer" className="hover:text-accent">
              LinkedIn ↗
            </a>
            <a href={cvUrl} className="hover:text-accent">
              Full CV
            </a>
            <a href={resumeUrl} className="hover:text-accent">
              Résumé
            </a>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-dashed border-line pt-6 text-xs text-fg-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {profile.name} · designed & built with{' '}
              <span aria-label="love" className="text-accent">
                ♥
              </span>{' '}
              between time zones
            </p>
            <LocalTime />
          </div>
        </div>
      </div>
    </footer>
  )
}
