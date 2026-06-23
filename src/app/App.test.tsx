import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from './App';

// Stub the entity query hooks so the smoke test exercises the full provider
// tree (ConfigProvider > QueryClient > Ant App > Layout > page > widgets)
// without making any network calls.
vi.mock('@/entities/job', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/entities/job')>()),
  useJobsQuery: () => ({ data: [], isLoading: false, isError: false }),
  useJobDetailQuery: () => ({
    data: undefined,
    isLoading: false,
    isError: false,
  }),
}));

describe('App', () => {
  it('mounts the full provider tree and renders the page', () => {
    render(<App />);

    expect(screen.getByText('Проверка URL')).toBeInTheDocument();
    expect(screen.getByText('Новое задание')).toBeInTheDocument();
    expect(
      screen.getByText('Выберите или создайте задание'),
    ).toBeInTheDocument();
  });
});
