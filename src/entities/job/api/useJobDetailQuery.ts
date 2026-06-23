import { useJobsControllerGet } from '@/shared/api/jobs/queries';
import { detailRefetchInterval } from '../lib/pollInterval';

/**
 * Active job detail query. Wraps the generated detail hook with:
 *  - `enabled: !!id` so nothing is fetched without an active job;
 *  - a dynamic `refetchInterval` that polls every 1.5s while the job can still
 *    change and stops once it reaches a terminal status.
 *
 * Stale-response safety comes for free: the query key is per-id, so a late
 * response for a previously-selected job lands under its own key and never
 * touches the currently-active view.
 */
export function useJobDetailQuery(id: string | null) {
  return useJobsControllerGet({ path: { id: id ?? '' } }, undefined, {
    enabled: !!id,
    refetchInterval: (query) => detailRefetchInterval(query.state.data?.status),
  });
}
