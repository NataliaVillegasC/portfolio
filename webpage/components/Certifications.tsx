import { certifications, formatMonthYear } from '@natalia/shared'
import { Section } from './Section'
import { Reveal } from './Reveal'

export function Certifications() {
  const anyDraft = certifications.some((c) => c.draft)
  return (
    <Section id="certifications" kicker="Credentials" title="Licenses & Certifications">
      {anyDraft && (
        <p className="font-hand -mt-6 mb-8 text-xl text-fg-muted">
          (a few visa pages still being stamped, the full list is on its way)
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => (
          <Reveal key={`${cert.title}-${i}`}>
            <article
              className={`paper-lift ${i % 2 === 1 ? 'paper-lift-alt ' : ''}h-full rounded-xl border-2 border-dashed bg-card p-6 ${
                cert.draft
                  ? 'border-line opacity-60'
                  : i % 2 === 0
                    ? 'border-visa'
                    : 'border-postal'
              }`}
              style={{ transform: `rotate(${(i % 3) - 1}deg)` }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-muted">
                {cert.issuer}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold leading-snug">{cert.title}</h3>
              <p className="mt-2 font-mono text-xs text-fg-muted">
                Issued {formatMonthYear(cert.issued)}
                {cert.expires ? ` · expires ${formatMonthYear(cert.expires)}` : ''}
              </p>
              {cert.credentialId && (
                <p className="mt-1 font-mono text-[10px] text-fg-muted">ID {cert.credentialId}</p>
              )}
              {cert.url && !cert.draft && (
                <a
                  href={cert.url}
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm text-postal underline decoration-dashed underline-offset-4 hover:text-accent"
                >
                  Show credential ↗
                </a>
              )}
              {cert.draft && <p className="font-hand hand-write mt-3 text-lg text-fg-muted">coming soon…</p>}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
