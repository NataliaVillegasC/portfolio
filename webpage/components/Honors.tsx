import { honors, type Honor } from '@natalia/shared'
import { Section } from './Section'
import { Reveal } from './Reveal'

function LogRow({ honor, index }: { honor: Honor; index: number }) {
  return (
    <tr className="log-row" style={{ ['--i' as string]: index }}>
      <td className="whitespace-nowrap py-2 pr-4 font-mono text-xs uppercase tracking-wide text-fg-muted sm:pr-8">
        {honor.date}
      </td>
      <td className="whitespace-nowrap py-2 pr-4 text-sm sm:pr-8">{honor.award}</td>
      <td
        className={`whitespace-nowrap py-2 pr-4 text-sm sm:pr-8 ${
          honor.highlight ? 'font-semibold text-honor' : 'text-fg-muted'
        }`}
      >
        {honor.program}
      </td>
      <td className="whitespace-nowrap py-2 font-mono text-xs text-fg-muted">{honor.detail}</td>
    </tr>
  )
}

export function Honors() {
  const zubiria = honors.filter((h) => h.group === 'zubiria')
  const excellence = honors.filter((h) => h.group === 'excellence')
  return (
    <Section id="honors" kicker="The honors" title="Awards & honors">
      <p className="font-hand -mt-6 mb-8 text-xl text-fg-muted">
        (the kind of stamps you cannot buy at a souvenir shop)
      </p>
      <Reveal>
        <div
          className="paper-lift mx-auto max-w-3xl rounded-xl border border-line bg-card p-6 sm:p-8"
          style={{ transform: 'rotate(-0.4deg)' }}
        >
          <h3 className="font-display text-lg font-semibold leading-snug">
            Academic honors log — Universidad de los Andes
          </h3>
          <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-fg-muted">
            Ramón de Zubiría: best cumulative GPA in the program · Academic Excellence: best
            semester GPA in the program
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr>
                  {['Date', 'Award', 'Program', 'Detail'].map((label) => (
                    <th
                      key={label}
                      scope="col"
                      className="border-b border-line pb-2 pr-4 font-mono text-[10px] font-normal uppercase tracking-[0.2em] text-fg-muted sm:pr-8"
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="[&>tr:first-child>td]:pt-4 [&>tr:last-child>td]:pb-4">
                {zubiria.map((h, i) => (
                  <LogRow key={`${h.date}-${h.program}`} honor={h} index={i} />
                ))}
              </tbody>
              <tbody className="border-t-2 border-dashed border-line [&>tr:first-child>td]:pt-4">
                {excellence.map((h, i) => (
                  <LogRow key={`${h.date}-${h.program}`} honor={h} index={zubiria.length + i} />
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 border-t border-line pt-3 font-mono text-xs leading-relaxed text-fg-muted">
            Each row: sole recipient, program-wide ranking that term or across the degree.
          </p>
        </div>
      </Reveal>
    </Section>
  )
}
