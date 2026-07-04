import { profile } from '@natalia/shared'
import { asset } from '@/lib/site'
import { Greeting } from './Greeting'
import { LocalTime } from './LocalTime'
import { Reveal } from './Reveal'
import { Stamp, type StampProps } from './Stamp'

// The journal's index — every stamp is a section of the story.
const stamps: StampProps[] = [
  { href: '#about', label: 'About', sub: 'the story', ink: 'red', shape: 'round', rotate: -6 },
  { href: '#journey', label: 'Journey', sub: '4 homes', ink: 'blue', shape: 'rect', rotate: 3 },
  {
    href: '#map',
    label: 'World map',
    sub: '36 countries',
    ink: 'green',
    shape: 'round',
    rotate: -2,
  },
  {
    href: '#experience',
    label: 'Experience',
    sub: 'work · study',
    ink: 'red',
    shape: 'rect',
    rotate: 4,
  },
  {
    href: '#projects',
    label: 'Projects',
    sub: 'built & shipped',
    ink: 'blue',
    shape: 'rect',
    rotate: -4,
  },
  {
    href: '#certifications',
    label: 'Certified',
    sub: 'credentials',
    ink: 'green',
    shape: 'rect',
    rotate: 2,
  },
  {
    href: '#community',
    label: 'Community',
    sub: 'leadership',
    ink: 'red',
    shape: 'rect',
    rotate: -3,
  },
  {
    href: '#postcards',
    label: 'Postcards',
    sub: 'field notes',
    ink: 'blue',
    shape: 'round',
    rotate: 5,
  },
]

export function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl overflow-x-clip px-5 pb-20 pt-14 sm:px-8 sm:pt-20">
      <div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
        <Reveal className="flex-1">
          <LocalTime />
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <Greeting />
            {', I’m '}
            {profile.shortName}.
          </h1>
          <p className="font-hand mt-5 max-w-xl text-2xl leading-snug text-fg-muted sm:text-3xl">
            {profile.tagline}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full bg-accent px-6 py-3 font-medium text-bg transition-transform hover:-translate-y-0.5"
            >
              Say hello
            </a>
            <a
              href={profile.linkedin}
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-postal underline decoration-dashed underline-offset-4 hover:text-accent"
            >
              LinkedIn ↗
            </a>
            <a
              href={profile.github}
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-postal underline decoration-dashed underline-offset-4 hover:text-accent"
            >
              GitHub ↗
            </a>
          </div>

          {/* The passport page: stamps are the navigation */}
          <div className="mt-12 border-t border-dashed border-line pt-8">
            <p className="font-hand text-xl text-fg-muted">where do you want to go?</p>
            <nav
              aria-label="Sections"
              className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:max-w-2xl"
            >
              {stamps.map((s, i) => (
                <Stamp key={s.href} {...s} index={i} />
              ))}
            </nav>
          </div>
        </Reveal>

        <Reveal className="w-56 shrink-0 sm:w-64">
          {/* Parallax on a wrapper div so GSAP's transform never fights the
              Reveal transition or the polaroid's CSS rotation */}
          <div data-parallax="-24">
            <figure className="polaroid tape" style={{ ['--rot' as string]: '2.5deg' }}>
              {/* Swap for a real portrait: drop portrait.jpg in public/ and update the src */}
              <img
                src={asset('/portrait.svg')}
                alt={`Portrait of ${profile.name}`}
                width={256}
                height={320}
                className="develop h-auto w-full"
              />
              <figcaption className="font-hand py-2 text-center text-xl text-fg-muted">
                {profile.location.city}, {new Date().getFullYear()}, probably near a train station
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
