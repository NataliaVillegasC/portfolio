import { skills } from '@natalia/shared'
import { Section } from './Section'
import { Reveal } from './Reveal'

// Short pill label + ink per skill group, zipped by position.
const groupMeta = [
  { short: 'Code', pill: 'bg-postal/15 text-postal' },
  { short: 'AI & Data', pill: 'bg-accent/15 text-accent' },
  { short: 'Cloud', pill: 'bg-visa/15 text-visa' },
]

const rotations = [-4, 3, -2, 4, -3, 2, -1.5, 3.5]

export function Toolbox() {
  // one luggage tag per tool, tossed on the desk rather than gridded
  const tags = skills.flatMap((group, gi) =>
    // the modulo keeps the index in range, so the lookup can't miss
    group.items.map((item) => ({ item, meta: groupMeta[gi % groupMeta.length]! }))
  )

  return (
    <Section id="toolbox" kicker="Toolbox" title="Tools I think with">
      <Reveal>
        <p className="font-hand -mt-2 mb-10 text-xl text-fg-muted">
          every tool that made it into the suitcase earned its tag
        </p>
        <ul className="flex flex-wrap items-start justify-center gap-x-4 gap-y-9 sm:gap-x-5">
          {tags.map(({ item, meta }, i) => (
            <li
              key={item}
              className="skill-tag"
              style={{
                ['--rot' as string]: `${rotations[i % rotations.length]}deg`,
                ['--i' as string]: i,
              }}
            >
              <span
                className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${meta.pill}`}
              >
                {meta.short}
              </span>
              <span className="text-sm font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
