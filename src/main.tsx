import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from '@store';
import { Provider as ReduxProvider } from 'react-redux';
import { App } from './App.tsx';
import { isDev } from '@utils';

const main = async () => {
  if (isDev()) {
    const { worker } = await import('./mocks/browser');
    worker.start({ onUnhandledRequest: 'bypass' });
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </React.StrictMode>
  );
};

main();
