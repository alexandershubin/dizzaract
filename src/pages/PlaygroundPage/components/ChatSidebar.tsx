import { MessageSquarePlus, Search, MoreHorizontal, SquarePen } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { MOCK_CHATS } from '../mock/seed';

const GROUP_LABELS: Record<'today' | 'lastMonth', string> = {
  today: 'Today',
  lastMonth: 'Last month',
};

export function ChatSidebar() {
  const today = MOCK_CHATS.filter((chat) => chat.group === 'today');
  const lastMonth = MOCK_CHATS.filter((chat) => chat.group === 'lastMonth');

  return (
    <aside className="flex w-[260px] shrink-0 flex-col border-r border-line bg-bg-page">
      <div className="flex items-center justify-between px-4 py-4">
        <span className="text-base font-semibold tracking-tight text-ink-primary">FAR</span>
        <button
          type="button"
          className="rounded-md p-1.5 text-ink-secondary hover:bg-white/5 hover:text-ink-primary"
          aria-label="New chat"
        >
          <SquarePen className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-col gap-1 px-3">
        <button
          type="button"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-ink-primary hover:bg-white/5"
        >
          <MessageSquarePlus className="h-4 w-4" />
          New Chat
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-ink-secondary hover:bg-white/5"
        >
          <Search className="h-4 w-4" />
          Search Chats
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {([
          ['today', today],
          ['lastMonth', lastMonth],
        ] as const).map(([groupKey, chats]) => {
          if (chats.length === 0) return null;
          return (
            <div key={groupKey} className="mt-4">
              <div className="px-3 pb-1 text-xs text-ink-muted">{GROUP_LABELS[groupKey]}</div>
              <ul className="flex flex-col gap-0.5">
                {chats.map((chat) => (
                  <li key={chat.id}>
                    <button
                      type="button"
                      className={cn(
                        'w-full truncate rounded-md px-3 py-1.5 text-left text-sm transition-colors',
                        chat.active
                          ? 'bg-bg-popover text-ink-primary'
                          : 'text-ink-secondary hover:bg-white/5 hover:text-ink-primary',
                      )}
                    >
                      {chat.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="border-t border-line p-3">
        <div className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-white/5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-semibold text-ink-primary">
            FAR
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-sm text-ink-primary">FAR Designer</span>
            <span className="truncate text-xs text-ink-secondary">far_designer@dizzaract.co…</span>
          </span>
          <button
            type="button"
            className="rounded-md p-1 text-ink-secondary hover:text-ink-primary"
            aria-label="Account menu"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
