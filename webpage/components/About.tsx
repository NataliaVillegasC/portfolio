import { profile } from '@natalia/shared'
import { Section } from './Section'
import { Reveal } from './Reveal'

export function About() {
  return (
    <Section id="about" kicker="About" title="Systems thinking, worldwide">
      <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <Reveal>
          <div className="space-y-5 text-lg leading-relaxed text-fg-muted">
            <p>
              I’m an engineer twice over — Industrial, and Systems &amp; Computing — and I finished
              both degrees <em className="text-fg">Summa Cum Laude</em>, with the highest GPA my
              Industrial Engineering program has seen this century. What that really means: I don’t
              choose between understanding systems and building them. I do both, carefully.
            </p>
            <p>
              I’ve visited 36 countries and made a home in four — Bogotá, where it all started;
              Seoul, for graduate-level coursework at SNU; London; and now Prague, where I work as
              an AI engineer. Moving through cultures taught me the same lesson optimization did:
              context is everything, and the elegant solution is usually the one that respects it.
            </p>
            <p>
              These days I build AI systems in production — RAG pipelines, OCR services, models that
              forecast and recommend — and I care as much about the decision a system enables as the
              architecture underneath it.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="rounded-2xl border border-line bg-card p-6 shadow-sm">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-fg-muted">
              At a glance
            </h3>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-fg-muted">Currently</dt>
                <dd className="mt-0.5 font-medium">
                  AI Engineer · Phi Technologies, {profile.location.city}
                </dd>
              </div>
              <div>
                <dt className="text-fg-muted">Education</dt>
                <dd className="mt-0.5 font-medium">
                  B.Sc. ×2, Los Andes University — Summa Cum Laude, GPA 4.89/5
                </dd>
              </div>
              <div>
                <dt className="text-fg-muted">Languages</dt>
                <dd className="mt-1 flex flex-wrap gap-2">
                  {profile.languages.map((l) => (
                    <span
                      key={l.name}
                      className="rounded-full bg-sand px-3 py-1 text-xs font-medium"
                    >
                      {l.name} · {l.level}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
