import { memo } from 'react';
import type { ApiKey } from '../types';
import { effectiveStatus } from '../types';
import { formatExpiresIn, formatRelativePast } from '@/shared/lib/date';
import { StatusBadge } from './StatusBadge';
import { RowActionsMenu } from './RowActionsMenu';

function KeyCardImpl({
  keyData,
  onEdit,
  onDisable,
  onEnable,
  onDelete,
}: {
  keyData: ApiKey;
  onEdit: (apiKey: ApiKey) => void;
  onDisable: (apiKey: ApiKey) => void;
  onEnable: (apiKey: ApiKey) => void;
  onDelete: (apiKey: ApiKey) => void;
}) {
  const status = effectiveStatus(keyData);
  const expires = formatExpiresIn(keyData.expiresAt);

  return (
    <li className="flex items-start justify-between gap-3 rounded-lg border border-line bg-bg-surface p-4 shadow-card">
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <p className="truncate text-sm font-semibold">{keyData.name}</p>
          <p className="font-mono text-sm text-ink-secondary">{keyData.maskedKey}</p>
        </div>
        <p className="mt-1 text-xs text-ink-secondary">
          {expires.label}
          {keyData.lastUsedAt ? `, used ${formatRelativePast(keyData.lastUsedAt)}` : ', never used'}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {status === 'expired' && <StatusBadge status="expired" />}
        <RowActionsMenu
          keyData={keyData}
          onEdit={onEdit}
          onDisable={onDisable}
          onEnable={onEnable}
          onDelete={onDelete}
        />
      </div>
    </li>
  );
}

export const KeyCard = memo(KeyCardImpl);
