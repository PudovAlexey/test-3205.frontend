/** Splits textarea content into a trimmed, non-empty list of URLs (one per line). */
export function parseUrls(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}
