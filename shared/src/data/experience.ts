import { ExperienceSchema, type Experience } from '../schemas'

export const experience: Experience[] = [
  {
    company: 'Phi Technologies s.r.o.',
    role: 'Software Engineer Intern (AI/ML)',
    location: 'Prague, Czech Republic',
    start: '2026-01',
    end: 'Present',
    bullets: [
      'Engineered full-stack expansion of a RAG ingestion pipeline from PDF-only to 3 enterprise file formats (.pdf, .docx, .xlsx), supporting ~1,000 documents/day.',
      'Optimized a Huridocs-based OCR/PDF processing microservice by upgrading the OCR engine and streamlining HTML-to-Markdown conversion, reducing end-to-end processing latency by ~67%.',
      'Contributed PR #132 to open-source Huridocs OCR, enabling automatic page rotation for enterprise documents.',
      'Diagnosed and patched an infinite-loop failure in the sentence chunking API, restoring a live production pipeline after a 6-hour outage without manual restarts.',
    ],
    resume: true,
  },
  {
    company: 'Los Andes University',
    role: 'Full-Stack Developer',
    location: 'Bogotá, Colombia',
    start: '2025-07',
    end: '2025-12',
    bullets: [
      'Built a unified REST endpoint (FastAPI, Polars) to surface complete Teaching Assistants history per student; documented and integrated into the team’s API portfolio for multi-service reuse.',
      'Extended the web app (TypeScript, React, MUI) with advanced filtering, refactored components, and eliminated UI errors, serving 15,000+ students and 600+ faculty.',
      'Enabled USD 100K in annual savings by replacing the external counseling platform.',
      'Developed an interactive 101-question national-exam prep quiz serving 1,000+ students university-wide.',
    ],
    resume: true,
  },
  {
    company: 'Los Andes University',
    role: 'Teaching Assistant · Advanced Optimization',
    location: 'Bogotá, Colombia',
    start: '2025-01',
    end: '2025-05',
    bullets: [
      'Led Master’s-level office hours for 45 students, debugging Python/Gurobi optimization models and co-designing 4 assignments on integer programming and decomposition methods.',
    ],
    resume: true,
  },
  {
    company: 'Stanford University (Online)',
    role: 'Section Leader · Code in Place',
    location: 'Remote',
    start: '2025-04',
    end: '2025-06',
    bullets: [
      'Led 10+ international learners through Stanford’s CS106A via weekly 60-minute sections.',
      'Conducted hands-on labs and 40+ code reviews; taught control flow, functions, decomposition, and debugging.',
    ],
    resume: false,
  },
].map((e) => ExperienceSchema.parse(e))
