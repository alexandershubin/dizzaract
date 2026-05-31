import { Share2, ArrowUp } from 'lucide-react';
import type { Mode } from '../types';
import { ThinkingAnimation } from './ThinkingAnimation';

export function ChatHeader({
  mode,
  isThinking,
  thinkingStartedAt,
  thinkingDuration,
}: {
  mode: Mode;
  isThinking: boolean;
  thinkingStartedAt: number | null;
  thinkingDuration: number;
}) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-line px-6">
      <div className="flex items-center gap-3 text-sm text-ink-secondary">
        <span>1 000 t/s</span>
        {isThinking && thinkingStartedAt !== null && (
          <ThinkingAnimation
            mode={mode}
            startedAt={thinkingStartedAt}
            durationMs={thinkingDuration}
          />
        )}
        <span className="inline-flex items-center gap-1 text-[#22C55E]">
          <ArrowUp className="h-3.5 w-3.5" />
          20% faster
        </span>
      </div>
      <button
        type="button"
        className="rounded-md p-2 text-ink-secondary hover:bg-white/5 hover:text-ink-primary"
        aria-label="Share chat"
      >
        <Share2 className="h-4 w-4" />
      </button>
    </header>
  );
}
