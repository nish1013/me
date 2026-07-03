import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import Layout from '../components/layout/Layout';
import { profileSummary } from '../data/profile';

const AboutPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-12 px-6">
        <h1 className="text-2xl font-semibold text-slate-800 mb-6">About</h1>
        <p className="text-slate-600 leading-relaxed">{profileSummary}</p>
      </div>
    </Layout>
  );
};

export default AboutPage;

export const Head: HeadFC = () => <title>About | Nish</title>;
