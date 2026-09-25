export type Lang = 'ts' | 'py';

export type TokenKind =
  | 'keyword'
  | 'string'
  | 'prop'
  | 'fn'
  | 'comment'
  | 'punct'
  | 'plain';

export interface Token {
  text: string;
  kind: TokenKind;
  href?: string;
}

export interface CodeLine {
  number: number;
  tokens: Token[];
}

export interface CodeProject {
  name: string;
  does: string;
  url: string;
}

export interface CodePost {
  title: string;
  url: string;
}

export interface CodeLink {
  key: string;
  handle: string;
  url: string;
}

export interface CodeSource {
  tagline: string;
  companies: string[];
  projects: CodeProject[];
  posts: CodePost[];
  allPostsUrl: string;
  links: CodeLink[];
  sourceUrl: string;
}

export interface CodeLayout {
  compact: boolean;
  firstLine: number;
}

export interface Dialect {
  label: string;
  file: string;
  indent: string;
  docOpen: string;
  docPrefix: string;
  docClose: string;
  commentMark: string;
  statementEnd: string;
  groupOpen: string;
  groupClose: string;
  declare: (name: string) => Token[];
  quote: (value: string) => string;
  key: (name: string) => Token;
  field: (name: string) => Token;
  assign: string;
  recordOpen: Token[];
  recordClose: string;
  names: DialectNames;
}

export interface DialectNames {
  building: string;
  workedWith: string;
  playground: string;
  writing: string;
  elsewhere: string;
}
