import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { NotificationsProvider } from '@components';
import { store } from '@store';
import { isDev } from '@utils';
import { App } from './App.tsx';

const main = async () => {
  if (isDev()) {
    const { worker } = await import('./mocks/browser');
    worker.start({ onUnhandledRequest: 'bypass' });
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ReduxProvider store={store}>
        <NotificationsProvider>
          <App />
        </NotificationsProvider>
      </ReduxProvider>
    </React.StrictMode>
  );
};

main();
