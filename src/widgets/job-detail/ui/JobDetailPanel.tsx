import { Alert, Card, Descriptions, Empty, Space, Spin, Typography } from 'antd';
import { StatusTag, useActiveJobStore, useJobDetailQuery } from '@/entities/job';
import { CancelJobButton } from '@/features/cancel-job';
import { formatDate, shortenId } from '@/shared/lib/format';
import { JobProgress } from './JobProgress';
import { UrlResultsTable } from './UrlResultsTable';

export function JobDetailPanel() {
  const activeJobId = useActiveJobStore((s) => s.activeJobId);
  const { data: detail, isLoading, isError, error } =
    useJobDetailQuery(activeJobId);

  if (!activeJobId) {
    return (
      <Card>
        <Empty description="Выберите или создайте задание" />
      </Card>
    );
  }

  if (isLoading && !detail) {
    return (
      <Card>
        <Space
          direction="vertical"
          align="center"
          style={{ width: '100%', padding: 32 }}
        >
          <Spin size="large" />
          <Typography.Text type="secondary">Загружаем детали…</Typography.Text>
        </Space>
      </Card>
    );
  }

  if (isError && !detail) {
    return (
      <Card>
        <Alert
          type="error"
          showIcon
          message={(error as Error)?.message ?? 'Не удалось загрузить задание'}
        />
      </Card>
    );
  }

  if (!detail) {
    return (
      <Card>
        <Empty description="Нет данных по заданию" />
      </Card>
    );
  }

  return (
    <Card
      title={
        <Space>
          <span>Задание {shortenId(detail.id)}</span>
          <StatusTag status={detail.status} />
        </Space>
      }
      extra={<CancelJobButton jobId={detail.id} status={detail.status} />}
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Descriptions size="small" column={1} colon={false}>
          <Descriptions.Item label="Создано">
            {formatDate(detail.createdAt)}
          </Descriptions.Item>
          {detail.startedAt && (
            <Descriptions.Item label="Старт">
              {formatDate(detail.startedAt)}
            </Descriptions.Item>
          )}
          {detail.finishedAt && (
            <Descriptions.Item label="Финиш">
              {formatDate(detail.finishedAt)}
            </Descriptions.Item>
          )}
        </Descriptions>

        <JobProgress detail={detail} />
        <UrlResultsTable urls={detail.urls} />
      </Space>
    </Card>
  );
}
