import { navigate } from 'gatsby';
import React from 'react';

interface PortfolioProps {
  title: string;
  hint?: string;
  uri: string;
  icon?: string;
}

export default function Portfolio({ title, hint, uri, icon }: PortfolioProps) {
  return (
    <div
      onClick={() => navigate(uri)}
      className="flex items-start gap-3 w-full max-w-lg md:max-w-xs mx-auto my-2 cursor-pointer border border-slate-300 hover:bg-slate-50 hover:border-slate-400 px-5 py-3 rounded-lg transition-colors"
    >
      {icon && (
        <span aria-hidden="true" className="leading-6">
          {icon}
        </span>
      )}
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-700 leading-6">{title}</p>
        {hint && <p className="text-xs text-slate-500 mt-0.5">{hint}</p>}
      </div>
    </div>
  );
}
