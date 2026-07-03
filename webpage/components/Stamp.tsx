import Link from 'next/link'

const inks = {
  red: 'text-accent',
  blue: 'text-postal',
  green: 'text-visa',
} as const

export type StampProps = {
  href: string
  label: string
  sub: string
  ink: keyof typeof inks
  shape?: 'round' | 'rect'
  rotate?: number
}

/** A passport stamp that doubles as navigation. */
export function Stamp({ href, label, sub, ink, shape = 'rect', rotate = -3 }: StampProps) {
  return (
    <Link
      href={href}
      className={`stamp ${shape === 'round' ? 'stamp-round' : 'stamp-rect'} ${inks[ink]}`}
      style={{ ['--rot' as string]: `${rotate}deg` }}
    >
      <span className="text-[11px] font-bold sm:text-xs">{label}</span>
      <span className="text-[9px] opacity-80">{sub}</span>
    </Link>
  )
}
