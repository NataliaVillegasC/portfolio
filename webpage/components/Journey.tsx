import { journey, formatMonthYear } from '@natalia/shared'
import { Section } from './Section'
import { Reveal } from './Reveal'

const kindLabel: Record<string, string> = {
  education: 'Education',
  work: 'Work',
  move: 'New country',
  milestone: 'Milestone',
  teaching: 'Teaching',
}

export function Journey() {
  const entries = [...journey].reverse() // newest first
  return (
    <Section id="journey" kicker="The journey" title="Geography and career, one narrative">
      <ol className="relative ml-3 border-l border-line">
        {entries.map((entry) => (
          <li key={`${entry.date}-${entry.title}`} className="relative pb-12 pl-8 last:pb-0">
            <span
              aria-hidden
              className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-bg"
            />
            <Reveal>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <time dateTime={entry.date} className="font-mono text-xs text-fg-muted">
                  {formatMonthYear(entry.date)}
                </time>
                <span className="font-mono text-xs text-sage">
                  {entry.place} · {entry.country}
                </span>
                <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-fg-muted">
                  {kindLabel[entry.kind]}
                </span>
              </div>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
                {entry.title}
              </h3>
              <p className="mt-2 max-w-2xl leading-relaxed text-fg-muted">{entry.description}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
