import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/config/queryClient';
import { CreateKeyDialog } from '@/pages/ApiKeysPage/components/CreateKeyDialog';

describe('CreateKeyDialog', () => {
  it('submits the form and calls onCreated with a full key', async () => {
    const onCreated = vi.fn();
    const client = createQueryClient();
    const user = userEvent.setup();

    render(
      <QueryClientProvider client={client}>
        <CreateKeyDialog open onOpenChange={() => undefined} onCreated={onCreated} />
      </QueryClientProvider>,
    );

    await user.type(screen.getByLabelText(/name/i), 'production_key');
    await user.click(screen.getByRole('button', { name: /create key/i }));

    await vi.waitFor(() => {
      expect(onCreated).toHaveBeenCalledTimes(1);
    });

    const arg = onCreated.mock.calls[0][0];
    expect(arg.name).toBe('production_key');
    expect(typeof arg.fullKey).toBe('string');
    expect(arg.fullKey.length).toBeGreaterThan(8);
  });
});
