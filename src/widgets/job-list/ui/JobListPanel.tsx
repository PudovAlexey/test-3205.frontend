import { Alert, Card, Empty, List, Space, Spin, theme, Typography } from 'antd';
import {
  StatusTag,
  useActiveJobStore,
  useJobsQuery,
  type JobSummaryDto,
} from '@/entities/job';
import { formatDate, shortenId } from '@/shared/lib/format';

export function JobListPanel() {
  const { token } = theme.useToken();
  const { data, isLoading, isError, error } = useJobsQuery();
  const activeJobId = useActiveJobStore((s) => s.activeJobId);
  const setActiveJob = useActiveJobStore((s) => s.setActiveJob);

  // Backend already returns newest-first; sort defensively to keep it stable.
  const jobs: JobSummaryDto[] = [...(data ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const renderBody = () => {
    if (isError) {
      return (
        <Alert
          type="error"
          showIcon
          message={(error as Error)?.message ?? 'Не удалось загрузить задания'}
        />
      );
    }
    if (isLoading && jobs.length === 0) {
      return (
        <div style={{ textAlign: 'center', padding: 24 }}>
          <Spin />
        </div>
      );
    }
    if (jobs.length === 0) {
      return <Empty description="Заданий пока нет" />;
    }
    return (
      <List
        dataSource={jobs}
        renderItem={(job) => {
          const active = job.id === activeJobId;
          return (
            <List.Item
              onClick={() => setActiveJob(job.id)}
              style={{
                cursor: 'pointer',
                paddingInline: 12,
                borderRadius: token.borderRadius,
                background: active ? token.colorPrimaryBg : undefined,
              }}
            >
              <Space direction="vertical" size={4} style={{ width: '100%' }}>
                <Space
                  style={{ width: '100%', justifyContent: 'space-between' }}
                >
                  <Typography.Text strong>{shortenId(job.id)}</Typography.Text>
                  <StatusTag status={job.status} />
                </Space>
                <Space
                  style={{ width: '100%', justifyContent: 'space-between' }}
                >
                  <Typography.Text type="secondary">
                    {formatDate(job.createdAt)}
                  </Typography.Text>
                  <Typography.Text type="secondary">
                    ✓ {job.stats.success} / ✗ {job.stats.error} из {job.urlCount}
                  </Typography.Text>
                </Space>
              </Space>
            </List.Item>
          );
        }}
      />
    );
  };

  return (
    <Card title="Задания" size="small">
      {renderBody()}
    </Card>
  );
}
