import { configureStore } from '@reduxjs/toolkit';
import { middlewares, rootState } from '@states';

export const store = configureStore({
  reducer: rootState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares),
});
