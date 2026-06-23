import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActiveJobStore } from '@/entities/job';
import { jobsControllerCreate } from '@/shared/api/jobs/requests';
import { UseJobsControllerListKeyFn } from '@/shared/api/jobs/queries';

/**
 * Creates a job from a list of URLs, makes the returned jobId the active job,
 * and refreshes the jobs list.
 */
export function useCreateJobMutation() {
  const queryClient = useQueryClient();
  const setActiveJob = useActiveJobStore((s) => s.setActiveJob);

  return useMutation({
    mutationFn: async (urls: string[]) => {
      const res = await jobsControllerCreate({ body: { urls } });
      if (res.error || !res.data) {
        throw new Error('Не удалось создать задание');
      }
      return res.data;
    },
    onSuccess: (data) => {
      setActiveJob(data.jobId);
      queryClient.invalidateQueries({ queryKey: UseJobsControllerListKeyFn() });
    },
  });
}
