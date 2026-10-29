import React from 'react';
import { GITHUB_PROFILE_URL, SHOWCASE } from '../github/data';
import { activityText, titleFromName } from '../github/github.util';
import type { RecentWorkState } from '../github/github.types';
import SiteLink from '../code/SiteLink';

interface RecentWorkSectionProps {
  state: RecentWorkState;
  limit: number;
  allUrl: string;
}

interface SkeletonCardsProps {
  count: number;
}

const SKELETON_TOPICS = [
  'domain-driven-design',
  'event-driven',
  'fastapi',
  'evals',
];

// Cards arrive after mount, so they skip ln-reveal: useReveal only observes nodes present at mount.
export default function RecentWorkSection({
  state,
  limit,
  allUrl,
}: RecentWorkSectionProps) {
  return (
    <section className="ln-section" id="recent">
      <p className="ln-eyebrow ln-mono ln-reveal">Recent work</p>
      <h2 className="ln-h2 ln-display ln-reveal">Built recently.</h2>

      {state.status === 'loading' && (
        <div className="ln-skel" aria-busy="true">
          <p className="ln-activity ln-mono">
            <span className="ln-activity-dot" aria-hidden="true" />
            Loading from GitHub…
          </p>
          <SkeletonCards count={limit} />
          <span className="ln-all ln-mono" aria-hidden="true">
            All recent work →
          </span>
        </div>
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
            {activityText(state.activity)}
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

// Showcase text gives the skeleton the height of the real cards, so content below does not jump when they arrive.
function SkeletonCards({ count }: SkeletonCardsProps) {
  return (
    <div className="ln-grid" aria-hidden="true">
      {SHOWCASE.slice(0, count).map((entry) => (
        <div key={entry.repo} className="ln-card">
          <span className="ln-card-n ln-mono">pushed 7 days ago</span>
          <h3 className="ln-display">{titleFromName(entry.repo)}</h3>
          <p>{entry.tradeoff}</p>
          <span className="ln-card-langs ln-mono">
            {SKELETON_TOPICS.map((t) => (
              <span key={t} className="ln-tone-other">
                {t}
              </span>
            ))}
          </span>
          <span className="ln-card-url ln-mono">
            github.com/nish1013/{entry.repo} ↗
          </span>
        </div>
      ))}
    </div>
  );
}
