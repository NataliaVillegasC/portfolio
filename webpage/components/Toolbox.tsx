import { skills } from '@natalia/shared'
import { Section } from './Section'
import { Reveal } from './Reveal'

// Short pill label + ink per technical skill group, zipped by position.
const groupMeta = [
  { short: 'Code', pill: 'bg-postal/15 text-postal' },
  { short: 'AI & Data', pill: 'bg-accent/15 text-accent' },
  { short: 'Cloud', pill: 'bg-visa/15 text-visa' },
]

const softMeta = { short: 'Human', pill: 'bg-fg/10 text-fg-muted' }

const rotations = [-4, 3, -2, 4, -3, 2, -1.5, 3.5]

function TagPile({ tags }: { tags: { item: string; meta: { short: string; pill: string } }[] }) {
  return (
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
  )
}

export function Toolbox() {
  // one luggage tag per tool, tossed on the desk rather than gridded;
  // the technical piles and the soft skills each get their own heap
  const techGroups = skills.filter((g) => g.label !== 'Soft skills')
  const softGroup = skills.find((g) => g.label === 'Soft skills')

  const techTags = techGroups.flatMap((group, gi) =>
    // the modulo keeps the index in range, so the lookup can't miss
    group.items.map((item) => ({ item, meta: groupMeta[gi % groupMeta.length]! }))
  )
  const softTags = (softGroup?.items ?? []).map((item) => ({ item, meta: softMeta }))

  return (
    <Section id="toolbox" kicker="Toolbox" title="Tools I think with">
      <Reveal>
        <p className="font-hand -mt-2 mb-10 text-xl text-fg-muted">
          every tool that made it into the suitcase earned its tag
        </p>
        <TagPile tags={techTags} />
      </Reveal>

      {softTags.length > 0 && (
        <Reveal>
          <p className="font-hand mb-10 mt-14 text-xl text-fg-muted">
            and the half of the toolbox that no suitcase can hold
          </p>
          <TagPile tags={softTags} />
        </Reveal>
      )}
    </Section>
  )
}
