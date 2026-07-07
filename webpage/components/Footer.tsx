import { profile } from '@natalia/shared'
import { cvUrl, resumeUrl } from '@/lib/site'
import { EmailLink } from './EmailLink'
import { LocalTime } from './LocalTime'
import { Reveal } from './Reveal'

const addressLines = [
  { href: profile.github, label: 'GitHub ↗', external: true },
  { href: profile.linkedin, label: 'LinkedIn ↗', external: true },
  { href: cvUrl, label: 'Full CV', external: false },
  { href: resumeUrl, label: 'Résumé', external: false },
]

/** The back page: a postcard ready to send, and the torn receipt tucked in after it. */
export function Footer() {
  return (
    <footer id="contact">
      <div className="airmail" aria-hidden />
      <div className="border-t border-line bg-bg-elevated/60">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <p className="section-kicker font-mono text-base uppercase tracking-[0.25em] text-accent">
              Contact
            </p>
            <div className="postcard mt-8 grid gap-10 p-6 sm:p-10 md:grid-cols-[1.5fr_1fr] md:gap-8">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.35em] text-fg-muted">
                  Post card · par avion
                </p>
                <h2 className="font-hand mt-6 max-w-md text-4xl leading-snug text-fg sm:text-[2.6rem]">
                  Wherever in the world you’re reading this, let’s talk.
                </h2>
                <p className="font-hand mt-4 max-w-md text-2xl leading-snug text-fg-muted">
                  Projects, ideas, or tips for country #37: my inbox is open.
                </p>
                <p className="font-hand mt-8 text-2xl text-fg">
                  hasta pronto, <span className="text-accent">{profile.shortName}</span>
                </p>
              </div>

              <div className="relative border-t-2 border-dashed border-line pt-8 md:border-l-2 md:border-t-0 md:pl-8 md:pt-2">
                <div className="flex justify-end pr-1">
                  <div className="relative">
                    <div className="postage">
                      <span className="plane" aria-hidden>
                        ✈
                      </span>
                      <span>Correo aéreo</span>
                    </div>
                    {/* postmark cancelling the stamp */}
                    <span aria-hidden className="absolute -left-12 top-6">
                      <span
                        className="stamp stamp-round stamp-sm text-[8px] text-accent"
                        style={{ ['--rot' as string]: '9deg', ['--i' as string]: 2 }}
                      >
                        <span className="font-bold">PRG</span>
                        <span className="opacity-80">{new Date().getFullYear()}</span>
                      </span>
                    </span>
                  </div>
                </div>

                <nav aria-label="Contact links" className="mt-8 space-y-1 md:mt-10">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg-muted">
                    To:
                  </p>
                  <EmailLink
                    showAddress
                    className="block border-b border-dotted border-line py-2 text-sm text-fg-muted transition-colors hover:text-accent"
                  />
                  {addressLines.map((line) => (
                    <a
                      key={line.label}
                      href={line.href}
                      {...(line.external ? { rel: 'noopener noreferrer' } : {})}
                      className="block border-b border-dotted border-line py-2 text-sm text-fg-muted transition-colors hover:text-accent"
                    >
                      {line.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="torn-receipt">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 pb-6 pt-8 text-xs text-fg-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
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
    </footer>
  )
}
