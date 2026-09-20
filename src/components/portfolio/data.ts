export interface PortfolioModel {
  title: string;
  hint?: string;
  uri: string;
  icon?: string;
}

export const PORTFOLIO: PortfolioModel[] = [
  {
    title: 'Actxio',
    hint: 'Documents into actions and dates',
    uri: 'https://actxio.com/',
    icon: '🤖',
  },
  {
    title: 'RiskEngine',
    hint: 'Flags risky financial activity',
    uri: 'https://riskengine.satharasinghe.com/',
    icon: '🚨',
  },
  {
    title: 'PackagePulse',
    hint: 'Dependency health checks',
    uri: 'https://packagepulse.satharasinghe.com/',
    icon: '📦',
  },
  {
    title: 'LedgerMatch',
    hint: 'Finds mismatched transactions',
    uri: 'https://ledgermatch.satharasinghe.com/',
    icon: '⚖️',
  },
  {
    title: 'Interactive Python',
    hint: 'Checks your Python as you learn',
    uri: 'https://nishpy.satharasinghe.com/',
    icon: '🎓',
  },
  {
    title: 'Python Playground',
    hint: 'Learn by running examples inline',
    uri: 'https://python.satharasinghe.com/',
    icon: '🐍',
  },
  {
    title: 'Web3 Wallet',
    hint: 'Checks a blockchain wallet balance',
    uri: 'https://wallet.satharasinghe.com/',
    icon: '🪙',
  },
  {
    title: 'Claims API',
    hint: 'Insurance claims processor',
    uri: 'https://claims.satharasinghe.com/',
    icon: '🧾',
  },
];
