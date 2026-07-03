import * as React from 'react';
import { Link, HeadFC, PageProps } from 'gatsby';
import Layout from '../components/layout/Layout';

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-12 px-6">
        <h1 className="text-2xl font-semibold text-slate-800 mb-4">Page not found</h1>
        <p className="text-slate-500">
          Sorry, we couldn't find what you were looking for.
          {process.env.NODE_ENV === 'development' ? (
            <>
              {' '}
              Try creating a page in <code className="text-amber-800 bg-amber-50 px-1 rounded">src/pages/</code>.
            </>
          ) : null}{' '}
          <Link to="/" className="text-slate-600 hover:text-slate-900">
            Go home
          </Link>
          .
        </p>
      </div>
    </Layout>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;
