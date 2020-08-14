import * as fromActions from './auth.actions';

import { AuthState, initialAuthState } from '../../../state/auth.state';

export function reducer(state = initialAuthState, action: fromActions.All): AuthState {
  switch (action.type) {
    case fromActions.AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: {
          email: action.payload.user.email,
          username: action.payload.user.username,
          name: action.payload.user.name,
          surname: action.payload.user.surname,
        },
        role: action.payload.role,
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
          email: action.payload.user.email,
          username: action.payload.user.username,
          name: action.payload.user.name,
          surname: action.payload.user.surname,
        },
        role: action.payload.role,
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
