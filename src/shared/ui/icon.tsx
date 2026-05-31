import { cn } from '@/shared/lib/cn';

export function Icon({ src, className }: { src: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn('inline-block bg-current', className)}
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
      }}
    />
  );
}
