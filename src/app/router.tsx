import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '@/config/constants';
import { AppShell } from '@/shared/layout/AppShell';
import ComingSoonPage from '@/pages/ComingSoonPage';
import { ApiKeysPage } from '@/pages/ApiKeysPage';

const PlaygroundPage = lazy(() =>
  import('@/pages/PlaygroundPage').then((module) => ({ default: module.PlaygroundPage })),
);

export function AppRoutes() {
  return (
    <AppShell>
      <Routes>
        <Route path={ROUTES.home} element={<Navigate to={ROUTES.apiKeys} replace />} />
        <Route path={ROUTES.apiKeys} element={<ApiKeysPage />} />
        <Route path={ROUTES.models} element={<ComingSoonPage />} />
        <Route path={ROUTES.usage} element={<ComingSoonPage />} />
        <Route path={ROUTES.billing} element={<ComingSoonPage />} />
        <Route
          path={ROUTES.playground}
          element={
            <Suspense fallback={null}>
              <PlaygroundPage />
            </Suspense>
          }
        />
        <Route path={ROUTES.nodeRewards} element={<ComingSoonPage />} />
        <Route path={ROUTES.settings} element={<ComingSoonPage />} />
        <Route path={ROUTES.docs} element={<ComingSoonPage />} />
        <Route path="*" element={<Navigate to={ROUTES.apiKeys} replace />} />
      </Routes>
    </AppShell>
  );
}
