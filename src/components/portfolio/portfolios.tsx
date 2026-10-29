import React from 'react';
import Portfolio from './portfolio';
import RecentRepos from './RecentRepos';
import './styles.css';
import { PORTFOLIO } from './data';

export default function Portfolios() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-semibold text-slate-800 mb-6">Work</h1>

      <section className="mb-12">
        <h2 className="text-lg font-semibold text-slate-800 mb-2">
          Recent on GitHub
        </h2>
        <RecentRepos />
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Live demos
        </h2>
        <div className="space-y-3">
          {PORTFOLIO.map((c, i) => (
            <Portfolio
              key={i}
              title={c.title}
              hint={c.hint}
              uri={c.uri}
              icon={c.icon}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
