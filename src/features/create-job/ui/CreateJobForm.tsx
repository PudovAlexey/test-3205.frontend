import { Alert, Button, Form, Input, Typography } from 'antd';
import { useCreateJobMutation } from '../api/useCreateJobMutation';
import { parseUrls } from '../model/parseUrls';

const { TextArea } = Input;
const PLACEHOLDER = 'https://example.com\nhttps://nestjs.com';

interface FormValues {
  urls?: string;
}

export function CreateJobForm() {
  const [form] = Form.useForm<FormValues>();
  const mutation = useCreateJobMutation();

  const handleFinish = async ({ urls }: FormValues) => {
    const list = parseUrls(urls ?? '');
    if (list.length === 0) {
      form.setFields([
        {
          name: 'urls',
          errors: ['Добавьте хотя бы один URL — по одному в строке.'],
        },
      ]);
      return;
    }

    try {
      await mutation.mutateAsync(list);
      form.resetFields(); // clear the textarea only on success
    } catch {
      // failure is surfaced by the Alert below (mutation.error)
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      requiredMark={false}
    >
      <Typography.Title level={4} style={{ marginTop: 0 }}>
        Новое задание
      </Typography.Title>

      <Form.Item name="urls" label="URL-адреса (по одному в строке)">
        <TextArea rows={6} placeholder={PLACEHOLDER} spellCheck={false} />
      </Form.Item>

      {mutation.isError && (
        <Form.Item>
          <Alert
            type="error"
            showIcon
            message={(mutation.error as Error)?.message ?? 'Ошибка'}
          />
        </Form.Item>
      )}

      <Form.Item style={{ marginBottom: 0 }}>
        <Button
          type="primary"
          htmlType="submit"
          loading={mutation.isPending}
          block
        >
          Запустить проверку
        </Button>
      </Form.Item>
    </Form>
  );
}
