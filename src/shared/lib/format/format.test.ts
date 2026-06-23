import { describe, expect, it } from 'vitest';
import { formatDate, formatDuration, shortenId, truncateUrl } from './format';

describe('shortenId', () => {
  it('keeps short ids intact', () => {
    expect(shortenId('abc')).toBe('abc');
    expect(shortenId('12345678')).toBe('12345678');
  });

  it('trims long ids to 8 chars', () => {
    expect(shortenId('b3f1c2e4-5a6b-7c8d')).toBe('b3f1c2e4');
  });
});

describe('formatDuration', () => {
  it('returns empty string for null', () => {
    expect(formatDuration(null)).toBe('');
  });

  it('renders sub-second durations in ms', () => {
    expect(formatDuration(0)).toBe('0 ms');
    expect(formatDuration(999)).toBe('999 ms');
  });

  it('renders >= 1s durations in seconds with one decimal', () => {
    expect(formatDuration(1000)).toBe('1.0s');
    expect(formatDuration(2500)).toBe('2.5s');
  });
});

describe('truncateUrl', () => {
  it('leaves short urls intact', () => {
    expect(truncateUrl('https://example.com')).toBe('https://example.com');
  });

  it('truncates with an ellipsis past the limit', () => {
    const long = `https://example.com/${'x'.repeat(80)}`;
    const out = truncateUrl(long);
    expect(out).toHaveLength(60);
    expect(out.endsWith('…')).toBe(true);
  });

  it('respects a custom max', () => {
    expect(truncateUrl('abcdef', 4)).toBe('abc…');
  });
});

describe('formatDate', () => {
  it('passes through unparseable input', () => {
    expect(formatDate('not-a-date')).toBe('not-a-date');
  });

  it('formats a valid ISO timestamp without throwing', () => {
    const out = formatDate('2026-06-23T10:00:00.000Z');
    expect(out).not.toBe('2026-06-23T10:00:00.000Z');
    expect(out.length).toBeGreaterThan(0);
  });
});
