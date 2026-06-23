import { describe, expect, it } from 'vitest';
import { parseUrls } from './parseUrls';

describe('parseUrls', () => {
  it('splits on newlines, trims, and drops empty lines', () => {
    expect(parseUrls('https://a.com\n  \nhttps://b.com  ')).toEqual([
      'https://a.com',
      'https://b.com',
    ]);
  });

  it('returns an empty array for blank input', () => {
    expect(parseUrls('   \n\n')).toEqual([]);
  });
});
