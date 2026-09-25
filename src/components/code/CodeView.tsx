import React, { useMemo, useState } from 'react';
import { DEFAULT_VIEW, DIALECTS, PREVIEW, VIEWS } from './code.constants';
import { buildCodeLines } from './code-lines.util';
import { CodeSource, Dialect, View } from './code.types';
import CodeLines from './CodeLines';
import PreviewBody from './PreviewBody';

interface CodeViewProps {
  name: string;
  intro: string;
  photo: string;
  source: CodeSource;
}

interface HeroProps {
  name: string;
  intro: string;
  photo: string;
  dialect: Dialect | null;
}

interface CodeBodyProps {
  dialect: Dialect;
  source: CodeSource;
}

interface GutterProps {
  n?: number;
  align?: string;
}

interface PrefixProps {
  text: string;
}

const HERO_LINES = 4;

// Keeps the doc-comment rows' height in Preview so the hero does not move when switching tabs.
const BLANK = ' ';

export default function CodeView({
  name,
  intro,
  photo,
  source,
}: CodeViewProps) {
  const [view, setView] = useState<View>(DEFAULT_VIEW);
  const dialect = view === 'preview' ? null : DIALECTS[view];

  return (
    <section className="mx-auto max-w-5xl px-3 py-6 md:px-6 md:py-12">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
        <div className="flex border-b border-slate-200 text-xs md:text-[13px]">
          {VIEWS.map((key) => {
            const active = key === view;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={active}
                onClick={() => setView(key)}
                className={`min-h-[44px] border-r border-slate-200 px-4 md:px-6 border-b-2 ${
                  active
                    ? 'border-b-code-prop bg-white text-slate-800'
                    : 'border-b-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {key === 'preview' ? PREVIEW.tab : DIALECTS[key].file}
              </button>
            );
          })}
          <span className="ml-auto hidden items-center px-5 text-slate-500 md:flex">
            {dialect ? dialect.label : PREVIEW.label}
          </span>
        </div>

        <div className="px-4 pb-8 pt-5 text-[13px] leading-[22px] md:px-0 md:pb-9 md:pt-7 md:text-[15px] md:leading-7">
          <Hero name={name} intro={intro} photo={photo} dialect={dialect} />
          {dialect ? (
            <CodeBody dialect={dialect} source={source} />
          ) : (
            <div className="pt-4 md:pl-[4.25rem] md:pr-8">
              <PreviewBody source={source} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Hero({ name, intro, photo, dialect }: HeroProps) {
  const prefix = dialect ? dialect.docPrefix : '';
  return (
    <div className="md:grid md:grid-cols-[3rem_1fr] md:gap-x-5">
      <Gutter n={dialect ? 1 : undefined} />
      <span className="text-code-comment">
        {dialect ? dialect.docOpen : BLANK}
      </span>

      <Gutter n={dialect ? 2 : undefined} align="md:self-center" />
      <span className="flex flex-col gap-3 py-3 md:flex-row md:items-center md:gap-5">
        <Prefix text={prefix} />
        <img
          src={photo}
          alt="Profile Image"
          className="h-20 w-20 rounded-full object-cover md:h-24 md:w-24"
        />
        <h1 className="text-[44px] font-bold leading-none tracking-tight text-slate-900 md:text-6xl">
          {name}
        </h1>
      </span>

      <Gutter n={dialect ? 3 : undefined} align="md:self-baseline" />
      <span className="flex items-baseline pb-3 md:self-baseline">
        <Prefix text={prefix} />
        <span className="max-w-3xl font-intro text-[19px] font-medium leading-normal text-slate-900 md:text-[23px]">
          {intro}
        </span>
      </span>

      <Gutter n={dialect ? 4 : undefined} />
      <span className="mb-4 block text-code-comment md:mb-0">
        {dialect ? dialect.docClose : BLANK}
      </span>
    </div>
  );
}

function CodeBody({ dialect, source }: CodeBodyProps) {
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
    <>
      <div className="hidden md:block">
        <CodeLines lines={wide} numbered />
      </div>
      <div className="md:hidden">
        <CodeLines lines={compact} numbered={false} />
      </div>
    </>
  );
}

function Gutter({ n, align = '' }: GutterProps) {
  return (
    <span
      className={`hidden select-none text-right text-slate-400 md:block ${align}`}
    >
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
