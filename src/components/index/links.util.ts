export function handleFromUrl(url: string): string {
  const segments = new URL(url).pathname.split('/').filter(Boolean);
  return segments[segments.length - 1] ?? url;
}
