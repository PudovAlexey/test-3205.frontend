/** Formats an ISO timestamp as ru-RU `dd.MM.yyyy, HH:mm:ss`; passes through on invalid input. */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/** Shortens a (UUID) id to its first 8 characters for compact display. */
export function shortenId(id: string): string {
  if (id.length <= 8) return id;
  return id.slice(0, 8);
}

/** Human-readable duration: `<1000ms` as `N ms`, otherwise `N.Ns`. Null → empty string. */
export function formatDuration(durationMs: number | null): string {
  if (durationMs === null) return '';
  if (durationMs < 1000) return `${durationMs} ms`;
  return `${(durationMs / 1000).toFixed(1)}s`;
}

/** Truncates a URL to `max` chars (default 60), appending an ellipsis when cut. */
export function truncateUrl(url: string, max = 60): string {
  if (url.length <= max) return url;
  return `${url.slice(0, max - 1)}…`;
}
