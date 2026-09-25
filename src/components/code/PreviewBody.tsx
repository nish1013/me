import React from 'react';
import { CodeSource } from './code.types';
import SiteLink from './SiteLink';

interface PreviewBodyProps {
  source: CodeSource;
}

interface PreviewSectionProps {
  title: string;
  children: React.ReactNode;
}

const LINK =
  'underline decoration-slate-300 underline-offset-4 hover:decoration-slate-800';

export default function PreviewBody({ source }: PreviewBodyProps) {
  return (
    <div className="flex flex-col gap-9 font-intro text-[15px] leading-relaxed text-slate-800 md:text-base">
      <p className="text-slate-600">{source.tagline}</p>

      <PreviewSection title="Playground">
        <ul>
          {source.projects.map((p) => (
            <li
              key={p.url}
              className="border-t border-slate-200 first:border-t-0"
            >
              <SiteLink
                href={p.url}
                className="group grid gap-x-6 py-3 md:grid-cols-[13rem_1fr_auto]"
              >
                <span className="font-medium group-hover:text-code-prop">
                  {p.name}
                </span>
                <span className="text-slate-600">{p.does}</span>
                <span className="hidden text-slate-400 group-hover:text-code-prop md:inline">
                  ↗
                </span>
              </SiteLink>
            </li>
          ))}
        </ul>
      </PreviewSection>

      <PreviewSection title="Worked with">
        <p>{source.companies.join(' · ')}</p>
      </PreviewSection>

      <PreviewSection title="Writing">
        <ul className="flex flex-col gap-2">
          {source.posts.map((post) => (
            <li key={post.url}>
              <SiteLink href={post.url} className={LINK}>
                {post.title}
              </SiteLink>
            </li>
          ))}
        </ul>
        <SiteLink
          href={source.allPostsUrl}
          className="mt-3 inline-block text-sm text-slate-600 hover:text-slate-900"
        >
          All posts →
        </SiteLink>
      </PreviewSection>

      <PreviewSection title="Elsewhere">
        <p className="flex flex-wrap gap-x-6 gap-y-2">
          {source.links.map((l) => (
            <SiteLink key={l.url} href={l.url} className={LINK}>
              {l.label}
            </SiteLink>
          ))}
        </p>
      </PreviewSection>

      <p className="text-xs text-slate-500">
        Built with TypeScript, React &amp; Node.js ·{' '}
        <SiteLink href={source.sourceUrl} className={LINK}>
          View Code
        </SiteLink>
      </p>
    </div>
  );
}

function PreviewSection({ title, children }: PreviewSectionProps) {
  return (
    <section>
      <h2 className="mb-3 font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider text-slate-500">
        {title}
      </h2>
      {children}
    </section>
  );
}
