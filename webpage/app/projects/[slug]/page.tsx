import Link from 'next/link'
import { notFound } from 'next/navigation'
import { flagshipProjects, profile } from '@natalia/shared'
import { Reveal } from '@/components/Reveal'

export function generateStaticParams() {
  return flagshipProjects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = flagshipProjects.find((p) => p.slug === slug)
  return project ? { title: project.title, description: project.summary } : {}
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = flagshipProjects.find((p) => p.slug === slug)
  if (!project || !project.caseStudy) notFound()

  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <Link
          href="/#projects"
          className="font-mono text-base uppercase tracking-[0.2em] text-fg-muted hover:text-accent"
        >
          ← All projects
        </Link>
        <p className="mt-8 font-mono text-xs text-fg-muted">{project.period}</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-fg-muted">{project.summary}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-full bg-sand px-3 py-1 font-mono text-[11px] text-fg-muted"
            >
              {t}
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-14 space-y-12">
        {project.caseStudy.map((section) => (
          <Reveal key={section.heading}>
            <section>
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                {section.heading}
              </h2>
              <p className="mt-4 leading-relaxed text-fg-muted">{section.body}</p>
            </section>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <div className="rounded-2xl border border-line bg-card p-8">
          <h2 className="font-display text-xl font-semibold">Key numbers</h2>
          <ul className="mt-4 list-inside space-y-2 text-fg-muted">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-10 text-fg-muted">
          Curious about the details?{' '}
          <a href={`mailto:${profile.email}`} className="text-accent underline underline-offset-4">
            I’m happy to walk you through it.
          </a>
        </p>
      </Reveal>
    </main>
  )
}
