import { MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import type { ApiKey } from '../types';

export function RowActionsMenu({
  keyData,
  open,
  onOpenChange,
  onEdit,
  onDisable,
  onEnable,
  onDelete,
}: {
  keyData: ApiKey;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onEdit: (apiKey: ApiKey) => void;
  onDisable: (apiKey: ApiKey) => void;
  onEnable: (apiKey: ApiKey) => void;
  onDelete: (apiKey: ApiKey) => void;
}) {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="rounded-md p-1.5 text-ink-primary hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          aria-label={`Actions for ${keyData.name}`}
          onClick={(event) => event.stopPropagation()}
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => onEdit(keyData)}>Edit</DropdownMenuItem>
        {keyData.status === 'disabled' ? (
          <DropdownMenuItem onSelect={() => onEnable(keyData)}>Enable</DropdownMenuItem>
        ) : (
          <DropdownMenuItem onSelect={() => onDisable(keyData)}>Disable</DropdownMenuItem>
        )}
        <DropdownMenuItem onSelect={() => onDelete(keyData)}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
