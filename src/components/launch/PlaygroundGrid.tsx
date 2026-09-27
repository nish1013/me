import React from 'react';
import { CodeProject } from '../code/code.types';
import SiteLink from '../code/SiteLink';

interface PlaygroundGridProps {
  projects: CodeProject[];
}

export default function PlaygroundGrid({ projects }: PlaygroundGridProps) {
  const trackPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>('.ln-card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--x', `${e.clientX - r.left}px`);
    card.style.setProperty('--y', `${e.clientY - r.top}px`);
  };

  return (
    <div className="ln-grid" onPointerMove={trackPointer}>
      {projects.map((p, i) => (
        <SiteLink
          key={p.url}
          href={p.url}
          className="ln-card ln-reveal"
          style={{ transitionDelay: `${(i % 3) * 80}ms` }}
        >
          <span className="ln-card-n ln-mono">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="ln-display">{p.name}</h3>
          <p>{p.does}</p>
          <span className="ln-card-url ln-mono">
            {p.url.replace('https://', '').replace(/\/$/, '')} ↗
          </span>
        </SiteLink>
      ))}
    </div>
  );
}
