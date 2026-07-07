'use client'

import { useEffect, useState } from 'react'
import { buildEmail, profile } from '@natalia/shared'

/**
 * A mailto link whose address only ever exists in the browser: href and text
 * are assembled after mount, so the prerendered HTML and the JS bundle never
 * contain the full email for scrapers to harvest.
 */
export function EmailLink({
  className,
  showAddress = false,
  children,
}: {
  className?: string
  /** Render the address itself as the link text (footer style) */
  showAddress?: boolean
  children?: React.ReactNode
}) {
  const [email, setEmail] = useState<string | null>(null)
  useEffect(() => setEmail(buildEmail(profile.emailParts)), [])

  return (
    <a href={email ? `mailto:${email}` : '#contact'} className={className}>
      {showAddress ? (email ?? 'email') : children}
    </a>
  )
}
