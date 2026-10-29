import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { GitHubRepo, RecentWorkOptions } from './github.types';
import {
  activityText,
  daysAgoLabel,
  titleFromName,
  toRecentWork,
} from './github.util.ts';

const NOW = new Date('2026-10-29T12:00:00Z');

const OPTIONS: RecentWorkOptions = {
  now: NOW,
  days: 30,
  exclude: ['me'],
  showcase: [
    { repo: 'risk-segmenter', tradeoff: 'Outbox, not publish-after-commit.' },
    { repo: 'bills', tradeoff: 'Row-level security under the manager.' },
  ],
};

function repo(overrides: Partial<GitHubRepo>): GitHubRepo {
  return {
    name: 'repo',
    description: 'A repo',
    html_url: `https://github.com/nish1013/${overrides.name ?? 'repo'}`,
    default_branch: 'main',
    pushed_at: '2026-10-28T09:00:00Z',
    fork: false,
    archived: false,
    private: false,
    topics: [],
    ...overrides,
  };
}

test('showcase repos come first in showcase order, the rest by newest push', () => {
  const { repos } = toRecentWork(
    [
      repo({ name: 'fresh', pushed_at: '2026-10-29T10:00:00Z' }),
      repo({ name: 'bills', pushed_at: '2026-10-20T10:00:00Z' }),
      repo({ name: 'older', pushed_at: '2026-10-10T10:00:00Z' }),
      repo({ name: 'risk-segmenter', pushed_at: '2026-10-05T10:00:00Z' }),
    ],
    OPTIONS
  );
  assert.deepEqual(
    repos.map((r) => r.name),
    ['risk-segmenter', 'bills', 'fresh', 'older']
  );
});

test('a showcase repo outside the window is not shown', () => {
  const { repos } = toRecentWork(
    [
      repo({ name: 'risk-segmenter', pushed_at: '2026-08-01T10:00:00Z' }),
      repo({ name: 'fresh' }),
    ],
    OPTIONS
  );
  assert.deepEqual(
    repos.map((r) => r.name),
    ['fresh']
  );
});

test('keeps own public repos pushed in the window, newest first', () => {
  const { repos } = toRecentWork(
    [
      repo({ name: 'older', pushed_at: '2026-10-15T09:00:00Z' }),
      repo({ name: 'newer', pushed_at: '2026-10-29T08:00:00Z' }),
    ],
    OPTIONS
  );
  assert.deepEqual(
    repos.map((r) => r.name),
    ['newer', 'older']
  );
});

test('drops forks, archived, private and excluded repos', () => {
  const { repos } = toRecentWork(
    [
      repo({ name: 'viem', fork: true }),
      repo({ name: 'old-thing', archived: true }),
      repo({ name: 'secret', private: true }),
      repo({ name: 'Me' }),
      repo({ name: 'kept' }),
    ],
    OPTIONS
  );
  assert.deepEqual(
    repos.map((r) => r.name),
    ['kept']
  );
});

test('the window is inclusive at exactly 30 days and drops one second more', () => {
  const { repos } = toRecentWork(
    [
      repo({ name: 'edge', pushed_at: '2026-09-29T12:00:00Z' }),
      repo({ name: 'gone', pushed_at: '2026-09-29T11:59:59Z' }),
    ],
    OPTIONS
  );
  assert.deepEqual(
    repos.map((r) => r.name),
    ['edge']
  );
});

test('a repo with a trade-off links to its decisions doc on the default branch', () => {
  const { repos } = toRecentWork(
    [
      repo({ name: 'risk-segmenter', default_branch: 'trunk' }),
      repo({ name: 'plain' }),
    ],
    OPTIONS
  );
  assert.equal(repos[0].tradeoff, 'Outbox, not publish-after-commit.');
  assert.equal(
    repos[0].decisionsUrl,
    'https://github.com/nish1013/risk-segmenter/blob/trunk/docs/decisions.md'
  );
  assert.equal(repos[1].tradeoff, undefined);
  assert.equal(repos[1].decisionsUrl, undefined);
});

test('a null description and missing topics become empty values', () => {
  const { repos } = toRecentWork(
    [repo({ description: null, topics: undefined })],
    OPTIONS
  );
  assert.equal(repos[0].description, '');
  assert.deepEqual(repos[0].topics, []);
});

test('activity counts the recent repos and labels the newest push', () => {
  const { activity } = toRecentWork(
    [
      repo({ name: 'a', pushed_at: '2026-10-27T09:00:00Z' }),
      repo({ name: 'b', pushed_at: '2026-10-28T23:00:00Z' }),
      repo({ name: 'stale', pushed_at: '2026-01-01T00:00:00Z' }),
    ],
    OPTIONS
  );
  assert.equal(activity?.lastPushLabel, 'yesterday');
  assert.equal(activity?.repoCount, 2);
});

test('activity follows push dates, not showcase order, and keeps the latest 3', () => {
  const { activity } = toRecentWork(
    [
      repo({ name: 'risk-segmenter', pushed_at: '2026-10-05T10:00:00Z' }),
      repo({ name: 'd', pushed_at: '2026-10-26T10:00:00Z' }),
      repo({ name: 'c', pushed_at: '2026-10-27T10:00:00Z' }),
      repo({ name: 'b', pushed_at: '2026-10-28T10:00:00Z' }),
      repo({ name: 'a', pushed_at: '2026-10-29T10:00:00Z' }),
    ],
    OPTIONS
  );
  assert.equal(activity?.lastPushLabel, 'today');
  assert.deepEqual(activity?.latest, [
    { title: 'A', url: 'https://github.com/nish1013/a', pushedLabel: 'today' },
    { title: 'B', url: 'https://github.com/nish1013/b', pushedLabel: 'yesterday' },
    { title: 'C', url: 'https://github.com/nish1013/c', pushedLabel: '2 days ago' },
  ]);
});

test('no recent repos gives no activity line', () => {
  const work = toRecentWork(
    [repo({ pushed_at: '2025-01-01T00:00:00Z' })],
    OPTIONS
  );
  assert.deepEqual(work, { repos: [], activity: null });
});

test('days-ago labels count calendar days in UTC', () => {
  assert.equal(daysAgoLabel('2026-10-29T00:01:00Z', NOW), 'today');
  assert.equal(daysAgoLabel('2026-10-28T23:59:00Z', NOW), 'yesterday');
  assert.equal(daysAgoLabel('2026-10-24T12:00:00Z', NOW), '5 days ago');
  assert.equal(daysAgoLabel('2026-10-30T01:00:00Z', NOW), 'today');
});

test('titles split on dashes and keep AI upper case', () => {
  assert.equal(titleFromName('camp-guest-ai-agent'), 'Camp Guest AI Agent');
  assert.equal(titleFromName('ebookdrop'), 'Ebookdrop');
  assert.equal(titleFromName('a--b_c'), 'A B C');
});

test('activity text names the last push and the repo count', () => {
  assert.equal(
    activityText({ lastPushLabel: 'today', repoCount: 6, latest: [] }, 30),
    'Last push today · 6 public repos in the last 30 days'
  );
  assert.equal(
    activityText({ lastPushLabel: '3 days ago', repoCount: 1, latest: [] }, 30),
    'Last push 3 days ago · 1 public repo in the last 30 days'
  );
});
