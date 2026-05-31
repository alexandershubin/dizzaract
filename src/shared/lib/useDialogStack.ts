import { useCallback, useMemo, useState } from 'react';

type ActiveDialog<Schema> = { key: keyof Schema; payload: Schema[keyof Schema] };

export function useDialogStack<Schema extends Record<string, unknown>>() {
  const [active, setActive] = useState<ActiveDialog<Schema> | null>(null);

  const open = useCallback(<K extends keyof Schema>(key: K, payload: Schema[K]) => {
    setActive({ key, payload });
  }, []);

  const close = useCallback(() => setActive(null), []);

  const isOpen = useCallback(
    <K extends keyof Schema>(key: K) => active?.key === key,
    [active],
  );

  const payload = useCallback(
    <K extends keyof Schema>(key: K): Schema[K] | null =>
      active?.key === key ? (active.payload as Schema[K]) : null,
    [active],
  );

  return useMemo(() => ({ open, close, isOpen, payload }), [open, close, isOpen, payload]);
}
