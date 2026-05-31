import type { ApiKey } from '../types';
import { KeyCard } from './KeyCard';

export function KeysList({
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
    <ul className="flex md:hidden flex-col gap-3">
      {keys.map((apiKey) => (
        <KeyCard
          key={apiKey.id}
          keyData={apiKey}
          onEdit={onEdit}
          onDisable={onDisable}
          onEnable={onEnable}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
