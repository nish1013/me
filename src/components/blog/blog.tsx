import React from 'react';
import Posts from './posts';

import './styles.css';

export default function Blog() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-semibold text-slate-800 mb-6">Blog</h1>
      <Posts />
    </div>
  );
}
