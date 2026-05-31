import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { useDeleteApiKeyMutation } from '../queries';
import { getErrorMessage } from '@/shared/lib/errors';
import type { ApiKey } from '../types';

export function DeleteKeyConfirm({
  keyData,
  onClose,
}: {
  keyData: ApiKey | null;
  onClose: () => void;
}) {
  const mutation = useDeleteApiKeyMutation();

  const handleConfirm = async () => {
    if (!keyData) return;
    try {
      await mutation.mutateAsync(keyData.id);
      toast.success(`Deleted "${keyData.name}"`);
      onClose();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to delete key'));
    }
  };

  return (
    <Dialog open={!!keyData} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete API key?</DialogTitle>
          <DialogDescription>
            {keyData ? `"${keyData.name}" will be permanently removed.` : ''} Applications using it will lose access immediately.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose} disabled={mutation.isPending}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={mutation.isPending}>
            {mutation.isPending ? 'Deleting…' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
