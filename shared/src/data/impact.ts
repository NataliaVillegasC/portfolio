import { ImpactStatSchema, type ImpactStat } from '../schemas'

/** The numbers that travel well — shown as luggage tags on the main site. */
export const impact: ImpactStat[] = [
  {
    value: '15,000+',
    label: 'students served by tools I built',
    source: 'Los Andes web platform',
  },
  {
    value: 'USD 100K',
    label: 'saved per year by one replacement',
    source: 'counseling platform rebuild',
  },
  {
    value: '~67%',
    label: 'OCR processing latency cut',
    source: 'Phi Technologies pipeline',
  },
  {
    value: '1,000/day',
    label: 'documents through my RAG pipeline',
    source: 'enterprise ingestion',
  },
  {
    value: '91%',
    label: 'F1 on misinformation detection',
    source: '57K+ news articles',
  },
  {
    value: '4.89/5',
    label: 'GPA — highest this century',
    source: 'Industrial Eng., Los Andes',
  },
].map((s) => ImpactStatSchema.parse(s))
