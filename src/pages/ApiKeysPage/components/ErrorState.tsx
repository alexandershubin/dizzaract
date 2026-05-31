import { AlertCircle } from 'lucide-react';
import { Button } from '@/shared/ui/button';

export function ErrorState({ onRetry, message }: { onRetry: () => void; message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-line bg-bg-surface py-12 text-center">
      <AlertCircle className="h-6 w-6 text-status-expiredText" />
      <p className="font-medium">Couldn’t load API keys</p>
      {message && <p className="max-w-md text-sm text-ink-secondary">{message}</p>}
      <Button variant="secondary" onClick={onRetry}>
        Retry
      </Button>
    </div>
  );
}
