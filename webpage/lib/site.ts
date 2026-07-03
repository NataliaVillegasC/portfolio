import { siteConfig } from '@natalia/shared'

/** Prefix a public asset path with the deployment base path. */
export function asset(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`
}

/** URL of the CV app relative to the current deployment. */
export const cvUrl = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${siteConfig.cvPath}/`

/** URL of the resume app relative to the current deployment. */
export const resumeUrl = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${siteConfig.resumePath}/`
