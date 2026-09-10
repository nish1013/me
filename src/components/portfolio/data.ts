export interface PortfolioModel {
  title: string;
  uri: string;
  icon?: string;
}

export const PORTFOLIO: PortfolioModel[] = [
  {
    title: 'Actxio — Messy documents → clear actions & dates',
    uri: 'https://actxio.com/',
    icon: '🤖',
  },
  {
    title: 'Web3 Wallet',
    uri: 'https://wallet.satharasinghe.com/',
  },
  {
    title: 'Claims API',
    uri: 'https://claims.satharasinghe.com/'
  },
  {
    title: 'Python Playground — learn by running examples inline',
    uri: 'https://python.satharasinghe.com/',
    icon: '🐍',
  },
  {
    title: 'PackagePulse — health checks for PyPI and npm dependencies',
    uri: 'https://packagepulse.satharasinghe.com/',
    icon: '📦',
  },
];
