import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import Layout from '../components/layout/Layout';
import Portfolios from '../components/portfolio/portfolios';

const PortfolioPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Portfolios />
    </Layout>
  );
};

export default PortfolioPage;

export const Head: HeadFC = () => <title>Portfolio page</title>;
