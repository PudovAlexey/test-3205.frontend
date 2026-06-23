import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateJobForm } from './CreateJobForm';

const { mockMutateAsync } = vi.hoisted(() => ({
  mockMutateAsync: vi.fn(),
}));

vi.mock('../api/useCreateJobMutation', () => ({
  useCreateJobMutation: () => ({
    mutateAsync: mockMutateAsync,
    isPending: false,
    isError: false,
    error: null,
  }),
}));

describe('CreateJobForm', () => {
  beforeEach(() => {
    mockMutateAsync.mockReset();
    mockMutateAsync.mockResolvedValue({ jobId: 'job-1' });
  });

  it('rejects an empty submit without calling the mutation', async () => {
    const user = userEvent.setup();
    render(<CreateJobForm />);

    await user.click(screen.getByRole('button', { name: /Запустить проверку/ }));

    expect(
      await screen.findByText(/Добавьте хотя бы один URL/),
    ).toBeInTheDocument();
    expect(mockMutateAsync).not.toHaveBeenCalled();
  });

  it('parses the textarea, submits the urls, and resets the form on success', async () => {
    const user = userEvent.setup();
    render(<CreateJobForm />);

    const textarea = screen.getByRole('textbox');
    const submit = screen.getByRole('button', { name: /Запустить проверку/ });

    await user.type(textarea, 'https://a.com{enter}  {enter}https://b.com');
    await user.click(submit);

    expect(mockMutateAsync).toHaveBeenCalledWith([
      'https://a.com',
      'https://b.com',
    ]);

    // The form is reset on success, so a follow-up submit has nothing to send
    // and falls through to validation (proves the field was cleared — the form
    // store is the source of truth `onFinish` reads from).
    mockMutateAsync.mockClear();
    await user.click(submit);

    expect(
      await screen.findByText(/Добавьте хотя бы один URL/),
    ).toBeInTheDocument();
    expect(mockMutateAsync).not.toHaveBeenCalled();
  });
});
