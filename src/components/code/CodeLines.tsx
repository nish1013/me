import React from 'react';
import { TOKEN_CLASS } from './code.constants';
import { CodeLine, Token } from './code.types';
import SiteLink from './SiteLink';

interface CodeLinesProps {
  lines: CodeLine[];
  numbered: boolean;
}

interface CodeTokenProps {
  token: Token;
}

export default function CodeLines({ lines, numbered }: CodeLinesProps) {
  return (
    <>
      {lines.map((line) => (
        <div
          key={line.number}
          className={
            numbered
              ? 'grid grid-cols-[3rem_1fr] gap-x-5 hover:bg-slate-100/60'
              : ''
          }
        >
          {numbered && (
            <span className="select-none text-right text-slate-400">
              {line.number}
            </span>
          )}
          <span className="whitespace-pre-wrap break-words">
            {line.tokens.map((token, i) => (
              <CodeToken key={i} token={token} />
            ))}
          </span>
        </div>
      ))}
    </>
  );
}

function CodeToken({ token }: CodeTokenProps) {
  const className = TOKEN_CLASS[token.kind];
  if (!token.href) return <span className={className}>{token.text}</span>;
  return (
    <SiteLink
      href={token.href}
      className={`${className} underline decoration-dotted underline-offset-4 hover:decoration-solid`}
    >
      {token.text}
    </SiteLink>
  );
}
