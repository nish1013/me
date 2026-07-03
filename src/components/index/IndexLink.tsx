import React from 'react';

interface IndexLinkProps {
  url: string;
  text: string;
}

export default function IndexLink({ url, text }: IndexLinkProps) {
  return (
    <a
      href={url}
      className="w-56 text-center py-3 px-4 my-1.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-400 transition-colors duration-200"
    >
      {text}
    </a>
  );
}
