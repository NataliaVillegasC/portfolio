import { SkillGroupSchema, type SkillGroup } from '../schemas'

export const skills: SkillGroup[] = [
  {
    label: 'Programming & Frameworks',
    items: ['Python', 'Java', 'Rust', 'Swift', 'SQL', 'TypeScript', 'React', 'FastAPI'],
  },
  {
    label: 'AI/ML, Data & BI',
    items: [
      'TensorFlow',
      'PyTorch',
      'Scikit-learn',
      'Keras',
      'OpenAI API',
      'Polars',
      'Power BI',
      'Plotly',
    ],
  },
  {
    label: 'Cloud, DevOps & Databases',
    items: ['AWS', 'GCP', 'Firebase', 'Docker', 'Coolify', 'PostgreSQL'],
  },
  {
    label: 'Soft skills',
    items: [
      'Teamwork & Collaboration',
      'Problem-solving',
      'Discipline',
      'Leadership in international teams',
      'Adaptability',
      'Fast learner',
      'Autonomy',
    ],
  },
].map((s) => SkillGroupSchema.parse(s))
