import { ProfileSchema } from '../schemas'

export const profile = ProfileSchema.parse({
  name: 'Natalia Villegas Calderón',
  shortName: 'Natalia',
  title: 'AI Engineer · Industrial & Systems Engineer',
  tagline:
    'I build AI systems and optimize the world around them, these days from Prague, after Bogotá, Seoul, and London.',
  location: {
    city: 'Prague',
    country: 'Czechia',
    timezone: 'Europe/Prague',
    timezoneLabel: 'CET',
  },
  email: 'n.villegasc09@gmail.com',
  phone: '+420 734 547 260',
  github: 'https://github.com/NataliaVillegasC',
  githubHandle: 'NataliaVillegasC',
  linkedin: 'https://linkedin.com/in/nataliavc09',
  linkedinHandle: 'nataliavc09',
  greetings: [
    { text: 'Hola', lang: 'es', language: 'Spanish' },
    { text: 'Hello', lang: 'en', language: 'English' },
    { text: 'Ahoj', lang: 'cs', language: 'Czech' },
    { text: '안녕하세요', lang: 'ko', language: 'Korean' },
  ],
  // TODO(Natalia): adjust levels / add languages as you like
  languages: [
    { name: 'Spanish', level: 'Native' },
    { name: 'English', level: 'C1 · IELTS 8.0' },
    { name: 'Czech', level: 'Learning' },
    { name: 'Korean', level: 'Basics' },
  ],
  stats: {
    countriesVisited: 36,
    countriesLived: 4,
    continentsVisited: 4,
  },
})
