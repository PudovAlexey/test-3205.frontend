import { useMutation, useQueryClient } from '@tanstack/react-query';
import { jobsControllerCancel } from '@/shared/api/jobs/requests';
import {
  UseJobsControllerGetKeyFn,
  UseJobsControllerListKeyFn,
} from '@/shared/api/jobs/queries';

/**
 * Cancels a job. The endpoint returns the full, updated detail, so we write it
 * straight into the per-id detail cache (matching the query's key) — the
 * detail view flips to `cancelled` immediately and polling stops on the next
 * `refetchInterval` evaluation — then refresh the list.
 */
export function useCancelJobMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await jobsControllerCancel({ path: { id } });
      if (res.error || !res.data) {
        throw new Error('Не удалось отменить задание');
      }
      return res.data;
    },
    onSuccess: (detail) => {
      queryClient.setQueryData(
        UseJobsControllerGetKeyFn({ path: { id: detail.id } }),
        detail,
      );
      queryClient.invalidateQueries({ queryKey: UseJobsControllerListKeyFn() });
    },
  });
}
