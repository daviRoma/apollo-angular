import * as fromActions from './auth.actions';

import { AuthState, initialAuthState } from '../../../state/auth.state';
import { AppState } from 'src/app/state/app.state';

export function reducer(state = initialAuthState, action: fromActions.All): AuthState {
  switch (action.type) {
    case fromActions.AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: {
          id: action.payload.user.id,
          email: action.payload.user.email,
          username: action.payload.user.username,
          firstname: action.payload.user.firstname,
          lastname: action.payload.user.lastname
        },
        role: action.payload.user.role,
        error: null,
      };
    }
    case fromActions.AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        error: true,
      };
    }
    case fromActions.AuthActionTypes.REGISTRATION_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: {
          id: action.payload.user.id,
          email: action.payload.user.email,
          username: action.payload.user.username,
          firstname: action.payload.user.firstname,
          lastname: action.payload.user.lastname,
        },
        role: action.payload.user.role,
        error: null,
      };
    }
    case fromActions.AuthActionTypes.REGISTRATION_FAILURE: {
      return {
        ...state,
        error: true,
      };
    }
    case fromActions.AuthActionTypes.LOGOUT: {
      return initialAuthState;
    }
    default: {
      return state;
    }
  }
}

export const getAuthenticated = (state: AppState) => state.auth.isAuthenticated;
export const getUser = (state: AppState) => state.auth.user;
