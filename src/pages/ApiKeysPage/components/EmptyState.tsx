import { KeyRound } from 'lucide-react';
import { Button } from '@/shared/ui/button';

export function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-line bg-bg-surface py-16 text-center">
      <div className="rounded-full bg-bg-page p-4 text-ink-secondary">
        <KeyRound className="h-6 w-6" />
      </div>
      <div>
        <p className="font-semibold">No API keys yet</p>
        <p className="text-sm text-ink-secondary">Create your first key to access the models.</p>
      </div>
      <Button onClick={onCreate}>Create API key</Button>
    </div>
  );
}
