import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Result } from 'antd';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title="Что-то пошло не так"
          subTitle="Перезагрузите страницу, чтобы продолжить."
        />
      );
    }
    return this.props.children;
  }
}
