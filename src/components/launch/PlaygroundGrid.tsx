import React from 'react';
import { CodeLanguage, CodeProject } from '../code/code.types';
import SiteLink from '../code/SiteLink';

interface PlaygroundGridProps {
  projects: CodeProject[];
  languages: CodeLanguage[];
}

export default function PlaygroundGrid({
  projects,
  languages,
}: PlaygroundGridProps) {
  const toneOf = (name: string) =>
    languages.find((l) => l.name === name)?.tone ?? 'other';

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
          {p.languages.length + p.tech.length > 0 && (
            <span className="ln-card-langs ln-mono">
              {p.languages.map((name) => (
                <span key={name} className={`ln-tone-${toneOf(name)}`}>
                  {name}
                </span>
              ))}
              {p.tech.map((name) => (
                <span key={name} className="ln-tone-other">
                  {name}
                </span>
              ))}
            </span>
          )}
          <span className="ln-card-url ln-mono">
            {p.url.replace('https://', '').replace(/\/$/, '')} ↗
          </span>
        </SiteLink>
      ))}
    </div>
  );
}
