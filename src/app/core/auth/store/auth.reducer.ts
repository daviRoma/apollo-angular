import * as fromActions from './auth.actions';

import { AuthState, initialAuthState } from '../../../state/auth.state';
import { AppState } from 'src/app/state/app.state';

export function reducer(state = initialAuthState, action: fromActions.All): AuthState {
  switch (action.type) {
    case fromActions.AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        auth: {
          user: {
            id: action.payload.user.id,
            email: action.payload.user.email,
            username: action.payload.user.username,
            firstname: action.payload.user.firstname,
            lastname: action.payload.user.lastname
          },
          role: action.payload.user.role,
          token: action.payload.token
        },
        error: null,
        errorMessage: null
      };
    }
    case fromActions.AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        error: true,
        errorMessage: action.payload.message,
      };
    }
    case fromActions.AuthActionTypes.REGISTRATION_SUCCESS: {
      return {
        ...state,
        isAuthenticated: false,
        error: null,
        errorMessage: null,
      };
    }
    case fromActions.AuthActionTypes.REGISTRATION_FAILURE: {
      return {
        ...state,
        error: true,
        errorMessage: action.payload.message
      };
    }
    case fromActions.AuthActionTypes.LOGOUT: {
      return initialAuthState;
    }
    case fromActions.AuthActionTypes.LOAD_SESSIONUSER_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        auth: {
          user: {
            id: action.payload.data.id,
            email: action.payload.data.email,
            username: action.payload.data.username,
            firstname: action.payload.data.firstname,
            lastname: action.payload.data.lastname,
            avatar: action.payload.data.avatar
          },
          role: action.payload.data.role,
          token: action.payload.token,
        },
        error: false,
        errorMessage: null
      };
    }
    case fromActions.AuthActionTypes.LOAD_SESSIONUSER_FAILURE: {
      return {
        ...state,
        error: true,
        errorMessage: action.payload.message
      };
    }
    default: {
      return state;
    }
  }
}

export const getAuthenticated = (state: AppState) => state.auth.isAuthenticated;
export const getUser = (state: AppState) => state.auth.auth.user;
