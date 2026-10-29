import { useEffect, useState } from 'react';
import type { GitHubRepo, RecentWorkState } from './github.types';
import { toRecentWork } from './github.util';
import { EXCLUDED_REPOS, GITHUB_USER, RECENT_COUNT, SHOWCASE } from './data';

const REPOS_URL = `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=100`;

// Runs in the browser so new repos show without a redeploy.
export function useRecentWork(): RecentWorkState {
  const [state, setState] = useState<RecentWorkState>({ status: 'loading' });

  useEffect(() => {
    const controller = new AbortController();
    fetch(REPOS_URL, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub ${res.status}`);
        return res.json() as Promise<GitHubRepo[]>;
      })
      .then((repos) =>
        setState({
          status: 'ready',
          ...toRecentWork(repos, {
            now: new Date(),
            count: RECENT_COUNT,
            exclude: EXCLUDED_REPOS,
            showcase: SHOWCASE,
          }),
        })
      )
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: 'error' });
      });
    return () => controller.abort();
  }, []);

  return state;
}
