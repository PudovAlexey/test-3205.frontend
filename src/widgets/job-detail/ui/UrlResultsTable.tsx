import { Table, Typography, type TableColumnsType } from 'antd';
import { StatusTag, type UrlResultDto } from '@/entities/job';
import { formatDuration, truncateUrl } from '@/shared/lib/format';

const columns: TableColumnsType<UrlResultDto> = [
  {
    title: 'URL',
    dataIndex: 'url',
    key: 'url',
    ellipsis: true,
    render: (url: string) => (
      <Typography.Text title={url}>{truncateUrl(url)}</Typography.Text>
    ),
  },
  {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: (status: UrlResultDto['status']) => <StatusTag status={status} />,
  },
  {
    title: 'HTTP',
    dataIndex: 'httpStatus',
    key: 'httpStatus',
    width: 72,
    render: (httpStatus: number | null) => httpStatus ?? '',
  },
  {
    title: 'Ошибка',
    dataIndex: 'error',
    key: 'error',
    render: (err: string | null) =>
      err ? (
        <Typography.Text type="danger" title={err}>
          {err}
        </Typography.Text>
      ) : (
        ''
      ),
  },
  {
    title: 'Время',
    dataIndex: 'durationMs',
    key: 'durationMs',
    width: 88,
    render: (durationMs: number | null) => formatDuration(durationMs),
  },
];

export function UrlResultsTable({ urls }: { urls: UrlResultDto[] }) {
  return (
    <Table<UrlResultDto>
      columns={columns}
      dataSource={urls}
      rowKey="url"
      pagination={false}
      size="small"
      scroll={{ x: 'max-content' }}
    />
  );
}
