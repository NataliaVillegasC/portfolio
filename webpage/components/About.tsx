import { profile } from '@natalia/shared'
import { Section } from './Section'
import { Reveal } from './Reveal'
import { DoubleEngineer } from './DoubleEngineer'
import { MarginNote } from './MarginNote'

export function About() {
  return (
    <Section id="about" kicker="About" title="Systems thinking, worldwide">
      <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <Reveal>
          <div className="space-y-5 text-lg leading-relaxed text-fg-muted">
            <p>
              Engineering started at home. My mum is a civil engineer, one of the few women in her
              cohort, and she would sit with my sister and me explaining mathematics until it
              stopped being homework and became a language we spoke at the kitchen table. I ended
              up speaking it fluently: two degrees, Industrial and Systems &amp; Computing, both
              finished <em className="text-fg">Summa Cum Laude</em>, with the highest GPA my
              Industrial Engineering program has seen this century.
            </p>
            <p>
              Industrial Engineering taught me to read the world as systems: decisions, processes
              and resources, all connected, all improvable. Programming arrived later and felt,
              honestly, like magic. My first real project drew the zodiac constellation for
              whatever birthday you typed in, and the moment it worked I understood that code turns
              ideas into things people can actually touch. I never really stopped after that.
            </p>
            <p>
              Since then I have visited 36 countries and made a home in four: Bogotá, where
              everything started; Seoul, for graduate coursework at SNU; London; and now Prague,
              where I build AI systems in production, from RAG pipelines and OCR services to models
              that forecast and recommend. Moving between cultures taught me the same lesson
              optimization did: context is everything, and the elegant solution is the one that
              respects it.
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
                  B.Sc. ×2, Los Andes University · Summa Cum Laude · GPA 4.89/5
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
          <MarginNote rotate={2} className="mt-8 hidden lg:block">
            the first thing I learn in every new language is how to order coffee. priorities.
          </MarginNote>
        </Reveal>
      </div>

      <DoubleEngineer />
    </Section>
  )
}
