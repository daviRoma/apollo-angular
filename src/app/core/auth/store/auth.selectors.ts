import { AuthState, initialAuthState } from '../../../state/auth.state';
import { AppState } from '../../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from 'src/app/core/auth/store/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);
