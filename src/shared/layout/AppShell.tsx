import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '@/config/constants';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileBottomNav } from './MobileBottomNav';

const FULLSCREEN_ROUTES = new Set<string>([ROUTES.playground]);

export function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  if (FULLSCREEN_ROUTES.has(pathname)) {
    return <div className="h-screen w-full">{children}</div>;
  }

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex-1 px-4 pb-24 pt-4 md:px-8 md:pb-8 md:pt-6">{children}</main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
