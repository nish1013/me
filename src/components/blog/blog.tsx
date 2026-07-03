import React from 'react';
import Posts from './posts';
import { Link } from 'gatsby';

import './styles.css';

export default function Blog() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <Link
        to="/"
        className="text-slate-500 hover:text-slate-700 text-sm mb-6 inline-block"
      >
        ← Back to Home
      </Link>
      <h1 className="text-2xl font-semibold text-slate-800 mb-6">Blog</h1>
      <Posts />
    </div>
  );
}
