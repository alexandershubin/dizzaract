import { useCallback, useEffect, useRef, useState } from 'react';
import { ChatHeader } from './components/ChatHeader';
import { ChatSidebar } from './components/ChatSidebar';
import { ChatMessages } from './components/ChatMessages';
import { ChatInput } from './components/ChatInput';
import { MODES } from './modes';
import { MOCK_MESSAGES } from './mock/seed';
import { pickRandomReply } from './mock/replies';
import type { Message, ModeId } from './types';

const THINKING_MS = 4000;

type ThinkingState = { startedAt: number } | null;

export default function PlaygroundPage() {
  const [modeId, setModeId] = useState<ModeId>('best');
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [thinking, setThinking] = useState<ThinkingState>(null);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (replyTimer.current) clearTimeout(replyTimer.current);
    };
  }, []);

  const handleSend = useCallback(
    (content: string) => {
      const userMessage: Message = {
        id: `m-${Date.now()}`,
        role: 'user',
        content,
        modeId,
      };
      setMessages((previous) => [...previous, userMessage]);
      setThinking({ startedAt: Date.now() });

      if (replyTimer.current) clearTimeout(replyTimer.current);
      replyTimer.current = setTimeout(() => {
        const reply: Message = {
          id: `m-${Date.now() + 1}`,
          role: 'assistant',
          content: pickRandomReply(),
          modeId,
        };
        setMessages((previous) => [...previous, reply]);
        setThinking(null);
        replyTimer.current = null;
      }, THINKING_MS);
    },
    [modeId],
  );

  const isThinking = thinking !== null;

  return (
    <div className="flex h-screen w-full">
      <ChatSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <ChatHeader
          mode={MODES[modeId]}
          isThinking={isThinking}
          thinkingStartedAt={thinking?.startedAt ?? null}
          thinkingDuration={THINKING_MS}
        />
        <ChatMessages messages={messages} isThinking={isThinking} />
        <div className="px-6">
          <ChatInput
            modeId={modeId}
            onModeChange={setModeId}
            onSend={handleSend}
            isThinking={isThinking}
          />
        </div>
        <p className="py-3 text-center text-xs text-ink-muted">
          FARCHAT can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}
