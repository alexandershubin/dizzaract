import { memo } from 'react';
import type { ApiKey } from '../types';
import { effectiveStatus } from '../types';
import { formatDate, formatExpiresIn, formatRelativePast } from '@/shared/lib/date';
import { StatusBadge } from './StatusBadge';
import { RowActionsMenu } from './RowActionsMenu';

function KeyRowImpl({
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
    <tr className="border-b border-line transition-colors hover:bg-white/5">
      <td className="px-4 py-3 text-sm">{keyData.name}</td>
      <td className="px-4 py-3 font-mono text-sm">{keyData.maskedKey}</td>
      <td className="px-4 py-3">
        <StatusBadge status={status} />
      </td>
      <td className="px-4 py-3 text-sm">{expires.expired ? '—' : expires.label}</td>
      <td className="px-4 py-3 text-sm">{formatDate(keyData.createdAt)}</td>
      <td className="px-4 py-3 text-sm">
        {keyData.lastUsedAt ? formatRelativePast(keyData.lastUsedAt) : 'Never'}
      </td>
      <td className="px-4 py-3 text-right">
        <RowActionsMenu
          keyData={keyData}
          onEdit={onEdit}
          onDisable={onDisable}
          onEnable={onEnable}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
}

export const KeyRow = memo(KeyRowImpl);
