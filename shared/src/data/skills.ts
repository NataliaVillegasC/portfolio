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
].map((s) => SkillGroupSchema.parse(s))
