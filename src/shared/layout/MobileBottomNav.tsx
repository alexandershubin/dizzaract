import { NavLink } from 'react-router-dom';
import { MOBILE_NAV_ITEMS } from '@/config/constants';
import { cn } from '@/shared/lib/cn';
import { Icon } from '@/shared/ui/icon';

export function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 flex md:hidden h-16 items-stretch border-t border-line bg-bg-surface">
      {MOBILE_NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className="flex flex-1 flex-col items-center justify-center gap-1 text-xs"
        >
          {({ isActive }) => (
            <>
              <span
                className={cn(
                  'flex items-center justify-center rounded-full px-4 py-1 transition-colors',
                  isActive ? 'bg-bg-popover text-ink-primary' : 'text-ink-secondary',
                )}
              >
                <span className="relative">
                  <Icon src={item.iconSrc} className="h-5 w-5" />
                  {item.badge ? (
                    <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[rgba(248,113,113,0.6)] px-1 text-[10px] font-semibold text-ink-primary">
                      {item.badge}
                    </span>
                  ) : null}
                </span>
              </span>
              <span className={isActive ? 'text-ink-primary' : 'text-ink-secondary'}>
                {item.label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
