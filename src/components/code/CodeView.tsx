import React, { useMemo, useState } from 'react';
import { DEFAULT_LANG, DIALECTS, LANGS } from './code.constants';
import { buildCodeLines } from './code-lines.util';
import { CodeSource, Dialect, Lang } from './code.types';
import CodeLines from './CodeLines';

interface CodeViewProps {
  name: string;
  intro: string;
  photo: string;
  source: CodeSource;
  onClose: () => void;
}

interface HeroProps {
  name: string;
  intro: string;
  photo: string;
  dialect: Dialect;
}

interface CodeBodyProps {
  dialect: Dialect;
  source: CodeSource;
}

interface GutterProps {
  n: number;
  align?: string;
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
  onClose,
}: CodeViewProps) {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  const dialect = DIALECTS[lang];

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
          <button
            type="button"
            onClick={onClose}
            className="ml-auto min-h-[44px] px-4 text-slate-500 hover:text-slate-800 md:px-5"
          >
            ← Back to page
          </button>
        </div>

        <div className="px-4 pb-8 pt-5 text-[13px] leading-[22px] md:px-0 md:pb-9 md:pt-7 md:text-[15px] md:leading-7">
          <Hero name={name} intro={intro} photo={photo} dialect={dialect} />
          <CodeBody dialect={dialect} source={source} />
        </div>
      </div>
    </section>
  );
}

function Hero({ name, intro, photo, dialect }: HeroProps) {
  return (
    <div className="md:grid md:grid-cols-[3rem_1fr] md:gap-x-5">
      <Gutter n={1} />
      <span className="text-code-comment">{dialect.docOpen}</span>

      <Gutter n={2} align="md:self-center" />
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

      <Gutter n={3} align="md:self-baseline" />
      <span className="flex items-baseline pb-3 md:self-baseline">
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
