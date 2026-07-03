import { skills } from '@natalia/shared'
import { Section } from './Section'
import { Reveal } from './Reveal'

export function Toolbox() {
  return (
    <Section id="toolbox" kicker="Toolbox" title="Tools I think with">
      <div className="grid gap-6 md:grid-cols-3">
        {skills.map((group) => (
          <Reveal key={group.label}>
            <div className="h-full rounded-2xl border border-line bg-card p-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-fg-muted">
                {group.label}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-full bg-sand px-3 py-1.5 text-sm font-medium">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
