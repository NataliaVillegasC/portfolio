const tints = {
  gold: 'washi-gold',
  blue: 'washi-blue',
  green: 'washi-green',
} as const

/** A strip of washi tape holding two pages of the journal together. */
export function Washi({
  tint = 'gold',
  rotate = -2,
}: {
  tint?: keyof typeof tints
  rotate?: number
}) {
  return (
    <div aria-hidden className="washi-wrap">
      <span className={`washi ${tints[tint]}`} style={{ ['--rot' as string]: `${rotate}deg` }} />
    </div>
  )
}
