import React from 'react';
import { GITHUB_PROFILE_URL, SHOWCASE } from '../github/data';
import { activityText, titleFromName } from '../github/github.util';
import { useRecentWork } from '../github/useRecentWork';

const SKELETON_TOPICS = [
  'domain-driven-design',
  'event-driven',
  'fastapi',
  'postgresql',
  'python',
  'docker',
  'evals',
  'ai-agent',
  'typescript',
];

const LINK =
  'text-slate-600 hover:text-slate-900 underline-offset-2 hover:underline';

export default function RecentRepos() {
  const state = useRecentWork();

  if (state.status === 'loading') {
    return <RecentReposSkeleton />;
  }

  if (state.status === 'error' || !state.activity) {
    return (
      <a
        href={GITHUB_PROFILE_URL}
        className={`text-sm ${LINK}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        See all work on GitHub ↗
      </a>
    );
  }

  return (
    <>
      <p className="text-sm text-slate-500 mb-4">
        {activityText(state.activity)}
      </p>
      <div className="space-y-3">
        {state.repos.map((r) => (
          <article
            key={r.name}
            className="border border-slate-300 px-6 py-4 rounded-lg"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="text-sm font-medium text-slate-700">{r.title}</h3>
              <span className="text-xs text-slate-500">
                pushed {r.pushedLabel}
              </span>
            </div>
            {r.description && (
              <p className="text-xs text-slate-500 mt-1">{r.description}</p>
            )}
            {r.tradeoff && (
              <p className="text-sm text-slate-700 mt-2">
                <span className="font-medium">Trade-off:</span> {r.tradeoff}
              </p>
            )}
            {r.topics.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {r.topics.map((t) => (
                  <span
                    key={t}
                    className="text-xs text-slate-600 border border-slate-200 rounded px-1.5 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-4 mt-3 text-xs">
              <a
                href={r.url}
                className={LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                Code ↗
              </a>
              {r.decisionsUrl && (
                <a
                  href={r.decisionsUrl}
                  className={LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Decisions ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

// Showcase text gives the skeleton the height of the real list, so Live demos does not jump when it arrives.
function RecentReposSkeleton() {
  return (
    <div aria-busy="true">
      <p className="text-sm text-slate-500 mb-4">Loading from GitHub…</p>
      <div
        className="space-y-3 animate-pulse text-transparent"
        aria-hidden="true"
      >
        {SHOWCASE.map((entry) => (
          <div
            key={entry.repo}
            className="border border-slate-200 px-6 py-4 rounded-lg"
          >
            <h3 className="text-sm font-medium">{titleFromName(entry.repo)}</h3>
            <p className="text-xs mt-1">
              {entry.tradeoff} {entry.tradeoff}
            </p>
            <p className="text-sm mt-2">Trade-off: {entry.tradeoff}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {SKELETON_TOPICS.map((t) => (
                <span
                  key={t}
                  className="text-xs bg-slate-100 rounded px-1.5 py-0.5"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-3 text-xs">Code ↗</div>
          </div>
        ))}
      </div>
    </div>
  );
}
