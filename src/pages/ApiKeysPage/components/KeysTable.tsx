import type { ApiKey } from '../types';
import { KeyRow } from './KeyRow';

export function KeysTable({
  keys,
  onEdit,
  onDisable,
  onEnable,
  onDelete,
}: {
  keys: ApiKey[];
  onEdit: (apiKey: ApiKey) => void;
  onDisable: (apiKey: ApiKey) => void;
  onEnable: (apiKey: ApiKey) => void;
  onDelete: (apiKey: ApiKey) => void;
}) {
  return (
    <div className="hidden md:block overflow-x-auto rounded-lg border border-line bg-bg-surface shadow-card">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-line text-left text-sm text-ink-secondary">
            <th className="px-4 py-3 font-normal">Name</th>
            <th className="px-4 py-3 font-normal">API key</th>
            <th className="px-4 py-3 font-normal">Status</th>
            <th className="px-4 py-3 font-normal">Expires</th>
            <th className="px-4 py-3 font-normal">Created</th>
            <th className="px-4 py-3 font-normal">Last used</th>
            <th className="px-4 py-3" aria-label="Actions" />
          </tr>
        </thead>
        <tbody>
          {keys.map((apiKey) => (
            <KeyRow
              key={apiKey.id}
              keyData={apiKey}
              onEdit={onEdit}
              onDisable={onDisable}
              onEnable={onEnable}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
