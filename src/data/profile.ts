export interface StackLanguage {
  name: string;
  tone: 'py' | 'ts' | 'go';
  uses: string;
}

export interface StackGroup {
  title: string;
  items: string[];
}

export const name = 'Nish';

export const intro =
  'Hands-on Lead Software Engineer with end-to-end product ownership, from early ideas through to fully delivered features.';

export const tagline = 'Building AI apps, scalable SaaS, distributed systems & blockchain apps';

export const focusAreas = [
  { title: 'AI & LLM Applications', icon: '🤖' },
  { title: 'Blockchain & Web3', icon: '⛓️' },
  { title: 'Distributed Systems', icon: '🌐' },
  { title: 'Data Intensive Apps', icon: '📊' },
  { title: 'Full-Stack Development', icon: '⚡' },
];

export const companies = [
  'Bondex',
  'Arena Entertainment',
  'IBM',
  'Visa',
  'M&S',
  'Virgin',
  'Telefonica',
];

export const tickerItems = [
  'AI apps',
  'Scalable SaaS',
  'Distributed systems',
  'Blockchain apps',
];

export const heroCompanies = ['Visa', 'IBM', 'M&S'];

export const heroTools = ['Node.js', 'FastAPI', 'AWS'];

export const primaryLanguages: StackLanguage[] = [
  {
    name: 'Python',
    tone: 'py',
    uses: 'FastAPI · Pydantic · LangChain · data pipelines',
  },
  {
    name: 'TypeScript',
    tone: 'ts',
    uses: 'Node.js · NestJS · React · Next.js',
  },
  { name: 'Go', tone: 'go', uses: 'concurrent, high-volume services' },
];

export const stackGroups: StackGroup[] = [
  {
    title: 'AI & data',
    items: [
      'LLMs',
      'LangChain',
      'LangSmith',
      'RAG',
      'MCP',
      'Prompt engineering',
      'LLM data pipelines',
      'Matching & ranking',
      'Data enrichment',
    ],
  },
  {
    title: 'Distributed systems',
    items: [
      'High-volume transactions',
      'Concurrency',
      'Event-driven',
      'Background workers',
      'Failure recovery',
    ],
  },
  {
    title: 'Cloud & infra',
    items: [
      'AWS',
      'Kubernetes',
      'AWS Step Functions',
      'SQS',
      'SNS',
      'Azure',
      'Railway',
      'GitHub Actions',
      'CI/CD',
    ],
  },
  {
    title: 'Messaging & design',
    items: [
      'RabbitMQ',
      'Kafka',
      'Redis',
      'Microservices',
      'CQRS',
      'DDD',
      'GraphQL',
      'REST',
    ],
  },
  { title: 'Data stores', items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
  { title: 'Also', items: ['Express.js', 'Java'] },
  {
    title: 'AI-assisted dev',
    items: ['Claude Code', 'Cursor', 'GitHub Copilot'],
  },
];
