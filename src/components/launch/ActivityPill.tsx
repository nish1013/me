import React, { useEffect, useState } from 'react';
import type { Activity } from '../github/github.types';
import SiteLink from '../code/SiteLink';

interface ActivityPillProps {
  activity: Activity;
}

const ROTATE_MS = 3200;

export default function ActivityPill({ activity }: ActivityPillProps) {
  const [index, setIndex] = useState(0);
  const { latest } = activity;

  useEffect(() => {
    if (latest.length < 2) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }
    const timer = window.setInterval(
      () => setIndex((i) => (i + 1) % latest.length),
      ROTATE_MS
    );
    return () => window.clearInterval(timer);
  }, [latest.length]);

  const push = latest[index % latest.length];

  return (
    <SiteLink href={push.url} className="ln-pill ln-mono">
      <span className="ln-activity-dot" aria-hidden="true" />
      <span>Active on GitHub</span>
      <span className="ln-pill-sep" aria-hidden="true">
        ·
      </span>
      <span key={push.url} className="ln-pill-push">
        {push.title} · pushed {push.pushedLabel}
      </span>
    </SiteLink>
  );
}
