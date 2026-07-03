import { photos } from '@natalia/shared'
import { asset } from '@/lib/site'
import { Section } from './Section'
import { Reveal } from './Reveal'

const spanClass = {
  wide: 'sm:col-span-2',
  tall: 'sm:row-span-2',
  square: '',
} as const

export function Postcards() {
  const anyPlaceholder = photos.some((p) => p.placeholder)
  return (
    <Section id="postcards" kicker="Postcards" title="Field notes from the road">
      <Reveal>
        <p className="max-w-2xl text-lg leading-relaxed text-fg-muted">
          A few frames from thirty-six countries — kept, like good engineering, deliberately
          minimal.
          {anyPlaceholder && (
            <span className="mt-2 block font-mono text-xs text-sage">
              (Placeholders for now — real photographs are on their way from a phone in Prague.)
            </span>
          )}
        </p>
      </Reveal>

      <div className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[220px] sm:grid-cols-4">
        {photos.map((photo) => (
          <figure key={photo.id} className={`group relative ${spanClass[photo.span]}`}>
            <div className="h-full overflow-hidden rounded-xl border border-line bg-bg-elevated">
              <img
                src={asset(`/photos/${photo.file}`)}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-xl bg-gradient-to-t from-black/60 to-transparent p-3 pt-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="font-mono text-xs text-white">
                {photo.place}, {photo.country}
                {photo.date !== '—' ? ` · ${photo.date}` : ''}
              </span>
              {photo.caption && (
                <span className="block text-xs text-white/80">{photo.caption}</span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
