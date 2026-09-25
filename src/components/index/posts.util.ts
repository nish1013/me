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

// Emoji as displayed (incl. ZWJ sequences and flag letters); text-style symbols such as © and ™ are kept.
const EMOJI =
  /(?:\p{Extended_Pictographic}\u{FE0F}|\p{Emoji_Presentation})(?:\u{200D}(?:\p{Extended_Pictographic}\u{FE0F}?|\p{Emoji_Presentation}))*\u{FE0F}?/gu;

export function stripEmoji(text: string): string {
  return text
    .replace(EMOJI, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}
