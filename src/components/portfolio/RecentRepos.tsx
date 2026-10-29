import React from 'react';
import { GITHUB_PROFILE_URL, RECENT_DAYS } from '../github/data';
import { activityText } from '../github/github.util';
import { useRecentWork } from '../github/useRecentWork';

const LINK =
  'text-slate-600 hover:text-slate-900 underline-offset-2 hover:underline';

export default function RecentRepos() {
  const state = useRecentWork();

  if (state.status === 'loading') {
    return <p className="text-sm text-slate-500">Loading from GitHub…</p>;
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
        {activityText(state.activity, RECENT_DAYS)}
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
