import { RefObject, useEffect } from 'react';

// The hero's looping animations cost GPU time on every frame; rest them while the hero is scrolled away.
export function usePauseOffscreen(
  root: RefObject<HTMLElement>,
  watched: RefObject<HTMLElement>
): void {
  useEffect(() => {
    const el = root.current;
    const target = watched.current;
    if (!el || !target) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      el.classList.toggle('ln-paused', !entry.isIntersecting);
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [root, watched]);
}
