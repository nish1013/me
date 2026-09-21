import { useCallback, useEffect, useState } from 'react';

export const THEME_KEY = 'nish-theme';

export type ThemePreference = 'auto' | 'light' | 'dark';

export const THEME_ORDER: ThemePreference[] = ['auto', 'light', 'dark'];

const DARK = '(prefers-color-scheme: dark)';

function readPreference(): ThemePreference {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark' || saved === 'auto') return saved;
  } catch {
    /* storage blocked; auto is a fine answer */
  }
  return 'auto';
}

function resolve(preference: ThemePreference): 'light' | 'dark' {
  if (preference !== 'auto') return preference;
  return window.matchMedia(DARK).matches ? 'dark' : 'light';
}

function paint(preference: ThemePreference): void {
  document.documentElement.setAttribute('data-theme', resolve(preference));
}

export function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>('auto');

  useEffect(() => {
    const saved = readPreference();
    setPreference(saved);
    paint(saved);
  }, []);

  useEffect(() => {
    if (preference !== 'auto') return undefined;
    const media = window.matchMedia(DARK);
    const onChange = () => paint('auto');
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [preference]);

  const choose = useCallback((next: ThemePreference) => {
    setPreference(next);
    paint(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* the choice still holds for this visit */
    }
  }, []);

  const cycle = useCallback(() => {
    const at = THEME_ORDER.indexOf(preference);
    const next = THEME_ORDER[(at + 1) % THEME_ORDER.length];
    choose(next);
  }, [preference, choose]);

  return { preference, cycle };
}
