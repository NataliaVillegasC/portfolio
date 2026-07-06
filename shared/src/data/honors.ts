import { HonorSchema, type Honor } from '../schemas'

/**
 * Academic honors log — Universidad de los Andes.
 *
 * Every entry is a single-recipient, program-wide ranking:
 * - Ramón de Zubiría award: best cumulative GPA in the program.
 * - Academic Excellence award: best semester GPA in the program that term.
 * Rows with highlight: true are the ones where the second engineering
 * program (Computer & systems) was topped.
 */
export const honors: Honor[] = [
  {
    date: '2023',
    award: 'Zubiría award',
    program: 'Industrial eng.',
    detail: 'Cumulative GPA',
    group: 'zubiria',
    highlight: false,
  },
  {
    date: '2024',
    award: 'Zubiría award',
    program: 'Industrial eng.',
    detail: 'Cumulative GPA',
    group: 'zubiria',
    highlight: false,
  },
  {
    date: '2025',
    award: 'Zubiría award',
    program: 'Industrial eng.',
    detail: 'Cumulative GPA',
    group: 'zubiria',
    highlight: false,
  },
  {
    date: '2025',
    award: 'Zubiría award',
    program: 'Computer & systems',
    detail: 'Cumulative GPA',
    group: 'zubiria',
    highlight: true,
  },
  {
    date: 'Nov 21',
    award: 'Excellence award',
    program: 'Industrial eng.',
    detail: 'Sem 1, 2021',
    group: 'excellence',
    highlight: false,
  },
  {
    date: 'Dec 22',
    award: 'Excellence award',
    program: 'Industrial eng.',
    detail: 'Sem 1, 2022',
    group: 'excellence',
    highlight: false,
  },
  {
    date: 'May 24',
    award: 'Excellence award',
    program: 'Industrial eng.',
    detail: 'Sem 2, 2023',
    group: 'excellence',
    highlight: false,
  },
  {
    date: 'May 25',
    award: 'Excellence award',
    program: 'Industrial eng.',
    detail: 'Sem 2, 2024',
    group: 'excellence',
    highlight: false,
  },
  {
    date: 'May 25',
    award: 'Excellence award',
    program: 'Computer & systems',
    detail: 'Sem 2, 2025',
    group: 'excellence',
    highlight: true,
  },
].map((h) => HonorSchema.parse(h))
