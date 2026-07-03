import { profile } from '@natalia/shared'
import { asset } from '@/lib/site'
import { Greeting } from './Greeting'
import { LocalTime } from './LocalTime'
import { Reveal } from './Reveal'

export function Hero() {
  const { stats } = profile
  return (
    <section className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-12 px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:flex-row lg:items-center lg:gap-20">
      <Reveal className="flex-1">
        <LocalTime />
        <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          <Greeting />
          {', I’m '}
          {profile.shortName}.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">{profile.tagline}</p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
          >
            See my work
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full border border-line px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            Say hello
          </a>
        </div>

        <dl className="mt-12 flex gap-10 border-t border-line pt-6">
          {[
            [stats.countriesVisited, 'countries visited'],
            [stats.countriesLived, 'called home'],
            ['4.89/5', 'GPA · Summa Cum Laude ×2'],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd className="font-display text-3xl font-semibold text-accent">{value}</dd>
              <dd className="mt-1 text-xs uppercase tracking-wider text-fg-muted">{label}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal className="w-56 shrink-0 sm:w-72">
        <div className="overflow-hidden rounded-[2rem] border border-line bg-bg-elevated shadow-sm">
          {/* Swap for a real portrait: drop portrait.jpg in public/ and update the src */}
          <img
            src={asset('/portrait.svg')}
            alt={`Portrait of ${profile.name}`}
            width={288}
            height={360}
            className="h-auto w-full"
          />
        </div>
      </Reveal>
    </section>
  )
}
