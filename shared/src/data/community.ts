import { CommunitySchema, type Community } from '../schemas'

/**
 * Community & Leadership — the "beyond the code" work.
 * TODO(Natalia): add student groups, volunteering, mentoring, clubs…
 * anything where you built spaces for others. Set draft: false when real.
 */
export const community: Community[] = [
  {
    org: 'Stanford University · Code in Place',
    role: 'Section Leader',
    period: 'Apr – Jun 2025',
    description:
      'Led 10+ international learners through Stanford’s CS106A in weekly live sections: hands-on labs, 40+ code reviews, and the joy of watching someone’s first program run.',
    url: 'https://codeinplace.stanford.edu',
    draft: false,
  },
  {
    org: 'Your organization',
    role: 'Your role',
    period: '2024',
    description: 'One or two sentences about what you built or led there.',
    draft: true,
  },
].map((c) => CommunitySchema.parse(c))
