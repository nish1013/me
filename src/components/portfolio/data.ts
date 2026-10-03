export interface PortfolioModel {
  title: string;
  hint?: string;
  uri: string;
  icon?: string;
  features?: string[];
  languages?: string[];
  tech?: string[];
}

export const PORTFOLIO: PortfolioModel[] = [
  {
    title: 'Actxio',
    hint: 'Letters in, deadlines out',
    uri: 'https://actxio.com/',
    features: ['AI agent', 'MCP'],
    languages: ['TypeScript'],
    tech: ['Next.js', 'Node.js', 'LLM (OpenAI)', 'Supabase'],
    icon: '🤖',
  },
  {
    title: 'Risk Engine',
    hint: 'Flags risky financial activity',
    uri: 'https://riskengine.satharasinghe.com/',
    languages: ['Python'],
    tech: ['FastAPI', 'PostgreSQL'],
    icon: '🚨',
  },
  {
    title: 'Ledger Match',
    hint: 'Finds mismatched transactions',
    uri: 'https://ledgermatch.satharasinghe.com/',
    languages: ['TypeScript', 'Python'],
    tech: ['Next.js', 'FastAPI'],
    icon: '⚖️',
  },
  {
    title: 'Claims API',
    hint: 'Insurance claims processor',
    uri: 'https://claims.satharasinghe.com/',
    languages: ['TypeScript'],
    tech: ['NestJS', 'Node.js', 'MongoDB', 'Microservices', 'Swagger'],
    icon: '🧾',
  },
  {
    title: 'Cinema Booking',
    hint: 'Holds your seats on a timer',
    uri: 'https://cinemabooking.satharasinghe.com/',
    languages: ['TypeScript', 'Python'],
    tech: ['Next.js', 'FastAPI', 'PostgreSQL'],
    icon: '🎬',
  },
  {
    title: 'Club Booking',
    hint: 'School clubs with a waiting list',
    uri: 'https://cbooking.satharasinghe.com/',
    languages: ['TypeScript', 'Python'],
    tech: ['Next.js', 'Node.js', 'FastAPI', 'PostgreSQL'],
    icon: '🎟️',
  },
  {
    title: 'Web3 Wallet',
    hint: 'Checks a blockchain wallet balance',
    uri: 'https://wallet.satharasinghe.com/',
    languages: ['TypeScript'],
    tech: ['Web3', 'NestJS', 'Node.js', 'Tatum SDK', 'Preact'],
    icon: '🪙',
  },
  {
    title: 'Package Pulse',
    hint: 'Dependency health checks',
    uri: 'https://packagepulse.satharasinghe.com/',
    languages: ['TypeScript', 'Python'],
    tech: ['Next.js', 'Node.js', 'FastAPI', 'SSE streaming'],
    icon: '📦',
  },
  {
    title: 'Interactive Python',
    hint: 'Checks your Python as you learn',
    uri: 'https://nishpy.satharasinghe.com/',
    languages: ['TypeScript'],
    tech: ['React', 'Pyodide'],
    icon: '🎓',
  },
  {
    title: 'Python Playground',
    hint: 'Learn by running examples inline',
    uri: 'https://python.satharasinghe.com/',
    languages: ['TypeScript'],
    tech: ['Next.js', 'Pyodide'],
    icon: '🐍',
  },
];
