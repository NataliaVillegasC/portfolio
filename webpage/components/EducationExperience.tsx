import { education, experience, formatRange } from '@natalia/shared'
import { Section } from './Section'
import { Reveal } from './Reveal'

function ColumnHeading({ children, ink, rotate }: { children: string; ink: string; rotate: number }) {
  return (
    <h3
      className={`stamp stamp-rect inline-flex px-5 py-2.5 text-sm font-bold ${ink}`}
      style={{ ['--rot' as string]: `${rotate}deg` }}
    >
      {children}
    </h3>
  )
}

export function EducationExperience() {
  return (
    <Section id="experience" kicker="The credentials" title="Education & Experience">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-10">
        {/* ── Education ── */}
        <div>
          <ColumnHeading ink="text-postal" rotate={-1.5}>Education</ColumnHeading>
          <div className="mt-8 space-y-8 border-l-2 border-dashed border-line pl-6">
            {education.map((item) => (
              <Reveal key={item.institution}>
                <article className="rounded-xl border border-line bg-card p-6">
                  <p className="font-mono text-xs text-fg-muted">
                    {formatRange(item.start, item.end)} · {item.location}
                  </p>
                  <h4 className="mt-2 font-display text-lg font-semibold">{item.institution}</h4>
                  <p className="mt-1 text-sm text-fg-muted">{item.degree}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-fg-muted">
                    {item.details.map((d) => (
                      <li key={d} className="flex gap-2">
                        <span
                          aria-hidden
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-postal"
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                  {item.honors.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.honors.map((h) => (
                        <span
                          key={h}
                          className="rounded-full border border-dashed border-visa px-3 py-1 text-xs text-visa"
                        >
                          🏅 {h}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── Experience ── */}
        <div>
          <ColumnHeading ink="text-accent" rotate={1.5}>Experience</ColumnHeading>
          <div className="mt-8 space-y-8 border-l-2 border-dashed border-line pl-6">
            {experience.map((job) => (
              <Reveal key={`${job.company}-${job.role}`}>
                <article className="rounded-xl border border-line bg-card p-6">
                  <p className="font-mono text-xs text-fg-muted">
                    {formatRange(job.start, job.end)} · {job.location}
                  </p>
                  <h4 className="mt-2 font-display text-lg font-semibold">{job.role}</h4>
                  <p className="mt-1 text-sm text-accent">{job.company}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-fg-muted">
                    {job.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span
                          aria-hidden
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
