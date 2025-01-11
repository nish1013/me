import React from 'react';
import { navigate } from 'gatsby';
interface IndexLinkProps {
  url: string;
  text: string;
}
const classBtn =
  'cursor-pointer w-64 self-center bg-amber-400 hover:bg-amber-500 font-bold my-2 py-4 px-4 rounded-full text-center';
export default function IndexLink({ url, text }: IndexLinkProps) {
  return (
    <a href={url} className={classBtn}>
      {text}
    </a>
  );
}
