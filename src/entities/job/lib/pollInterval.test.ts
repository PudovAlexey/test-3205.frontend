import { describe, expect, it } from 'vitest';
import { detailRefetchInterval, JOB_DETAIL_POLL_MS } from './pollInterval';

describe('detailRefetchInterval', () => {
  it('keeps polling while the status is unknown (first load)', () => {
    expect(detailRefetchInterval(undefined)).toBe(JOB_DETAIL_POLL_MS);
  });

  it('keeps polling for non-terminal statuses', () => {
    expect(detailRefetchInterval('pending')).toBe(JOB_DETAIL_POLL_MS);
    expect(detailRefetchInterval('in_progress')).toBe(JOB_DETAIL_POLL_MS);
  });

  it('stops polling once the job is terminal', () => {
    expect(detailRefetchInterval('completed')).toBe(false);
    expect(detailRefetchInterval('cancelled')).toBe(false);
    expect(detailRefetchInterval('failed')).toBe(false);
  });
});
