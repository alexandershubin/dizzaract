import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { createQueryClient } from '@/config/queryClient';
import type { ReactNode } from 'react';

const queryClient = createQueryClient();

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
        <Toaster position="bottom-right" richColors />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
