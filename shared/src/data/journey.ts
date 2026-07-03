import { JourneyEntrySchema, type JourneyEntry } from '../schemas'

/**
 * The journey: geography and career as one narrative.
 * Ordered oldest → newest; the UI may reverse it.
 */
export const journey: JourneyEntry[] = [
  {
    date: '2021-01',
    year: 2021,
    place: 'Bogotá',
    country: 'Colombia',
    title: 'The double degree begins',
    description:
      'Started B.Sc. degrees in Industrial Engineering and Systems & Computing Engineering at Los Andes University — two disciplines, one obsession: how systems work and how to make them better.',
    kind: 'education',
  },
  {
    date: '2024-02',
    year: 2024,
    place: 'Seoul',
    country: 'South Korea',
    title: 'Exchange at Seoul National University',
    description:
      'A semester of MSc/PhD-level courses in algorithms, probabilistic graphical models, and data-driven decision-making — and a first home on a new continent.',
    kind: 'move',
  },
  {
    date: '2025-01',
    year: 2025,
    place: 'Bogotá',
    country: 'Colombia',
    title: 'Teaching Advanced Optimization',
    description:
      'Led Master’s-level office hours for 45 students — debugging Python/Gurobi models and co-designing assignments on integer programming and decomposition methods.',
    kind: 'teaching',
  },
  {
    date: '2025-04',
    year: 2025,
    place: 'Stanford, online',
    country: 'USA',
    title: 'Code in Place section leader',
    description:
      'Taught Stanford’s CS106A to 10+ international learners in weekly sections — 40+ code reviews and a reminder that teaching is the best way to learn.',
    kind: 'teaching',
  },
  {
    date: '2025-07',
    year: 2025,
    place: 'Bogotá',
    country: 'Colombia',
    title: 'Full-stack developer at Los Andes',
    description:
      'Built FastAPI + React tooling serving 15,000+ students and 600+ faculty, and replaced an external platform — saving the university USD 100K a year.',
    kind: 'work',
  },
  {
    date: '2026-01',
    year: 2026,
    place: 'Prague',
    country: 'Czechia',
    title: 'AI engineering at Phi Technologies',
    description:
      'Joined as an AI/ML software engineer: expanding RAG ingestion pipelines to new formats, cutting OCR latency by ~67%, and contributing upstream to open-source Huridocs OCR.',
    kind: 'work',
  },
  {
    date: '2026-05',
    year: 2026,
    place: 'Bogotá',
    country: 'Colombia',
    title: 'Summa Cum Laude, twice',
    description:
      'Graduated from both programs with the highest GPA in Industrial Engineering this century (4.89/5) — three Ramón de Zubiría Awards and five Academic Excellence Awards along the way.',
    kind: 'milestone',
  },
].map((e) => JourneyEntrySchema.parse(e))
