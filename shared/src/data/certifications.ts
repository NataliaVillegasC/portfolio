import { CertificationSchema, type Certification } from '../schemas'

/**
 * Licenses & Certifications.
 *
 * TODO(Natalia): replace the draft entries below with your real list —
 * easiest source is LinkedIn → Profile → Licenses & certifications.
 * For each: title, issuer, issue date, credential ID + URL if it has one.
 * Set draft: false once real. Entries render in this order.
 */
export const certifications: Certification[] = [
  {
    title: 'Code in Place · Section Leader',
    issuer: 'Stanford University',
    issued: '2025-06',
    draft: false,
  },
  {
    title: 'Your certification title here',
    issuer: 'Issuer',
    issued: '2025-01',
    credentialId: 'ABC123',
    draft: true,
  },
  {
    title: 'Another certification',
    issuer: 'Issuer',
    issued: '2024-01',
    draft: true,
  },
].map((c) => CertificationSchema.parse(c))
