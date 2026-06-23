import { useJobsControllerList } from '@/shared/api/jobs/queries';
import { JOBS_LIST_POLL_MS } from '../lib/pollInterval';

/**
 * Jobs list query. Wraps the generated list hook and polls every 4s so the
 * sidebar stays fresh while jobs progress in the background.
 */
export function useJobsQuery() {
  return useJobsControllerList({}, undefined, {
    refetchInterval: JOBS_LIST_POLL_MS,
  });
}
