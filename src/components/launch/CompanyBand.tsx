import React, { useEffect, useRef } from 'react';

interface CompanyBandProps {
  companies: string[];
}

export default function CompanyBand({ companies }: CompanyBandProps) {
  const band = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = band.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }
    const names = Array.from(
      el.querySelectorAll<HTMLElement>('.ln-track span')
    );
    let frame = 0;
    let visible = false;

    const highlightCentre = () => {
      const box = el.getBoundingClientRect();
      const centre = box.left + box.width / 2;
      let nearest: HTMLElement | null = null;
      let best = Infinity;
      for (const name of names) {
        const r = name.getBoundingClientRect();
        const distance = Math.abs(r.left + r.width / 2 - centre);
        if (distance < best) {
          best = distance;
          nearest = name;
        }
      }
      for (const name of names)
        name.classList.toggle('ln-centre', name === nearest);
      if (visible) frame = requestAnimationFrame(highlightCentre);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) frame = requestAnimationFrame(highlightCentre);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [companies]);

  return (
    <div className="ln-band ln-reveal" ref={band}>
      <span className="ln-band-label ln-mono">WORKED WITH</span>
      <div className="ln-track ln-display">
        {companies.map((c) => (
          <span key={c}>{c}</span>
        ))}
        {companies.map((c) => (
          <span key={`${c}-loop`} aria-hidden="true">
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
