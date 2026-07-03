import { z } from 'zod'

export const CountryStatus = z.enum(['lived', 'visited'])

export const CountrySchema = z.object({
  /** Display name, exactly as it should read in the UI */
  name: z.string().min(1),
  continent: z.enum(['South America', 'North America', 'Europe', 'Asia', 'Africa', 'Oceania']),
  status: CountryStatus,
  /**
   * Name of the matching geometry in the world-atlas TopoJSON.
   * Leave empty for places too small to render as a shape (Singapore, Malta…) —
   * they are drawn as dots at lat/lng instead.
   */
  mapKey: z.string(),
  lat: z.number().nullable(),
  lng: z.number().nullable(),
  /** Shown in the map tooltip; richest for lived-in places */
  note: z.string(),
  /** Set to 0 to exclude a row from the "countries visited" count (e.g. UK nations) */
  countsAs: z.number().int().min(0).max(1),
})
export type Country = z.infer<typeof CountrySchema>

export const LanguageSchema = z.object({
  name: z.string(),
  level: z.string(),
})

export const ProfileSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  title: z.string(),
  tagline: z.string(),
  location: z.object({
    city: z.string(),
    country: z.string(),
    timezone: z.string(),
    timezoneLabel: z.string(),
  }),
  email: z.string().email(),
  phone: z.string(),
  github: z.string().url(),
  githubHandle: z.string(),
  linkedin: z.string().url(),
  linkedinHandle: z.string(),
  /** Rotating hero greetings, in the languages of Natalia's life */
  greetings: z.array(z.object({ text: z.string(), lang: z.string(), language: z.string() })),
  languages: z.array(LanguageSchema),
  stats: z.object({
    countriesVisited: z.number(),
    countriesLived: z.number(),
    continentsVisited: z.number(),
  }),
})
export type Profile = z.infer<typeof ProfileSchema>

export const EducationSchema = z.object({
  institution: z.string(),
  location: z.string(),
  degree: z.string(),
  start: z.string(),
  end: z.string(),
  details: z.array(z.string()),
  honors: z.array(z.string()),
})
export type Education = z.infer<typeof EducationSchema>

export const ExperienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  location: z.string(),
  start: z.string(),
  end: z.string(),
  bullets: z.array(z.string()),
  /** true → appears on the one-page resume as well as the full CV */
  resume: z.boolean(),
})
export type Experience = z.infer<typeof ExperienceSchema>

export const ProjectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  period: z.string(),
  tech: z.array(z.string()),
  summary: z.string(),
  highlights: z.array(z.string()),
  links: z.object({
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
  }),
  /** Flagship projects get a full case-study page on the main site */
  flagship: z.boolean(),
  caseStudy: z.array(z.object({ heading: z.string(), body: z.string() })).optional(),
  /** true → copy is provisional and should be reviewed/edited by Natalia */
  draft: z.boolean(),
})
export type Project = z.infer<typeof ProjectSchema>

export const JourneyEntrySchema = z.object({
  date: z.string(),
  year: z.number(),
  place: z.string(),
  country: z.string(),
  title: z.string(),
  description: z.string(),
  kind: z.enum(['education', 'work', 'move', 'milestone', 'teaching']),
})
export type JourneyEntry = z.infer<typeof JourneyEntrySchema>

export const PhotoSchema = z.object({
  id: z.string(),
  /** File name inside webpage/public/photos/ */
  file: z.string(),
  place: z.string(),
  country: z.string(),
  date: z.string(),
  caption: z.string(),
  alt: z.string(),
  /** Layout hint for the editorial grid */
  span: z.enum(['wide', 'tall', 'square']),
  /** true until Natalia replaces the generated placeholder with a real photo */
  placeholder: z.boolean(),
})
export type Photo = z.infer<typeof PhotoSchema>

export const SkillGroupSchema = z.object({
  label: z.string(),
  items: z.array(z.string()),
})
export type SkillGroup = z.infer<typeof SkillGroupSchema>
