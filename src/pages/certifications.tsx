import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import Layout from '../components/layout/Layout';
import Certifications from '../components/certifications/certifications';

const CertificationsPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Certifications />
    </Layout>
  );
};

export default CertificationsPage;

export const Head: HeadFC = () => <title>Certifications page</title>;
