import { AuthState, initialAuthState } from '../../../state/auth.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.auth ? state.auth.user : null
);

export const selectAuthRole = createSelector(
  selectAuthState,
  (state: AuthState) => (state.auth ? state.auth.role : null)
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectAuth = createSelector(
  selectAuthState,
  (state: AuthState) => state.auth
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const selectAuthMessage = createSelector(
  selectAuthState,
  (state: AuthState) => state.message
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);
