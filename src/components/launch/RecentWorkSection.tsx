import React from 'react';
import { GITHUB_PROFILE_URL, RECENT_DAYS } from '../github/data';
import { activityText } from '../github/github.util';
import type { RecentWorkState } from '../github/github.types';
import SiteLink from '../code/SiteLink';

interface RecentWorkSectionProps {
  state: RecentWorkState;
  limit: number;
  allUrl: string;
}

// Cards arrive after mount, so they skip ln-reveal: useReveal only observes nodes present at mount.
export default function RecentWorkSection({
  state,
  limit,
  allUrl,
}: RecentWorkSectionProps) {
  return (
    <section className="ln-section" id="recent">
      <p className="ln-eyebrow ln-mono ln-reveal">Recent work</p>
      <h2 className="ln-h2 ln-display ln-reveal">
        Built in the last {RECENT_DAYS} days.
      </h2>

      {state.status === 'loading' && (
        <p className="ln-activity ln-mono">Loading from GitHub…</p>
      )}

      {state.status === 'error' && (
        <SiteLink href={GITHUB_PROFILE_URL} className="ln-all ln-mono">
          See all work on GitHub ↗
        </SiteLink>
      )}

      {state.status === 'ready' && state.activity && (
        <>
          <p className="ln-activity ln-mono">
            <span className="ln-activity-dot" aria-hidden="true" />
            {activityText(state.activity, RECENT_DAYS)}
          </p>
          <div className="ln-grid">
            {state.repos.slice(0, limit).map((r) => (
              <SiteLink key={r.name} href={r.url} className="ln-card">
                <span className="ln-card-n ln-mono">
                  pushed {r.pushedLabel}
                </span>
                <h3 className="ln-display">{r.title}</h3>
                {r.tradeoff ? (
                  <p className="ln-card-trade">{r.tradeoff}</p>
                ) : (
                  <p>{r.description}</p>
                )}
                {r.topics.length > 0 && (
                  <span className="ln-card-langs ln-mono">
                    {r.topics.slice(0, 4).map((t) => (
                      <span key={t} className="ln-tone-other">
                        {t}
                      </span>
                    ))}
                  </span>
                )}
                <span className="ln-card-url ln-mono">
                  {r.url.replace('https://', '')} ↗
                </span>
              </SiteLink>
            ))}
          </div>
          <SiteLink href={allUrl} className="ln-all ln-mono">
            All recent work →
          </SiteLink>
        </>
      )}

      {state.status === 'ready' && !state.activity && (
        <SiteLink href={GITHUB_PROFILE_URL} className="ln-all ln-mono">
          See all work on GitHub ↗
        </SiteLink>
      )}
    </section>
  );
}
