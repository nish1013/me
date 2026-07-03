import { navigate } from 'gatsby';
import React from 'react';

interface CertificationProps {
  title: string;
  uri: string;
}
export default function Certification({ title, uri }: CertificationProps) {
  return (
    <div
      onClick={() => navigate(uri)}
      className="flex items-center justify-center h-12 w-full max-w-lg md:max-w-xs mx-auto my-2 cursor-pointer border border-slate-300 hover:bg-slate-50 hover:border-slate-400 text-sm text-slate-700 font-medium px-6 rounded-lg transition-colors"
    >
      <p>{title}</p>
    </div>
  );
}
