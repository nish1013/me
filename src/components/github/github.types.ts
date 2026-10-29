export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  default_branch: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  private: boolean;
  topics?: string[];
}

export interface RecentRepo {
  name: string;
  title: string;
  description: string;
  url: string;
  pushedAt: string;
  pushedLabel: string;
  topics: string[];
  tradeoff?: string;
  decisionsUrl?: string;
}

export interface PushRef {
  title: string;
  url: string;
  pushedLabel: string;
}

export interface Activity {
  lastPushLabel: string;
  latest: PushRef[];
}

export interface ShowcaseEntry {
  repo: string;
  tradeoff: string;
}

export interface RecentWork {
  repos: RecentRepo[];
  activity: Activity | null;
}

export interface RecentWorkOptions {
  now: Date;
  count: number;
  exclude: string[];
  showcase: ShowcaseEntry[];
}

export interface LoadingState {
  status: 'loading';
}

export interface ErrorState {
  status: 'error';
}

export interface ReadyState extends RecentWork {
  status: 'ready';
}

export type RecentWorkState = LoadingState | ErrorState | ReadyState;
