import { navigate } from 'gatsby';
import React from 'react';

interface CertificationProps {
  title: string;
  uri: string;
}
export default function Portfolio({ title, uri }: CertificationProps) {
  return (
    <div
      onClick={() => navigate(uri)}
      className="flex items-center justify-center h-12 w-full max-w-lg md:max-w-xs mx-auto my-2 cursor-pointer bg-amber-500 hover:bg-amber-400 text-sm text-black font-medium px-6"
    >
      <p>{title}</p>
    </div>
  );
}
