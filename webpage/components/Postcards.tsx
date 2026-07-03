import { photos } from '@natalia/shared'
import { asset } from '@/lib/site'
import { Section } from './Section'
import { Reveal } from './Reveal'

const rotations = [-3, 2, -1.5, 3, -2.5, 1.5, -3.5, 2.5, -1, 3.5]

export function Postcards() {
  const anyPlaceholder = photos.some((p) => p.placeholder)
  return (
    <Section id="postcards" kicker="Postcards" title="Field notes from the road">
      <Reveal>
        <p className="max-w-2xl text-lg leading-relaxed text-fg-muted">
          A few frames from thirty-six countries, taped in where they belong.
          {anyPlaceholder && (
            <span className="font-hand mt-2 block text-xl text-sage">
              (placeholders for now — the real photographs are still on a phone in Prague)
            </span>
          )}
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, i) => (
          <Reveal key={photo.id} className={photo.span === 'wide' ? 'sm:col-span-2' : ''}>
            <figure
              className="polaroid tape"
              style={{
                ['--rot' as string]: `${rotations[i % rotations.length]}deg`,
                ['--tape-rot' as string]: `${(i % 2 === 0 ? -1 : 1) * (3 + (i % 3))}deg`,
              }}
            >
              <img
                src={asset(`/photos/${photo.file}`)}
                alt={photo.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="font-hand px-1 pb-1 pt-2 text-lg leading-tight text-fg-muted">
                {photo.place}, {photo.country}
                {photo.date !== '—' ? ` · ${photo.date}` : ''}
                {photo.caption && <span className="block text-fg">{photo.caption}</span>}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
