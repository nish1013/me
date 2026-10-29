import type { ShowcaseEntry } from './github.types';

export const GITHUB_USER = 'nish1013';

export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USER}`;

export const RECENT_DAYS = 30;

export const EXCLUDED_REPOS = ['me', GITHUB_USER];

export const SHOWCASE: ShowcaseEntry[] = [
  {
    repo: 'bill-exception-ai-agent',
    tradeoff:
      'Row-level security under a tenant-scoped manager. One missing filter in code does not leak rows.',
  },
  {
    repo: 'event-driven-risk-segmenter',
    tradeoff:
      'Transactional outbox, not publish-after-commit. A crash between commit and publish cannot lose an event.',
  },
  {
    repo: 'camp-guest-ai-agent',
    tradeoff:
      'A code rule, not the LLM, catches life-safety words. An emergency reply never waits on a model verdict.',
  },
  {
    repo: 'nish-odometer-service',
    tradeoff:
      'Not sure means an error, never a guess. Blur is checked in code, not left to the model.',
  },
  {
    repo: 'ebookdrop',
    tradeoff:
      'Sandboxed conversion with a timeout and a content type check. A malformed file cannot attack the converter.',
  },
  {
    repo: 'ai-news-ingest-service',
    tradeoff:
      'One article per canonical URL, no title-similarity dedup. A short title cannot merge two stories.',
  },
];
