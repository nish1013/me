import React from 'react';
import Portfolio from './portfolio';
import './styles.css';
import { PORTFOLIO } from './data';

export default function Portfolios() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-semibold text-slate-800 mb-6">Playground</h1>
      <div className="space-y-3">
        {PORTFOLIO.map((c, i) => (
          <Portfolio key={i} title={c.title} uri={c.uri} />
        ))}
      </div>
    </div>
  );
}
