import { EducationSchema, type Education } from '../schemas'

export const education: Education[] = [
  {
    institution: 'Los Andes University',
    location: 'Bogotá, Colombia',
    degree:
      'B.Sc. Industrial Engineering & B.Sc. Systems and Computing Engineering · Summa Cum Laude (both)',
    start: '2021-01',
    end: '2026-05',
    details: [
      'GPA 4.89/5, the highest in the Industrial Engineering program this century.',
      'Double degree completed with Summa Cum Laude honors in both programs.',
    ],
    honors: [
      'Ramón de Zubiría Award (2023, 2024, 2025): highest cumulative GPA across both programs',
      'Academic Excellence Award (5 semesters, 2021–2025): highest semester GPA in both programs',
    ],
  },
  {
    institution: 'Seoul National University (SNU)',
    location: 'Seoul, South Korea',
    degree: 'Exchange semester · Industrial Engineering & Computer Science',
    start: '2024-02',
    end: '2024-07',
    details: [
      'Enrolled in MSc/PhD-level courses focusing on algorithms, probabilistic graphical models, and data-driven decision-making.',
    ],
    honors: [],
  },
].map((e) => EducationSchema.parse(e))
