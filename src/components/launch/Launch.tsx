import React, { useRef } from 'react';
import { CodeSource } from '../code/code.types';
import SiteLink from '../code/SiteLink';
import CompanyBand from './CompanyBand';
import HeroStage from './HeroStage';
import PlaygroundGrid from './PlaygroundGrid';
import StackSection from './StackSection';
import { useReveal } from './useReveal';
import './launch.css';

interface LaunchProps {
  name: string;
  intro: string;
  photo: string;
  source: CodeSource;
  heroCompanies: string[];
  heroTools: string[];
  tickerItems: string[];
  onViewCode: () => void;
}

export default function Launch({
  name,
  intro,
  photo,
  source,
  heroCompanies,
  heroTools,
  tickerItems,
  onViewCode,
}: LaunchProps) {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);
  const ticker = `${tickerItems.join(' · ')} · `;

  return (
    <div className="ln" ref={root}>
      <div className="ln-bg" aria-hidden="true">
        <div className="ln-blob ln-b1" />
        <div className="ln-blob ln-b2" />
        <div className="ln-blob ln-b3" />
      </div>

      <div className="ln-wrap">
        <div className="ln-hero">
          <div>
            <div className="ln-ticker ln-mono">
              <span>{ticker.repeat(2)}</span>
              <span aria-hidden="true">{ticker.repeat(2)}</span>
            </div>
            <h1 className="ln-h1 ln-display">{name}</h1>
            <p className="ln-intro">{intro}</p>
            <p className="ln-tagline">{source.tagline}</p>
            <div className="ln-ctas">
              <a className="ln-btn ln-btn-primary" href="#playground">
                See the playground ↓
              </a>
              <button
                type="button"
                className="ln-btn ln-mono"
                onClick={onViewCode}
              >
                &lt;/&gt; View as code
              </button>
            </div>
          </div>
          <HeroStage
            photo={photo}
            playgroundCount={source.projects.length}
            languages={source.languages}
            companies={heroCompanies}
            tools={heroTools}
          />
        </div>
      </div>

      <CompanyBand companies={source.companies} />

      <div className="ln-wrap">
        <StackSection languages={source.languages} groups={source.stack} />

        <section className="ln-section">
          <p className="ln-eyebrow ln-mono ln-reveal">Writing</p>
          <div className="ln-posts">
            {source.posts.map((post) => (
              <SiteLink
                key={post.url}
                href={post.url}
                className="ln-post ln-reveal"
              >
                <p className="ln-display">{post.title}</p>
                <span className="ln-mono">read →</span>
              </SiteLink>
            ))}
          </div>
          <SiteLink href={source.allPostsUrl} className="ln-all ln-mono">
            All posts →
          </SiteLink>
        </section>

        <section className="ln-section">
          <p className="ln-eyebrow ln-mono ln-reveal">Elsewhere</p>
          <div className="ln-links ln-reveal ln-display">
            {source.links.map((l) => (
              <SiteLink key={l.url} href={l.url}>
                {l.label} <i>↗</i>
              </SiteLink>
            ))}
          </div>
        </section>

        <section className="ln-section" id="playground">
          <p className="ln-eyebrow ln-mono ln-reveal">Playground</p>
          <h2 className="ln-h2 ln-display ln-reveal">
            Playground. Click one to open it.
          </h2>
          <PlaygroundGrid projects={source.projects} />
        </section>

        <p className="ln-foot ln-mono">
          Built with TypeScript, React &amp; Node.js ·{' '}
          <SiteLink href={source.sourceUrl}>View Code ↗</SiteLink>
        </p>
      </div>
    </div>
  );
}
