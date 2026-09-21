import React from 'react';
import { useTheme, type ThemePreference } from './useTheme';

const LABEL: Record<ThemePreference, string> = {
  auto: 'match the system',
  light: 'day',
  dark: 'night',
};

const NEXT: Record<ThemePreference, ThemePreference> = {
  auto: 'light',
  light: 'dark',
  dark: 'auto',
};

function Icon({ preference }: { preference: ThemePreference }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2 as const,
    className: 'h-4 w-4',
    'aria-hidden': true,
  };

  if (preference === 'light') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...common}>
        <circle cx="12" cy="12" r="4" />
        <path strokeLinecap="round" d="M12 3v1.5M12 19.5V21M4.9 4.9l1.1 1.1M18 18l1.1 1.1M3 12h1.5M19.5 12H21M4.9 19.1L6 18M18 6l1.1-1.1" />
      </svg>
    );
  }

  if (preference === 'dark') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z" />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...common}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5a8.5 8.5 0 000 17z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function ThemeControl() {
  const { preference, cycle } = useTheme();

  return (
    <button
      type="button"
      onClick={cycle}
      title={`Appearance: ${LABEL[preference]}`}
      aria-label={`Appearance: ${LABEL[preference]}. Switch to ${LABEL[NEXT[preference]]}.`}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"
    >
      <Icon preference={preference} />
    </button>
  );
}
