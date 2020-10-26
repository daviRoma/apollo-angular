/**
 * Auth State interface.
 */
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Auth } from 'src/app/models/auth.model';

export interface AuthState {
  auth: Auth;
  isAuthenticated: boolean;
  error: boolean;
  message: string;
  loading: boolean;
}

export const authAdapter: EntityAdapter<Auth> = createEntityAdapter<Auth>(
  {
    selectId: (auth: Auth) => auth.user.id,
  }
);

export const initialAuthState: AuthState = {
  auth: null,
  isAuthenticated: false,
  error: false,
  message: null,
  loading: false
};
