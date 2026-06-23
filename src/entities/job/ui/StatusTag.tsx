import { Tag } from 'antd';
import type { JobStatus, UrlStatus } from '../model/status';

type AnyStatus = JobStatus | UrlStatus;

/** Maps every job/url status to a stock Ant Design Tag colour and a ru label. */
const META: Record<AnyStatus, { color: string; label: string }> = {
  pending: { color: 'default', label: 'Ожидает' },
  in_progress: { color: 'processing', label: 'В работе' },
  success: { color: 'success', label: 'Успешно' },
  completed: { color: 'success', label: 'Завершено' },
  error: { color: 'error', label: 'Ошибка' },
  failed: { color: 'error', label: 'Сбой' },
  cancelled: { color: 'default', label: 'Отменено' },
};

export function StatusTag({ status }: { status: AnyStatus }) {
  const meta = META[status] ?? { color: 'default', label: status };
  return (
    <Tag color={meta.color} style={{ margin: 0 }}>
      {meta.label}
    </Tag>
  );
}
