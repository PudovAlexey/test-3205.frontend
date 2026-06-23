import { QueryClient } from '@tanstack/react-query';

/** Single React Query client for the app. */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
