import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import Layout from '../components/layout/Layout';
import { tagline, focusAreas, companies, skills, aiSkills } from '../data/profile';

const AboutPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-12 px-6">
        <h1 className="text-2xl font-semibold text-slate-800 mb-2">About</h1>
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
                className="px-3 py-1.5 bg-slate-800 text-slate-100 text-sm rounded-md"
              >
                {company}
              </span>
            ))}
          </div>
        </section>

        {/* AI & LLM */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
            AI & LLM
          </h2>
          <div className="flex flex-wrap gap-2">
            {aiSkills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-slate-800 text-slate-100 text-sm rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1.5 border border-slate-300 text-slate-600 text-sm rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;

export const Head: HeadFC = () => <title>About | Nish</title>;
