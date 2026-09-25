const NAMED: Record<string, string> = {
  amp: '&',
  quot: '"',
  apos: "'",
  lt: '<',
  gt: '>',
  nbsp: ' ',
};

// WordPress titles arrive HTML-encoded (e.g. &#8217;), but the code view renders them as plain text.
export function decodeEntities(text: string): string {
  return text.replace(
    /&(#x[0-9a-f]+|#\d+|[a-z]+);/gi,
    (match, code: string) => {
      if (code[0] !== '#') return NAMED[code.toLowerCase()] ?? match;
      const point =
        code[1].toLowerCase() === 'x'
          ? parseInt(code.slice(2), 16)
          : parseInt(code.slice(1), 10);
      return Number.isFinite(point) ? String.fromCodePoint(point) : match;
    }
  );
}
