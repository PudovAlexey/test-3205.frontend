import { Progress, Typography } from 'antd';
import type { JobDetailDto } from '@/entities/job';

type ProgressStatus = 'success' | 'exception' | 'active' | 'normal';

function progressStatus(detail: JobDetailDto): ProgressStatus {
  switch (detail.status) {
    case 'completed':
      return 'success';
    case 'failed':
      return 'exception';
    case 'pending':
    case 'in_progress':
      return 'active';
    default:
      return 'normal';
  }
}

export function JobProgress({ detail }: { detail: JobDetailDto }) {
  const total = detail.urls.length;

  // Prefer the server-provided processed count; fall back to deriving it.
  const processed =
    typeof detail.processed === 'number'
      ? detail.processed
      : detail.urls.filter(
          (u) => u.status !== 'pending' && u.status !== 'in_progress',
        ).length;

  const percent =
    total > 0 ? Math.round((Math.min(processed, total) / total) * 100) : 0;

  return (
    <div>
      <Typography.Text type="secondary">
        Обработано {processed} из {total}
      </Typography.Text>
      <Progress percent={percent} status={progressStatus(detail)} />
    </div>
  );
}
