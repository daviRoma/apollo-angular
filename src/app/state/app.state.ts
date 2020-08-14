/**
 * App state
 */
import { createFeatureSelector } from '@ngrx/store';

import { AuthState } from './auth.state';

import * as auth from 'src/app/core/auth/store/auth.reducer';

export interface AppState {
  auth: AuthState;
}

export const reducers = {
  auth: auth.reducer,
};

export const selectAuthState = createFeatureSelector<AppState>('auth');
