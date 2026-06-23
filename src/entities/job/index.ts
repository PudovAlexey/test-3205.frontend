// Public API of the `job` entity. Import the entity only through this barrel.

export { StatusTag } from './ui/StatusTag';
export { useActiveJobStore } from './model/activeJobStore';
export { isTerminal, TERMINAL_STATUSES } from './model/status';
export type { JobStatus, UrlStatus } from './model/status';
export {
  detailRefetchInterval,
  JOBS_LIST_POLL_MS,
  JOB_DETAIL_POLL_MS,
} from './lib/pollInterval';
export { useJobsQuery } from './api/useJobsQuery';
export { useJobDetailQuery } from './api/useJobDetailQuery';

// Domain DTO types re-exported from the generated client so consumers depend on
// the entity rather than reaching into `shared/api`.
export type {
  JobSummaryDto,
  JobDetailDto,
  UrlResultDto,
} from '@/shared/api/jobs/requests/types.gen';
