import { Dialect, Lang, Token, TokenKind } from './code.types';

export const TOKEN_CLASS: Record<TokenKind, string> = {
  keyword: 'text-code-keyword',
  string: 'text-code-string',
  prop: 'text-code-prop',
  fn: 'text-code-fn',
  comment: 'text-code-comment',
  punct: 'text-code-punct',
  plain: 'text-slate-800',
};

const token = (text: string, kind: Token['kind']): Token => ({ text, kind });

const typescript: Dialect = {
  label: 'TypeScript',
  file: 'nish.ts',
  indent: '  ',
  docOpen: '/**',
  docPrefix: ' * ',
  docClose: ' */',
  commentMark: '// ',
  statementEnd: ';',
  groupOpen: '',
  groupClose: '',
  declare: (name) => [
    token('export', 'keyword'),
    token(' ', 'plain'),
    token('const', 'keyword'),
    token(' ', 'plain'),
    token(name, 'prop'),
    token(' = ', 'punct'),
  ],
  quote: (value) => (value.includes("'") ? `"${value}"` : `'${value}'`),
  key: (name) => token(name, 'prop'),
  field: (name) => token(name, 'prop'),
  assign: ': ',
  recordOpen: [token('{ ', 'punct')],
  recordClose: ' },',
  names: {
    building: 'building',
    workedWith: 'workedWith',
    playground: 'playground',
    writing: 'writing',
    elsewhere: 'elsewhere',
  },
};

const python: Dialect = {
  label: 'Python',
  file: 'nish.py',
  indent: '    ',
  docOpen: '"""',
  docPrefix: '',
  docClose: '"""',
  commentMark: '# ',
  statementEnd: '',
  groupOpen: '(',
  groupClose: ')',
  declare: (name) => [token(name, 'prop'), token(' = ', 'punct')],
  quote: (value) => `"${value.replace(/"/g, '\\"')}"`,
  key: (name) => token(`"${name}"`, 'string'),
  field: (name) => token(name, 'prop'),
  assign: '=',
  recordOpen: [token('Project', 'fn'), token('(', 'punct')],
  recordClose: '),',
  names: {
    building: 'building',
    workedWith: 'worked_with',
    playground: 'playground',
    writing: 'writing',
    elsewhere: 'elsewhere',
  },
};

export const DIALECTS: Record<Lang, Dialect> = { ts: typescript, py: python };

export const LANGS: Lang[] = ['ts', 'py'];

export const PLAYGROUND_HINT = 'Live products. Click a name to open it.';
