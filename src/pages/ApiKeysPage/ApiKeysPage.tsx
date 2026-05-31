import { useCallback } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/shared/ui/button';
import { PageHeader } from './components/PageHeader';
import { EmptyState } from './components/EmptyState';
import { ErrorState } from './components/ErrorState';
import { KeysTable } from './components/KeysTable';
import { KeysList } from './components/KeysList';
import { KeysTableSkeleton } from './components/KeysTableSkeleton';
import { KeysListSkeleton } from './components/KeysListSkeleton';
import { CreateKeyDialog } from './components/CreateKeyDialog';
import { KeyRevealDialog } from './components/KeyRevealDialog';
import { DeleteKeyConfirm } from './components/DeleteKeyConfirm';
import { useApiKeysQuery, useUpdateApiKeyMutation } from './queries';
import { getErrorMessage } from '@/shared/lib/errors';
import { useDialogStack } from '@/shared/lib/useDialogStack';
import type { ApiKey, CreatedApiKey } from './types';

type DialogSchema = {
  create: null;
  reveal: CreatedApiKey;
  delete: ApiKey;
};

export default function ApiKeysPage() {
  const { data, isLoading, isError, error, refetch } = useApiKeysQuery();
  const updateMutation = useUpdateApiKeyMutation();
  const dialogs = useDialogStack<DialogSchema>();

  const openCreate = useCallback(() => dialogs.open('create', null), [dialogs]);

  const handleCreated = useCallback(
    (key: CreatedApiKey) => dialogs.open('reveal', key),
    [dialogs],
  );

  const handleDisable = useCallback(
    async (apiKey: ApiKey) => {
      try {
        await updateMutation.mutateAsync({ id: apiKey.id, changes: { status: 'disabled' } });
        toast.success(`Disabled "${apiKey.name}"`);
      } catch (caught) {
        toast.error(getErrorMessage(caught, 'Failed to disable key'));
      }
    },
    [updateMutation],
  );

  const handleEnable = useCallback(
    async (apiKey: ApiKey) => {
      try {
        await updateMutation.mutateAsync({ id: apiKey.id, changes: { status: 'active' } });
        toast.success(`Enabled "${apiKey.name}"`);
      } catch (caught) {
        toast.error(getErrorMessage(caught, 'Failed to enable key'));
      }
    },
    [updateMutation],
  );

  const handleEdit = useCallback((_apiKey: ApiKey) => {
    toast.info('Edit flow is not implemented in this iteration.');
  }, []);

  const handleAskDelete = useCallback(
    (apiKey: ApiKey) => dialogs.open('delete', apiKey),
    [dialogs],
  );

  return (
    <>
      <PageHeader
        title="API keys"
        subtitle="Manage your API keys to access all models"
        action={
          <Button onClick={openCreate} className="hidden md:inline-flex">
            <Plus className="h-4 w-4" />
            Create API key
          </Button>
        }
      />

      {isLoading && (
        <>
          <KeysTableSkeleton />
          <KeysListSkeleton />
        </>
      )}
      {isError && <ErrorState onRetry={() => refetch()} message={getErrorMessage(error)} />}
      {!isLoading && !isError && data && data.length === 0 && <EmptyState onCreate={openCreate} />}
      {!isLoading && !isError && data && data.length > 0 && (
        <>
          <KeysTable
            keys={data}
            onEdit={handleEdit}
            onDisable={handleDisable}
            onEnable={handleEnable}
            onDelete={handleAskDelete}
          />
          <KeysList
            keys={data}
            onEdit={handleEdit}
            onDisable={handleDisable}
            onEnable={handleEnable}
            onDelete={handleAskDelete}
          />
        </>
      )}

      <button
        type="button"
        onClick={openCreate}
        aria-label="Create API key"
        className="fixed bottom-20 right-4 z-20 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-ink-primary shadow-lg hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 md:hidden"
      >
        <Plus className="h-6 w-6" />
      </button>

      <CreateKeyDialog
        open={dialogs.isOpen('create')}
        onOpenChange={(open) => (open ? dialogs.open('create', null) : dialogs.close())}
        onCreated={handleCreated}
      />
      <KeyRevealDialog keyData={dialogs.payload('reveal')} onClose={dialogs.close} />
      <DeleteKeyConfirm keyData={dialogs.payload('delete')} onClose={dialogs.close} />
    </>
  );
}
