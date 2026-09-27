import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { CodeLanguage } from '../code/code.types';
import CountUp from './CountUp';

interface HeroStageProps {
  playgroundCount: number;
  languages: CodeLanguage[];
  companies: string[];
  tools: string[];
}

export default function HeroStage({
  playgroundCount,
  languages,
  companies,
  tools,
}: HeroStageProps) {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }
    const onMove = (e: PointerEvent) => {
      const cx = e.clientX / window.innerWidth - 0.5;
      const cy = e.clientY / window.innerHeight - 0.5;
      stage.current
        ?.querySelectorAll<HTMLElement>('[data-depth]')
        .forEach((chip) => {
          const depth = Number(chip.dataset.depth);
          chip.style.setProperty(
            'translate',
            `${cx * depth}px ${cy * depth}px`
          );
        });
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div className="ln-stage" ref={stage}>
      <div className="ln-ring" />
      <StaticImage
        src="../../images/profile.jpeg"
        alt="Profile Image"
        className="ln-photo"
        width={260}
        height={260}
        layout="constrained"
        loading="eager"
        placeholder="none"
      />
      <div className="ln-chip ln-c1" data-depth="18">
        <span className="ln-dot" />
        <CountUp to={playgroundCount} /> playground apps
      </div>
      <div className="ln-chip ln-c2 ln-langs ln-mono" data-depth="-14">
        {languages.map((l) => (
          <span key={l.name} className={`ln-tone-${l.tone}`}>
            {l.name}
          </span>
        ))}
      </div>
      <div className="ln-chip ln-c3 ln-mono" data-depth="10">
        {companies.join(' · ')}
      </div>
      <div className="ln-chip ln-c4 ln-mono" data-depth="-20">
        {tools.join(' · ')}
      </div>
    </div>
  );
}
