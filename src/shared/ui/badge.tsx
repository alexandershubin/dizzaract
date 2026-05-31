import * as React from 'react';
import { cn } from '@/shared/lib/cn';

type Tone = 'active' | 'expired' | 'disabled';

const tones: Record<Tone, string> = {
  active: 'bg-status-activeBg text-status-activeText',
  expired: 'bg-[rgba(248,113,113,0.6)] md:bg-status-expiredBg text-status-expiredText',
  disabled: 'bg-status-disabledBg text-status-disabledText',
};

export function Badge({
  tone,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone: Tone }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
