import { isTerminal, type JobStatus } from '../model/status';

/** Jobs list is polled at a steady cadence regardless of any single job's state. */
export const JOBS_LIST_POLL_MS = 4000;
/** Active job detail is polled faster, but only while it can still change. */
export const JOB_DETAIL_POLL_MS = 1500;

/**
 * Decides the detail query's refetch interval from the latest known status.
 *
 * Pure and side-effect-free so the terminal-stop behaviour is unit-testable
 * without React Query: keep polling (1500ms) while unknown or non-terminal,
 * stop (`false`) once the job reaches a terminal status.
 */
export function detailRefetchInterval(
  status: JobStatus | undefined,
): number | false {
  if (!status) return JOB_DETAIL_POLL_MS;
  return isTerminal(status) ? false : JOB_DETAIL_POLL_MS;
}
