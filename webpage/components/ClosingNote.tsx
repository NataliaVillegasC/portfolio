import { profile, photos } from '@natalia/shared'
import { asset } from '@/lib/site'
import { Section } from './Section'
import { Reveal } from './Reveal'

/** The last page of the journal — a personal note, not a pitch. */
export function ClosingNote() {
  const miniPhotos = photos.slice(0, 3)
  return (
    <Section id="about-me" kicker="Beyond the code" title="A little about me">
      <div className="grid items-center gap-12 lg:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <div className="space-y-5 text-lg leading-relaxed text-fg-muted">
            <p>
              I collect languages the way other people collect souvenirs —{' '}
              {profile.languages.map((l) => l.name).join(', ')} so far — and I plan trips around
              food markets, night trains, and whichever museum has the strangest permanent
              collection.
            </p>
            <p>
              Travel and engineering feed the same habit: I like understanding how things work —
              cities, supply chains, languages, neural networks — and I like them best when I get to
              see them up close.
            </p>
            <p className="font-hand text-2xl text-fg">
              currently: learning Czech, missing arepas, planning country #37.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="relative mx-auto h-64 w-64">
            {miniPhotos.map((photo, i) => (
              <figure
                key={photo.id}
                className="polaroid absolute w-36"
                style={{
                  ['--rot' as string]: `${[-8, 5, -2][i]}deg`,
                  top: `${[0, 40, 96][i]}px`,
                  left: `${[8, 96, 40][i]}px`,
                  zIndex: i,
                }}
              >
                <img
                  src={asset(`/photos/${photo.file}`)}
                  alt={photo.alt}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
                <figcaption className="font-hand py-1 text-center text-sm text-fg-muted">
                  {photo.place}
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
