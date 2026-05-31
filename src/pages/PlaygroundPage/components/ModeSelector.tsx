import { Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { MODE_ORDER, MODES } from '../modes';
import type { ModeId } from '../types';

export function ModeSelector({
  value,
  onChange,
}: {
  value: ModeId;
  onChange: (modeId: ModeId) => void;
}) {
  const current = MODES[value];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 rounded-md bg-bg-popover px-3 py-2 text-sm text-ink-primary hover:bg-white/5"
        >
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: current.color }}
            aria-hidden
          />
          {current.label}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[260px]">
        {MODE_ORDER.map((modeId) => {
          const mode = MODES[modeId];
          const isActive = modeId === value;
          return (
            <DropdownMenuItem
              key={mode.id}
              onSelect={() => onChange(mode.id)}
              className="flex items-start gap-2 py-2"
            >
              <img src={mode.iconSrc} alt="" width={20} height={20} className="mt-0.5 h-5 w-5 shrink-0" />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-sm text-ink-primary">{mode.label}</span>
                <span className="text-xs text-ink-secondary">{mode.description}</span>
              </span>
              {isActive && <Check className="mt-1 h-4 w-4 shrink-0 text-ink-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
