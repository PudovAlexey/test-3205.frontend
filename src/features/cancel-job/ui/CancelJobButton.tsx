import { App, Button, Popconfirm } from 'antd';
import { isTerminal, type JobStatus } from '@/entities/job';
import { useCancelJobMutation } from '../api/useCancelJobMutation';

interface CancelJobButtonProps {
  jobId: string;
  status: JobStatus;
}

/** Cancels the active job. Renders nothing once the job is already terminal. */
export function CancelJobButton({ jobId, status }: CancelJobButtonProps) {
  const { message } = App.useApp();
  const mutation = useCancelJobMutation();

  if (isTerminal(status)) return null;

  const handleConfirm = async () => {
    try {
      await mutation.mutateAsync(jobId);
      message.success('Задание отменено');
    } catch (e) {
      message.error((e as Error)?.message ?? 'Не удалось отменить задание');
    }
  };

  return (
    <Popconfirm
      title="Отменить задание?"
      description="Необработанные URL не будут проверены."
      okText="Отменить"
      cancelText="Назад"
      okButtonProps={{ danger: true }}
      onConfirm={handleConfirm}
    >
      <Button danger loading={mutation.isPending}>
        Отменить задание
      </Button>
    </Popconfirm>
  );
}
