import { Section } from './Section'
import { Reveal } from './Reveal'

type Sticker = {
  code: string
  name: string
  /** Permit type printed on the header band */
  permit: string
  status: string
  serial: string
  /** CSS color feeding the band + dots via --band */
  band: string
  rotate: string
  /** Handwritten aside (Spanish gets one instead of a certificate) */
  note?: string
  /** Stamped endorsement backing the fluency claim */
  cert?: { score: string; detail: string }
}

const stickers: Sticker[] = [
  {
    code: 'ES',
    name: 'Spanish',
    permit: 'Native proficiency',
    status: 'Mother tongue',
    serial: 'No. ES-01',
    band: 'var(--visa)',
    rotate: '-0.8deg',
    note: 'aprendida en la cocina de casa',
  },
  {
    code: 'EN',
    name: 'English',
    permit: 'Native-level, certified',
    status: 'Native-level proficiency, certified',
    serial: 'No. EN-02',
    band: 'var(--postal)',
    rotate: '1.2deg',
    cert: { score: 'IELTS 8.0', detail: 'overall band · C1' },
  },
]

/** A language as a visa sticker: header band, fluency dots, barcode. */
function VisaSticker({ sticker, index }: { sticker: Sticker; index: number }) {
  return (
    <Reveal className="h-full">
      <article
        className="visa-wrap"
        style={{
          ['--rot' as string]: sticker.rotate,
          ['--band' as string]: sticker.band,
          ['--i' as string]: index,
        }}
      >
        <div className="visa-sticker">
          <div className="visa-band font-mono text-[11px] uppercase">
            <span className="visa-press inline-block tracking-[0.18em]">{sticker.permit}</span>
            <span className="tracking-[0.3em] opacity-80" aria-hidden>
              {sticker.code}
            </span>
          </div>

          <div className="flex flex-1 flex-col p-6 pt-5">
            <h3 className="font-display text-2xl font-semibold tracking-tight">{sticker.name}</h3>
            <p className="mt-1.5 font-mono text-xs text-fg-muted">{sticker.status}</p>

            <div className="mt-4 flex gap-2" role="img" aria-label="Fluency: 5 out of 5">
              {Array.from({ length: 5 }, (_, d) => (
                <span key={d} className="visa-dot" style={{ ['--d' as string]: d }} />
              ))}
            </div>

            {sticker.cert && (
              <p className="mt-5">
                <span
                  className="stamp stamp-rect stamp-sm text-[10px] text-postal"
                  style={{ ['--rot' as string]: '-2deg', ['--i' as string]: index + 1 }}
                >
                  <span className="font-semibold">{sticker.cert.score}</span>
                  <span className="text-[8px] tracking-[0.2em]">{sticker.cert.detail}</span>
                </span>
              </p>
            )}
            {sticker.note && (
              <p className="font-hand mt-5 text-xl text-fg-muted">{sticker.note}</p>
            )}

            <div className="mt-auto flex items-end justify-between gap-4 pt-6">
              <div className="barcode w-32 sm:w-40" aria-hidden />
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted">
                {sticker.serial}
              </p>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export function Languages() {
  return (
    <Section id="languages" kicker="Border control" title="Languages I travel with">
      <div className="grid max-w-4xl gap-6 sm:grid-cols-2">
        {stickers.map((s, i) => (
          <VisaSticker key={s.code} sticker={s} index={i} />
        ))}
      </div>
      <p className="font-hand mt-8 text-xl text-fg-muted">
        (Czech and Korean are still in progress, but I can already order coffee in both)
      </p>
    </Section>
  )
}
