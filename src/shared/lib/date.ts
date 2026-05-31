import { differenceInCalendarDays, formatDistanceToNowStrict, format, isPast, isValid } from 'date-fns';

function parseDate(iso: string): Date | null {
  const date = new Date(iso);
  return isValid(date) ? date : null;
}

export function formatDate(iso: string): string {
  const date = parseDate(iso);
  return date ? format(date, 'dd.MM.yyyy') : '—';
}

export function formatRelativePast(iso: string): string {
  const date = parseDate(iso);
  return date ? `${formatDistanceToNowStrict(date)} ago` : '—';
}

export function formatExpiresIn(iso: string | null): { label: string; expired: boolean } {
  if (iso === null) return { label: 'Never', expired: false };
  const date = parseDate(iso);
  if (!date) return { label: '—', expired: false };
  if (isPast(date)) return { label: 'Expired', expired: true };
  const days = differenceInCalendarDays(date, new Date());
  return { label: `In ${days} day${days === 1 ? '' : 's'}`, expired: false };
}
