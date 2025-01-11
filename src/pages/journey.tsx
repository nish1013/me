import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import Layout from '../components/layout/Layout';
import Blog from '../components/journey/blog';

const JourneyPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Blog />
    </Layout>
  );
};

export default JourneyPage;

export const Head: HeadFC = () => <title>Journey page</title>;
