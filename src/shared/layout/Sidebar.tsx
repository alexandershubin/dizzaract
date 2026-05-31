import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '@/config/constants';
import { cn } from '@/shared/lib/cn';
import { useLocalStorageState } from '@/shared/lib/useLocalStorageState';
import { Icon } from '@/shared/ui/icon';

const SECTIONS: { key: 'platform' | 'node' | 'system'; label: string }[] = [
  { key: 'platform', label: 'Platform' },
  { key: 'node', label: 'Node' },
  { key: 'system', label: 'System' },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useLocalStorageState<boolean>('sidebar:collapsed', false);

  return (
    <aside
      className={cn(
        'hidden md:flex shrink-0 flex-col overflow-hidden border-r border-line bg-bg-sidebar text-ink-inverse transition-[width] duration-200',
        collapsed ? 'w-[64px]' : 'w-[240px]',
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between gap-2 py-4 pl-4 transition-[padding] duration-200',
          collapsed ? 'pr-6' : 'pr-4',
        )}
      >
        <img
          src="/logo.svg"
          alt="FA LASS"
          width={74}
          height={32}
          className={cn(
            'h-8 shrink-0 transition-[width,opacity] duration-200',
            collapsed ? 'pointer-events-none w-0 opacity-0' : 'w-[74px] opacity-100',
          )}
        />
        <button
          type="button"
          onClick={() => setCollapsed((current) => !current)}
          className="shrink-0 text-ink-primary"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!collapsed}
        >
          <Icon src="/sidebar/extend.svg" className="h-4 w-4" />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 pb-6">
        {SECTIONS.map((section) => (
          <div key={section.key} className="mt-3">
            <div
              className={cn(
                'px-3 pb-1 text-xs text-ink-muted whitespace-nowrap transition-opacity duration-200',
                collapsed && 'opacity-0',
              )}
            >
              {section.label}
            </div>
            <ul className="space-y-1">
              {NAV_ITEMS.filter((navItem) => navItem.section === section.key).map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    title={collapsed ? item.label : undefined}
                    className={({ isActive }) =>
                      cn(
                        'group flex items-center gap-3 rounded-md px-3 py-2 text-sm text-ink-primary whitespace-nowrap transition-colors',
                        isActive ? 'bg-bg-sidebarHover' : 'hover:bg-bg-sidebarHover',
                      )
                    }
                  >
                    <Icon src={item.iconSrc} className="h-4 w-4 shrink-0" />
                    <span
                      className={cn(
                        'transition-opacity duration-200',
                        collapsed && 'opacity-0',
                      )}
                    >
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
