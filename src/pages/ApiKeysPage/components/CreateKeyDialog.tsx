import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { API_KEY_NAME_MAX_LENGTH, DEFAULT_EXPIRY_DAYS, EXPIRY_PRESETS } from '@/config/constants';
import { useCreateApiKeyMutation } from '../queries';
import { getErrorMessage } from '@/shared/lib/errors';
import type { CreatedApiKey } from '../types';

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(API_KEY_NAME_MAX_LENGTH, `Up to ${API_KEY_NAME_MAX_LENGTH} characters`),
  expiresIn: z.string(),
});

type FormValues = z.infer<typeof schema>;

export function CreateKeyDialog({
  open,
  onOpenChange,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: (key: CreatedApiKey) => void;
}) {
  const mutation = useCreateApiKeyMutation();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', expiresIn: String(DEFAULT_EXPIRY_DAYS) },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const created = await mutation.mutateAsync({
        name: values.name,
        expiresInDays: values.expiresIn === 'never' ? null : Number(values.expiresIn),
      });
      form.reset();
      onCreated(created);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to create key'));
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create API key</DialogTitle>
          <DialogDescription>Give the key a memorable name and choose an expiry.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="key-name">Name</Label>
            <Input id="key-name" autoFocus placeholder="e.g. production_api_key" {...form.register('name')} />
            {form.formState.errors.name && (
              <p className="text-xs text-status-expiredText">{form.formState.errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="key-expires">Expires in</Label>
            <Select
              value={form.watch('expiresIn')}
              onValueChange={(value) => form.setValue('expiresIn', value, { shouldValidate: true })}
            >
              <SelectTrigger id="key-expires">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {EXPIRY_PRESETS.map((preset) => (
                  <SelectItem key={preset.label} value={preset.days === null ? 'never' : String(preset.days)}>
                    {preset.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Creating…' : 'Create key'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
