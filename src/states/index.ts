import { combineReducers as combineStates } from '@reduxjs/toolkit';
import { contactApiClient } from '@apiClients';
import { appState } from './appState';

export const rootState = combineStates({
  [contactApiClient.reducerPath]: contactApiClient.reducer,
  appState,
});

export const middlewares = [contactApiClient.middleware];
