import { RefObject, useEffect } from 'react';

// Hidden-until-visible styling is switched on here (ln-js), so without JS everything stays visible.
export function useReveal(root: RefObject<HTMLElement>): void {
  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    el.classList.add('ln-js');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('ln-in');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    el.querySelectorAll('.ln-reveal').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [root]);
}
