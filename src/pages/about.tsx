import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import Layout from '../components/layout/Layout';
import {
  intro,
  tagline,
  focusAreas,
  companies,
  primaryLanguages,
  stackGroups,
} from '../data/profile';

const AboutPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-12 px-6">
        <h1 className="text-2xl font-semibold text-slate-800 mb-2">About</h1>
        <p className="text-slate-700 mb-2">{intro}</p>
        <p className="text-slate-500 mb-8">{tagline}</p>

        {/* Focus Areas */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Focus Areas
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {focusAreas.map((area, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg"
              >
                <span className="text-xl">{area.icon}</span>
                <span className="text-slate-700 text-sm">{area.title}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Companies */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Worked With
          </h2>
          <div className="flex flex-wrap gap-2">
            {companies.map((company, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-band text-band-ink text-sm rounded-md"
              >
                {company}
              </span>
            ))}
          </div>
        </section>

        {/* Stack */}
        <section>
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Stack
          </h2>
          <div className="flex flex-wrap gap-2 mb-5">
            {primaryLanguages.map((l) => (
              <span
                key={l.name}
                className="px-3 py-1.5 bg-band text-band-ink text-sm rounded-md"
              >
                {l.name}
              </span>
            ))}
          </div>
          <div className="space-y-4">
            {stackGroups.map((g) => (
              <div key={g.title}>
                <h3 className="text-xs text-slate-500 mb-2">{g.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 border border-slate-300 text-slate-600 text-sm rounded-md"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;

export const Head: HeadFC = () => <title>About | Nish</title>;
