import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from '@store';
import { Provider as ReduxProvider } from 'react-redux';
import { App } from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </React.StrictMode>
);
