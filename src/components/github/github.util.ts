import type {
  Activity,
  GitHubRepo,
  RecentRepo,
  RecentWork,
  RecentWorkOptions,
} from './github.types';

const DAY_MS = 24 * 60 * 60 * 1000;

const LATEST_PUSHES = 3;

export function toRecentWork(
  repos: GitHubRepo[],
  options: RecentWorkOptions
): RecentWork {
  const { now, count, exclude, showcase } = options;
  const excluded = new Set(exclude.map((name) => name.toLowerCase()));
  const rank = new Map(showcase.map((entry, i) => [entry.repo, i]));
  const tradeoffs = new Map(showcase.map((e) => [e.repo, e.tradeoff]));

  const byPush = repos
    .filter((r) => !r.fork && !r.archived && !r.private)
    .filter((r) => !excluded.has(r.name.toLowerCase()))
    .sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
    .slice(0, count)
    .map((r) => toRecentRepo(r, now, tradeoffs.get(r.name)));

  const byShowcase = [...byPush].sort(
    (a, b) => (rank.get(a.name) ?? Infinity) - (rank.get(b.name) ?? Infinity)
  );

  return {
    repos: byShowcase,
    activity: byPush.length
      ? {
          lastPushLabel: byPush[0].pushedLabel,
          latest: byPush.slice(0, LATEST_PUSHES).map((r) => ({
            title: r.title,
            url: r.url,
            pushedLabel: r.pushedLabel,
          })),
        }
      : null,
  };
}

export function activityText(activity: Activity): string {
  return `Last push ${activity.lastPushLabel}`;
}

export function daysAgoLabel(iso: string, now: Date): string {
  const days = Math.round((utcDay(now) - utcDay(new Date(iso))) / DAY_MS);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  return `${days} days ago`;
}

export function titleFromName(name: string): string {
  return name
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) =>
      word.toLowerCase() === 'ai'
        ? 'AI'
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(' ');
}

function toRecentRepo(
  repo: GitHubRepo,
  now: Date,
  tradeoff: string | undefined
): RecentRepo {
  return {
    name: repo.name,
    title: titleFromName(repo.name),
    description: repo.description?.trim() ?? '',
    url: repo.html_url,
    pushedAt: repo.pushed_at,
    pushedLabel: daysAgoLabel(repo.pushed_at, now),
    topics: repo.topics ?? [],
    tradeoff,
    decisionsUrl: tradeoff
      ? `${repo.html_url}/blob/${repo.default_branch}/docs/decisions.md`
      : undefined,
  };
}

function utcDay(date: Date): number {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}
