import React from 'react';

interface AlertInfoProps {
  label: string;
  title: string;
  onClick: () => {};
}

export default function AlertInfo({ label, title, onClick }: AlertInfoProps) {
  return (
    <div
      className="flex w-full items-center gap-2 px-4 py-2 bg-band text-band-ink"
      role="alert"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-5 w-5 shrink-0 text-band-ink-muted"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
        />
      </svg>
      <span className="min-w-0 flex-1 text-sm leading-normal text-band-ink-muted">
        {title}
      </span>
      <button type="button" onClick={() => onClick()} className="shrink-0">
        <span className="inline-block rounded-md bg-band-chip px-3 py-1 text-xs font-medium uppercase leading-normal text-band-ink transition-colors hover:bg-band-chip-hover">
          {label}
        </span>
      </button>
    </div>
  );
}
