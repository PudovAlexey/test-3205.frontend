import type { JobStatus, UrlStatus } from '@/shared/api/jobs/requests/types.gen';

export type { JobStatus, UrlStatus };

/** Statuses after which a job no longer changes — polling can stop. */
export const TERMINAL_STATUSES: ReadonlySet<JobStatus> = new Set<JobStatus>([
  'completed',
  'cancelled',
  'failed',
]);

export const isTerminal = (status: JobStatus): boolean =>
  TERMINAL_STATUSES.has(status);
