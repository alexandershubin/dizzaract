import { useState, type FormEvent } from 'react';
import { Plus, ArrowUp, Mic, Square } from 'lucide-react';
import { ModeSelector } from './ModeSelector';
import type { ModeId } from '../types';

export function ChatInput({
  modeId,
  onModeChange,
  onSend,
  isThinking,
}: {
  modeId: ModeId;
  onModeChange: (modeId: ModeId) => void;
  onSend: (content: string) => void;
  isThinking: boolean;
}) {
  const [draft, setDraft] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isThinking) return;
    const trimmed = draft.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setDraft('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-2 flex w-full max-w-3xl flex-col gap-3 rounded-2xl border border-line bg-bg-surface p-3"
    >
      <input
        type="text"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="What's on your mind?"
        disabled={isThinking}
        className="bg-transparent px-2 text-sm text-ink-primary placeholder:text-ink-secondary focus:outline-none disabled:opacity-60"
      />
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="rounded-md p-2 text-ink-secondary hover:bg-white/5 hover:text-ink-primary"
          aria-label="Attach"
        >
          <Plus className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2">
          <ModeSelector value={modeId} onChange={onModeChange} />
          <button
            type="button"
            className="rounded-md p-2 text-ink-secondary hover:bg-white/5 hover:text-ink-primary"
            aria-label="Voice"
          >
            <Mic className="h-4 w-4" />
          </button>
          <button
            type="submit"
            disabled={isThinking}
            className="flex h-8 w-8 items-center justify-center rounded-md bg-bg-page text-ink-primary hover:bg-white/5 disabled:opacity-100"
            aria-label={isThinking ? 'Stop generating' : 'Send'}
          >
            {isThinking ? <Square className="h-3 w-3 fill-current" /> : <ArrowUp className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </form>
  );
}
