import { Badge } from '@/shared/ui/badge';
import type { ApiKeyStatus } from '../types';
import { statusLabel } from '../types';

export function StatusBadge({ status }: { status: ApiKeyStatus }) {
  const tone = status === 'active' ? 'active' : status === 'expired' ? 'expired' : 'disabled';
  return <Badge tone={tone}>{statusLabel(status)}</Badge>;
}
