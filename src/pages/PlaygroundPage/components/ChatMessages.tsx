import { cn } from '@/shared/lib/cn';
import type { Message } from '../types';

export function ChatMessages({
  messages,
  isThinking,
}: {
  messages: Message[];
  isThinking: boolean;
}) {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">
      <ul className="mx-auto flex max-w-3xl flex-col gap-4">
        {messages.map((message) => (
          <li
            key={message.id}
            className={cn(
              'flex',
              message.role === 'user' ? 'justify-end' : 'justify-start',
            )}
          >
            <div
              className={cn(
                'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm',
                message.role === 'user'
                  ? 'bg-bg-popover text-ink-primary'
                  : 'text-ink-primary',
              )}
            >
              {message.content}
            </div>
          </li>
        ))}
        {isThinking && (
          <li className="flex justify-start">
            <span className="text-sm text-ink-secondary">Thinking...</span>
          </li>
        )}
      </ul>
    </div>
  );
}
