import { navigate } from 'gatsby';
import React from 'react';

interface PostProps {
  title: string;
  uri: string;
}
export default function Post({ title, uri }: PostProps) {
  return (
    <div
      onClick={() => navigate(uri)}
      className="py-3 px-4 my-2 cursor-pointer border border-slate-300 hover:bg-slate-50 hover:border-slate-400 rounded-lg transition-colors text-slate-700"
    >
      <p>{title}</p>
    </div>
  );
}
