import React from 'react';
import { CodeLanguage, CodeStackGroup } from '../code/code.types';

interface StackSectionProps {
  languages: CodeLanguage[];
  groups: CodeStackGroup[];
}

export default function StackSection({ languages, groups }: StackSectionProps) {
  return (
    <section className="ln-section" id="stack">
      <p className="ln-eyebrow ln-mono ln-reveal">Stack</p>
      <div className="ln-lang-tiles">
        {languages.map((l, i) => (
          <div
            key={l.name}
            className={`ln-lang ln-tone-${l.tone} ln-reveal`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <b className="ln-display">{l.name}</b>
            <span className="ln-mono">{l.uses}</span>
          </div>
        ))}
      </div>
      <div>
        {groups.map((g) => (
          <div key={g.title} className="ln-group ln-reveal">
            <h3 className="ln-mono">{g.title}</h3>
            <div className="ln-tags">
              {g.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
