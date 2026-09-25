import { PLAYGROUND_HINT } from './code.constants';
import { CodeLayout, CodeLine, CodeSource, Dialect, Token } from './code.types';

export function buildCodeLines(
  dialect: Dialect,
  source: CodeSource,
  layout: CodeLayout
): CodeLine[] {
  const lines: Token[][] = [];
  const add = (...tokens: Token[]) =>
    lines.push(tokens.length ? tokens : [plain(' ')]);
  const { indent, quote } = dialect;
  const end = (bracket: string) => punct(bracket + dialect.statementEnd);

  add(...dialect.declare(dialect.names.building), punct(dialect.groupOpen));
  add(plain(indent), str(quote(source.tagline)), punct(dialect.statementEnd));
  if (dialect.groupClose) add(punct(dialect.groupClose));
  add();

  add(...dialect.declare(dialect.names.workedWith), punct('['));
  for (const group of companyRows(source.companies, layout.compact)) {
    add(
      plain(indent),
      ...group.flatMap((name) => [str(quote(name)), punct(', ')])
    );
  }
  add(end(']'));
  add();

  add(comment(dialect, PLAYGROUND_HINT));
  add(...dialect.declare(dialect.names.playground), punct('['));
  const width = Math.max(...source.projects.map((p) => p.name.length));
  for (const project of source.projects) {
    const name = str(quote(project.name), project.url);
    const does = str(quote(project.does));
    if (layout.compact) {
      add(plain(indent), ...dialect.recordOpen.map(trimEnd));
      add(
        plain(indent + indent),
        dialect.field('name'),
        punct(dialect.assign),
        name,
        punct(',')
      );
      add(
        plain(indent + indent),
        dialect.field('does'),
        punct(dialect.assign),
        does,
        punct(',')
      );
      add(plain(indent), punct(dialect.recordClose.trim()));
    } else {
      const pad = ' '.repeat(width - project.name.length);
      add(
        plain(indent),
        ...dialect.recordOpen,
        dialect.field('name'),
        punct(dialect.assign),
        name,
        punct(', ' + pad),
        dialect.field('does'),
        punct(dialect.assign),
        does,
        punct(dialect.recordClose)
      );
    }
  }
  add(end(']'));
  add();

  add(...dialect.declare(dialect.names.writing), punct('['), plain('  '), {
    text: dialect.commentMark + 'All posts ↗',
    kind: 'comment',
    href: source.allPostsUrl,
  });
  for (const post of source.posts)
    add(plain(indent), str(quote(post.title), post.url), punct(','));
  add(end(']'));
  add();

  add(...dialect.declare(dialect.names.elsewhere), punct('{'));
  for (const link of source.links) {
    add(
      plain(indent),
      dialect.key(link.key),
      punct(': '),
      str(quote(link.handle), link.url),
      punct(',')
    );
  }
  add(end('}'));
  add();

  add(comment(dialect, 'Built with TypeScript, React & Node.js · '), {
    text: 'View Code ↗',
    kind: 'comment',
    href: source.sourceUrl,
  });

  return lines.map((tokens, i) => ({ number: layout.firstLine + i, tokens }));
}

function companyRows(companies: string[], compact: boolean): string[][] {
  if (compact) return companies.map((name) => [name]);
  const half = Math.ceil(companies.length / 2);
  return [companies.slice(0, half), companies.slice(half)];
}

function trimEnd(token: Token): Token {
  return { ...token, text: token.text.trimEnd() };
}

function comment(dialect: Dialect, text: string): Token {
  return { text: dialect.commentMark + text, kind: 'comment' };
}

function str(text: string, href?: string): Token {
  return href ? { text, kind: 'string', href } : { text, kind: 'string' };
}

function punct(text: string): Token {
  return { text, kind: 'punct' };
}

function plain(text: string): Token {
  return { text, kind: 'plain' };
}
