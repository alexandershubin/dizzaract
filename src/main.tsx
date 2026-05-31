import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { AppProviders } from './app/providers';
import { env } from './config/env';
import './index.css';

async function enableMocking() {
  if (!env.enableMocks) return;
  const { worker } = await import('./mocks/browser');
  await worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: { url: '/mockServiceWorker.js' },
  });
}

function mount() {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>,
  );
}

enableMocking()
  .catch((err) => console.error('[MSW] failed to start, mounting without mocks', err))
  .finally(mount);
