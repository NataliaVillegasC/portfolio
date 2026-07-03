import { community } from '@natalia/shared'
import { Section } from './Section'
import { Reveal } from './Reveal'

export function Community() {
  return (
    <Section id="community" kicker="Beyond the code" title="Community & Leadership">
      <div className="grid gap-6 md:grid-cols-2">
        {community.map((item, i) => (
          <Reveal key={item.org}>
            <article
              className={`relative h-full rounded-xl border border-line bg-card p-7 ${
                item.draft ? 'opacity-60' : ''
              }`}
              style={{ transform: `rotate(${i % 2 === 0 ? -0.6 : 0.6}deg)` }}
            >
              <span
                className={`stamp stamp-rect absolute -top-3 right-5 px-3 py-1 text-[10px] ${
                  i % 2 === 0 ? 'text-accent' : 'text-postal'
                }`}
                style={{ ['--rot' as string]: '4deg' }}
              >
                {item.role}
              </span>
              <p className="font-mono text-xs text-fg-muted">{item.period}</p>
              <h3 className="mt-2 font-display text-xl font-semibold">{item.org}</h3>
              <p className="mt-3 leading-relaxed text-fg-muted">{item.description}</p>
              {item.url && !item.draft && (
                <a
                  href={item.url}
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm text-postal underline decoration-dashed underline-offset-4 hover:text-accent"
                >
                  Visit ↗
                </a>
              )}
              {item.draft && (
                <p className="font-hand mt-3 text-lg text-fg-muted">more to add here…</p>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
