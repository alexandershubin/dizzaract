import { useEffect, useRef, useState } from 'react';
import { Copy, Check, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import type { CreatedApiKey } from '../types';

const COPY_RESET_MS = 1500;

export function KeyRevealDialog({
  keyData,
  onClose,
}: {
  keyData: CreatedApiKey | null;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const copyResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyResetTimer.current) clearTimeout(copyResetTimer.current);
    };
  }, []);

  const handleCopy = async () => {
    if (!keyData) return;
    try {
      await navigator.clipboard.writeText(keyData.fullKey);
      setCopied(true);
      toast.success('Key copied to clipboard');
      copyResetTimer.current = setTimeout(() => setCopied(false), COPY_RESET_MS);
    } catch (error) {
      console.warn('Clipboard write failed', error);
      toast.error('Copy failed — copy the key manually');
    }
  };

  return (
    <Dialog open={!!keyData} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your new API key</DialogTitle>
          <DialogDescription>
            For security, this key won't be shown again. Copy it now and store it safely.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2 rounded-md border border-line bg-bg-page px-3 py-2 font-mono text-sm">
          <span className="flex-1 break-all">{keyData?.fullKey}</span>
          <Button type="button" size="icon" variant="ghost" onClick={handleCopy} aria-label="Copy key">
            {copied ? <Check className="h-4 w-4 text-status-activeText" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        <div className="flex items-start gap-2 rounded-md bg-status-expiredBg/50 p-3 text-xs text-status-expiredText">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
          <span>Treat this key like a password. Never commit it to source control or expose it client-side.</span>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
