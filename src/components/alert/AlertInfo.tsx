import React from 'react';

interface AlertInfoProps {
  label: string;
  title: string;
  onClick: () => {};
}

export default function AlertInfo({ label, title, onClick }: AlertInfoProps) {
  return (
    <div
      className="py-2 px-4 bg-slate-800 items-center text-slate-200 leading-none flex lg:inline-flex w-full"
      role="alert"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5 text-slate-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
        />
      </svg>
      <span className="ml-2 text-center flex-auto text-sm text-slate-300">
        {title}
      </span>
      <button onClick={() => onClick()}>
        <span className="rounded-md bg-slate-700 hover:bg-slate-600 uppercase px-3 py-1 text-xs font-medium text-slate-200 transition-colors">
          {label}
        </span>
      </button>
    </div>
  );
}
