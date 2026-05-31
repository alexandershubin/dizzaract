import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { createQueryClient } from '@/config/queryClient';
import ApiKeysPage from '@/pages/ApiKeysPage/ApiKeysPage';
import { db } from '@/mocks/db';
import type { CreateApiKeyDto } from '@/pages/ApiKeysPage/types';

function renderPage() {
  const seedDto: CreateApiKeyDto = { name: 'test_seed_key', expiresInDays: 7 };
  db.create(seedDto);
  const client = createQueryClient();
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <ApiKeysPage />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('ApiKeysPage', () => {
  it('renders the list returned by the API', async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getAllByText('test_seed_key').length).toBeGreaterThan(0);
    });
    expect(screen.getAllByRole('button', { name: /create api key/i }).length).toBeGreaterThan(0);
  });
});
