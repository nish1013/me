import React, { useMemo, useState } from 'react';
import { DIALECTS, LANGS } from './code.constants';
import { buildCodeLines } from './code-lines.util';
import { CodeSource, Lang } from './code.types';
import CodeLines from './CodeLines';

interface CodeViewProps {
  name: string;
  intro: string;
  photo: string;
  source: CodeSource;
}

interface GutterProps {
  n: number;
}

interface PrefixProps {
  text: string;
}

const HERO_LINES = 4;

export default function CodeView({
  name,
  intro,
  photo,
  source,
}: CodeViewProps) {
  const [lang, setLang] = useState<Lang>('ts');
  const dialect = DIALECTS[lang];

  const wide = useMemo(
    () =>
      buildCodeLines(dialect, source, {
        compact: false,
        firstLine: HERO_LINES + 1,
      }),
    [dialect, source]
  );
  const compact = useMemo(
    () => buildCodeLines(dialect, source, { compact: true, firstLine: 1 }),
    [dialect, source]
  );

  return (
    <section className="mx-auto max-w-5xl px-3 py-6 md:px-6 md:py-12">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
        <div className="flex border-b border-slate-200 text-xs md:text-[13px]">
          {LANGS.map((key) => {
            const active = key === lang;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={active}
                onClick={() => setLang(key)}
                className={`min-h-[44px] border-r border-slate-200 px-4 md:px-6 border-b-2 ${
                  active
                    ? 'border-b-code-prop bg-white text-slate-800'
                    : 'border-b-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {DIALECTS[key].file}
              </button>
            );
          })}
          <span className="ml-auto hidden items-center px-5 text-slate-500 md:flex">
            {dialect.label}
          </span>
        </div>

        <div className="px-4 pb-8 pt-5 text-[13px] leading-[22px] md:px-0 md:pb-9 md:pt-7 md:text-[15px] md:leading-7">
          <div className="md:grid md:grid-cols-[3rem_1fr] md:gap-x-5">
            <Gutter n={1} />
            <span className="text-code-comment">{dialect.docOpen}</span>

            <Gutter n={2} />
            <span className="flex flex-col gap-3 py-3 md:flex-row md:items-center md:gap-5">
              <Prefix text={dialect.docPrefix} />
              <img
                src={photo}
                alt="Profile Image"
                className="h-20 w-20 rounded-full object-cover md:h-24 md:w-24"
              />
              <h1 className="text-[44px] font-bold leading-none tracking-tight text-slate-900 md:text-6xl">
                {name}
              </h1>
            </span>

            <Gutter n={3} />
            <span className="flex pb-3">
              <Prefix text={dialect.docPrefix} />
              <span className="max-w-3xl font-intro text-[19px] font-medium leading-normal text-slate-900 md:text-[23px]">
                {intro}
              </span>
            </span>

            <Gutter n={4} />
            <span className="mb-4 block text-code-comment md:mb-0">
              {dialect.docClose}
            </span>
          </div>

          <div className="hidden md:block">
            <CodeLines lines={wide} numbered />
          </div>
          <div className="md:hidden">
            <CodeLines lines={compact} numbered={false} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Gutter({ n }: GutterProps) {
  return (
    <span className="hidden select-none text-right text-slate-400 md:block">
      {n}
    </span>
  );
}

function Prefix({ text }: PrefixProps) {
  if (!text) return null;
  return (
    <span className="hidden whitespace-pre text-code-comment md:inline">
      {text}
    </span>
  );
}
