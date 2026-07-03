import { ProjectSchema, type Project } from '../schemas'

export const projects: Project[] = [
  {
    slug: 'hybrid-recommender',
    title: 'Hybrid Recommender for Digital Portfolio',
    period: 'July 2025',
    tech: ['Python', 'XGBoost', 'LightFM', 'Dash', 'AWS'],
    summary:
      'A stakeholder-facing recommendation system that ranks top-N portfolio opportunities, pairing an XGBoost and LightFM weighted hybrid with decision-ready dashboards.',
    highlights: [
      'Expected value of USD 1.3K per recommendation, surfaced through ranked top-N suggestions and clear dashboards.',
      'Improved strategic-portfolio alignment by 30% with a weighted XGBoost + LightFM hybrid.',
      'Launched on AWS with environment-based configs and logging, exposing a public endpoint for demos and team access.',
      'Secured a 50% scholarship award and an implementation commitment based on measured impact.',
    ],
    links: {},
    flagship: true,
    caseStudy: [
      {
        heading: 'The problem',
        body: 'Portfolio decisions were being made from intuition and scattered spreadsheets. The organization needed a way to rank which digital initiatives to invest in next — grounded in data, explainable to stakeholders, and light enough to actually get used.',
      },
      {
        heading: 'The approach',
        body: 'I built a weighted hybrid recommender that combines XGBoost (learning from structured features of past initiatives) with LightFM (collaborative signals across the portfolio). The two models vote through a tuned weighting scheme, producing ranked top-N suggestions with confidence context rather than a black-box score. A Dash front end turns the rankings into dashboards designed for a non-technical steering committee.',
      },
      {
        heading: 'Engineering it for real use',
        body: 'The system runs on AWS with environment-based configuration and structured logging, and exposes a public endpoint used for live demos and team access. It was built to survive handover: config over code, documented interfaces, reproducible training.',
      },
      {
        heading: 'Impact',
        body: 'Strategic-portfolio alignment improved by 30%, with an expected value of USD 1.3K per recommendation. The measured impact earned a 50% scholarship award and a commitment to implement the system.',
      },
    ],
    draft: false,
  },
  {
    slug: 'misinformation-detection',
    title: 'News Media Misinformation Detection',
    period: 'March 2025',
    tech: ['Python', 'NLP', 'Supervised Learning', 'Flask', 'AWS'],
    summary:
      'A large-scale NLP classifier that reads the news with a skeptical eye — 91% F1 over 57K+ articles, served through a real-time probability-based API.',
    highlights: [
      'Built and optimized a large-scale NLP classifier over 57K+ articles, achieving a 91% F1-score.',
      'Integrated a Flask API for real-time, probability-based classification to simulate user-facing functionality.',
    ],
    links: {},
    flagship: true,
    caseStudy: [
      {
        heading: 'The problem',
        body: 'Misinformation doesn’t announce itself. With 57,000+ news articles as raw material, the goal was to build a classifier that could flag likely misinformation at scale — and to do it honestly, reporting calibrated probabilities instead of confident-sounding labels.',
      },
      {
        heading: 'The approach',
        body: 'I engineered an NLP pipeline over the full corpus: text cleaning and feature extraction, then systematic comparison and optimization of supervised models against a held-out evaluation set. The final classifier reaches a 91% F1-score — strong enough to be useful, measured carefully enough to be trusted.',
      },
      {
        heading: 'Making it usable',
        body: 'A Flask API wraps the model for real-time classification, returning probability scores rather than binary verdicts — simulating exactly how a user-facing product would consume it, and deployed on AWS.',
      },
    ],
    draft: false,
  },
  {
    slug: 'bank-deposit-forecasting',
    title: 'Bank Deposit Forecasting & Optimization Pipeline',
    period: 'November 2024',
    tech: ['Python', 'SQL', 'Neural Networks', 'Dash', 'AWS'],
    summary:
      'A cloud ML pipeline for long-term deposit forecasting that raised accuracy by 22% and put real-time dashboards in front of the teams making the calls.',
    highlights: [
      'Built a cloud ML pipeline (Python/SQL) for long-term deposit forecasting, raising accuracy by 22%.',
      'Implemented real-time Dash dashboards, improving cross-team decision-making by 40%.',
    ],
    links: {},
    flagship: false,
    draft: false,
  },
  // ── The three below are provisional: swap in real descriptions + GitHub links
  //    once the repos go public. They render as compact cards until draft: false.
  {
    slug: 'yellow-fever-analysis',
    title: 'Yellow Fever Data Analysis',
    period: '2024',
    tech: ['Python', 'Data Analysis', 'Visualization'],
    summary:
      'Exploratory analysis and visualization of yellow fever epidemiological data. — TODO(Natalia): replace with the real one-liner.',
    highlights: [],
    links: {},
    flagship: false,
    draft: true,
  },
  {
    slug: 'campus-activity-discovery',
    title: 'Campus Activity Discovery',
    period: '2024',
    tech: ['TypeScript', 'React'],
    summary:
      'An app for discovering student activities on campus. — TODO(Natalia): replace with the real one-liner.',
    highlights: [],
    links: {},
    flagship: false,
    draft: true,
  },
  {
    slug: 'banking-prediction',
    title: 'Banking Prediction',
    period: '2024',
    tech: ['Python', 'Machine Learning'],
    summary:
      'Predictive modeling on banking data. — TODO(Natalia): replace with the real one-liner.',
    highlights: [],
    links: {},
    flagship: false,
    draft: true,
  },
].map((p) => ProjectSchema.parse(p))

export const flagshipProjects = projects.filter((p) => p.flagship)
