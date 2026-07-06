import Link from 'next/link'
import { projects, type Project } from '@natalia/shared'
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

/** A flagship project as a boarding pass: main stub, perforation, tear-off. */
function TicketCard({ project, index }: { project: Project; index: number }) {
  const num = String(index + 1).padStart(2, '0')
  return (
    <Reveal className="h-full">
      <Link href={`/projects/${project.slug}/`} className="ticket paper-lift group">
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-muted">
              Case study nº <span className="text-fg">PROJ-{num}</span>
            </p>
            <p className="font-mono text-xs text-fg-muted">{project.period}</p>
          </div>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight group-hover:text-accent">
            {project.title}
          </h3>
          <p className="mt-3 flex-1 leading-relaxed text-fg-muted">{project.summary}</p>
          <div className="mt-5">
            <TechList tech={project.tech} />
          </div>

          {/* route line: this ticket goes from idea to production */}
          <div className="mt-6" aria-hidden>
            <div className="flex items-center gap-2 text-fg-muted">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="flex-1 border-t-2 border-dashed border-line" />
              <span className="text-sm leading-none text-accent">✈</span>
              <span className="flex-1 border-t-2 border-dashed border-line" />
              <span className="h-2 w-2 rounded-full bg-accent" />
            </div>
            <div className="mt-1.5 flex justify-between font-mono text-[10px] uppercase tracking-wider text-fg-muted">
              <span>Concept</span>
              <span>Shipped</span>
            </div>
          </div>

          <div className="mt-5 flex items-end justify-between gap-4">
            <div className="barcode w-36 sm:w-44" aria-hidden />
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-fg-muted">
              {project.slug}
            </p>
          </div>
        </div>

        <div className="ticket-perf" aria-hidden />

        {/* the tear-off stub */}
        <div className="relative flex items-center justify-around gap-3 px-6 py-4 sm:w-40 sm:flex-col sm:justify-center sm:gap-6 sm:px-4 sm:py-6">
          <span className="ticket-vert absolute left-2.5 top-1/2 hidden -translate-y-1/2 sm:block">
            Case study
          </span>
          <span className="ticket-stamp">
            <span>View</span>
            <span>case</span>
          </span>
          <div className="text-center">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-fg-muted">Seat</p>
            <p className="font-display text-base font-semibold">NV-{num}</p>
            <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.3em] text-fg-muted">
              Admit one
            </p>
          </div>
        </div>
      </Link>
    </Reveal>
  )
}

export function Projects() {
  const flagships = projects.filter((p) => p.flagship)
  const rest = projects.filter((p) => !p.flagship)

  return (
    <Section id="projects" kicker="Selected work" title="Things I’ve built and shipped">
      <div className="grid gap-6 lg:grid-cols-2">
        {flagships.map((p, i) => (
          <TicketCard key={p.slug} project={p} index={i} />
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
