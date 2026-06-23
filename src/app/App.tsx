import { QueryClientProvider } from '@tanstack/react-query';
import { App as AntApp, ConfigProvider, Layout, Typography } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import 'antd/dist/reset.css';
import '@/shared/api/httpClient'; // side effect: pin the generated client baseUrl
import { JobsPage } from '@/pages/jobs';
import { ErrorBoundary } from './providers/ErrorBoundary';
import { queryClient } from './store';

const { Header, Content } = Layout;

export function App() {
  return (
    <ErrorBoundary>
      <ConfigProvider locale={ruRU}>
        <QueryClientProvider client={queryClient}>
          <AntApp>
            <Layout style={{ minHeight: '100vh' }}>
              <Header>
                <Typography.Title
                  level={3}
                  style={{ color: '#fff', margin: 0, lineHeight: '64px' }}
                >
                  Проверка URL
                </Typography.Title>
              </Header>
              <Content
                style={{
                  padding: 24,
                  width: '100%',
                  maxWidth: 1200,
                  margin: '0 auto',
                }}
              >
                <JobsPage />
              </Content>
            </Layout>
          </AntApp>
        </QueryClientProvider>
      </ConfigProvider>
    </ErrorBoundary>
  );
}
