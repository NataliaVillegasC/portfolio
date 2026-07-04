import { impact } from '@natalia/shared'
import { Reveal } from './Reveal'

const degrees = [
  {
    kicker: 'Systems & Computing Engineering',
    title: 'Software & AI',
    body: 'I build production systems end to end: RAG pipelines, OCR microservices, full-stack apps, ML models that ship. Code that survives contact with real users.',
    tags: ['Python', 'AI/ML', 'React', 'FastAPI', 'AWS'],
    ink: 'text-postal border-postal',
  },
  {
    kicker: 'Industrial Engineering',
    title: 'Optimization & Decisions',
    body: 'The discipline of making complex systems work better. I specialized in optimization, statistics, and data-driven decision-making: turning messy reality into models that help people choose well.',
    tags: ['Optimization', 'Gurobi', 'Statistics', 'Data Analytics', 'BI'],
    ink: 'text-accent border-accent',
  },
]

export function DoubleEngineer() {
  return (
    <div className="mt-16">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
          Two degrees, one engineer
        </p>
        <h3 className="mt-3 max-w-2xl font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Summa Cum Laude twice, because systems deserve to be both designed well and built well.
        </h3>
      </Reveal>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {degrees.map((d, i) => (
          <Reveal key={d.title}>
            <div
              className={`h-full rounded-xl border-2 border-dashed bg-card p-7 ${d.ink.split(' ')[1]}`}
              style={{ transform: `rotate(${i === 0 ? -0.5 : 0.5}deg)` }}
            >
              <p
                className={`font-mono text-[10px] uppercase tracking-[0.2em] ${d.ink.split(' ')[0]}`}
              >
                {d.kicker}
              </p>
              <h4 className="mt-2 font-display text-xl font-semibold">{d.title}</h4>
              <p className="mt-3 leading-relaxed text-fg-muted">{d.body}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {d.tags.map((t) => (
                  <li key={t} className="rounded-full bg-sand px-3 py-1 font-mono text-[11px]">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="font-hand mx-auto mt-8 max-w-xl text-center text-2xl text-fg-muted">
          where they meet: I don’t just build systems, I build them to be measurably better.
        </p>
      </Reveal>

      {/* The numbers that travel well — luggage tags */}
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {impact.map((stat, i) => (
          <Reveal key={stat.label}>
            <div className="luggage-tag" style={{ ['--rot' as string]: `${(i % 3) - 1}deg` }}>
              <p className="font-display text-2xl font-semibold text-accent">{stat.value}</p>
              <p className="mt-1 text-sm leading-snug text-fg">{stat.label}</p>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-wider text-fg-muted">
                {stat.source}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
