import { combineReducers as combineStates } from '@reduxjs/toolkit';
import { contactApiClient } from '@apiClients';

export const rootState = combineStates({
  [contactApiClient.reducerPath]: contactApiClient.reducer,
});

export const middlewares = [contactApiClient.middleware];
