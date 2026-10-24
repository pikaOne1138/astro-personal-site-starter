// One link guard for block components that take a caller-supplied `href`.
// A link is rendered only when it is a same-site path, an in-page anchor,
// https, mailto or tel. Everything else (javascript:, data:, vbscript:, //host,
// control characters, quotes) is refused and the component renders plain text.
const FORBIDDEN = /["'<>\\\s\u0000-\u001f\u007f]/;
const CONTROL = /[\u0000-\u001f\u007f]/;

export function safeHref(href: unknown): string | undefined {
  if (typeof href !== 'string' || href === '' || FORBIDDEN.test(href)) return undefined;
  let decoded: string;
  try {
    decoded = decodeURIComponent(href);
  } catch {
    return undefined;
  }
  if (CONTROL.test(decoded) || decoded.includes('\\') || decoded.startsWith('//')) return undefined;
  if (href.startsWith('//')) return undefined;
  if (href.startsWith('#') || href.startsWith('/') || href.startsWith('./') || href.startsWith('../')) return href;
  // A bare relative path has no scheme: the first ':' (if any) comes after a '/', '?' or '#'.
  const colon = href.indexOf(':');
  const firstDelimiter = href.search(/[/?#]/);
  if (colon === -1 || (firstDelimiter !== -1 && firstDelimiter < colon)) return href;
  try {
    const u = new URL(href);
    if (u.protocol === 'https:' && u.hostname) return href;
    if (u.protocol === 'mailto:' || u.protocol === 'tel:') return href;
  } catch {
    return undefined;
  }
  return undefined;
}
