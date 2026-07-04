import Link from 'next/link'
import { projects } from '@natalia/shared'
import { Section } from './Section'
import { Reveal } from './Reveal'

function TechList({ tech }: { tech: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tech.map((t) => (
        <li key={t} className="rounded-full bg-sand px-3 py-1 font-mono text-[11px] text-fg-muted">
          {t}
        </li>
      ))}
    </ul>
  )
}

export function Projects() {
  const flagships = projects.filter((p) => p.flagship)
  const rest = projects.filter((p) => !p.flagship)

  return (
    <Section id="projects" kicker="Selected work" title="Things I’ve built and shipped">
      <div className="grid gap-6 lg:grid-cols-2">
        {flagships.map((p, i) => (
          <Reveal key={p.slug}>
            <Link
              href={`/projects/${p.slug}/`}
              className={`paper-lift ${i % 2 === 1 ? 'paper-lift-alt ' : ''}group flex h-full flex-col rounded-2xl border border-line bg-card p-8 shadow-sm hover:border-accent`}
            >
              <p className="font-mono text-xs text-fg-muted">{p.period}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight group-hover:text-accent">
                {p.title}
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-fg-muted">{p.summary}</p>
              <div className="mt-6">
                <TechList tech={p.tech} />
              </div>
              <p className="mt-6 text-sm font-medium text-accent">Read the case study →</p>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {rest.map((p, i) => (
          <Reveal key={p.slug}>
            <article
              className={`paper-lift ${i % 2 === 1 ? 'paper-lift-alt ' : ''}flex h-full flex-col rounded-2xl border border-line bg-card p-6`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-mono text-xs text-fg-muted">{p.period}</p>
                {p.draft && (
                  <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-sage">
                    more soon
                  </span>
                )}
              </div>
              <h3 className="mt-2 font-display text-lg font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">
                {p.summary.replace(/ — TODO\(Natalia\).*$/, '')}
              </p>
              <div className="mt-4">
                <TechList tech={p.tech} />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
