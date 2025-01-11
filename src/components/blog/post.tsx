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
      className="py-2 px-2 my-2 cursor-pointer bg-amber-400 hover:bg-amber-500"
    >
      <p>{title}</p>
    </div>
  );
}
