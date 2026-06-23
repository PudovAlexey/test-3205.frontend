import { Card, Col, Row, Space } from 'antd';
import { CreateJobForm } from '@/features/create-job';
import { JobListPanel } from '@/widgets/job-list';
import { JobDetailPanel } from '@/widgets/job-detail';

/** The single screen: composition only — left column = create + list, right = detail. */
export function JobsPage() {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={9}>
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <Card size="small">
            <CreateJobForm />
          </Card>
          <JobListPanel />
        </Space>
      </Col>
      <Col xs={24} md={15}>
        <JobDetailPanel />
      </Col>
    </Row>
  );
}
