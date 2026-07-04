import { journey, formatMonthYear } from '@natalia/shared'
import { Section } from './Section'
import { Reveal } from './Reveal'
import { MarginNote } from './MarginNote'
import { RouteInk } from './fx/RouteInk'

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
      <div className="grid gap-10 lg:grid-cols-[1fr_15rem]">
        {/* The dashed border is the route ahead; RouteInk draws the route
            already traveled as you scroll down the page */}
        <ol className="relative ml-3 border-l-2 border-dashed border-line">
          <RouteInk />
          {entries.map((entry) => (
            <li key={`${entry.date}-${entry.title}`} className="relative pb-12 pl-8 last:pb-0">
              <span
                aria-hidden
                data-pop
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

        {/* Margin scribbles — the notes a traveler leaves next to the itinerary */}
        <div className="hidden flex-col gap-24 pt-10 lg:flex">
          <MarginNote rotate={-2.5}>
            Prague's astronomical clock has been telling the time (and the horoscope) since{' '}
            <strong>1410</strong>. My deadlines feel less dramatic here.
          </MarginNote>
          <MarginNote rotate={2} tapeRotate={-3}>
            Seoul's subway moves about <strong>7 million people a day</strong>, on time. As an
            industrial engineer, I took it as a personal challenge to find a flaw. I could not.
          </MarginNote>
          <MarginNote rotate={-1.5}>
            In Bogotá we like to say we live <strong>2,600 meters</strong> closer to the stars. Up
            there water boils at 91°C, which happens to be exactly what good coffee asks for.
          </MarginNote>
        </div>
      </div>
    </Section>
  )
}
