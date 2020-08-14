/**
 * Auth State interface.
 */
import { User } from '../models/user.model';

export interface AuthState {
  token: string;
  role: Role;
  user: User;
  isAuthenticated: boolean;
  error: boolean;
}

export interface Role {
  name: string;
}

export const initialAuthState: AuthState = {
  token: null,
  role: null,
  user: null,
  isAuthenticated: false,
  error: false
};
