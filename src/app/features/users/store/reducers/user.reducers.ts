import { UserActionsAll, UserActionTypes } from '../actions/user.actions';
import { initialUserState, UserState, userAdapter} from '../../../../state/user.state';

import { Update } from '@ngrx/entity';
import { from } from 'rxjs';

export function userReducer(state = initialUserState, action: UserActionsAll): UserState {
  switch (action.type) {
    case UserActionTypes.LOADING: {
      return { ...state, loading: true };
    }
    case UserActionTypes.LOAD_SUCCESS: {
      return userAdapter.setAll(action.payload.data, {
        ...state,
        error: false,
        loading: false,
        total: action.payload.data.length,
      });
    }
    case UserActionTypes.LOAD_FAILURE: {
      return userAdapter.removeAll({
        ...state,
        error: true,
        loading: false,
        total: 0,
      });
    }

    case UserActionTypes.LOADONE_SUCCESS: {
      return userAdapter.addOne(
        { ...action.payload.data },
        { ...state }
      );
    }

    case UserActionTypes.NEW: {
      return { ...state, loading: true };
    }
    // case UserActionTypes.NEW_SUCCESS: {
    //   console.log('reducer new success', action.payload);
    //   return state;
    //   // return userAdapter.addOne(
    //   //   { ...action.payload, createDate: new Date() },
    //   //   { ...state }
    //   // );
    // }
    case UserActionTypes.NEW_FAILURE: {
      return state;
    }

    case UserActionTypes.UPDATE: {
      return { ...state, loading: true };
    }
    case UserActionTypes.UPDATE_SUCCESS: {
      return userAdapter.updateOne(
        { id: action.payload.id, changes: action.payload },
        { ...state }
      );
    }
    case UserActionTypes.UPDATE_FAILURE: {
      return state;
    }

    case UserActionTypes.DELETE: {
      return { ...state, loading: true };
    }
    case UserActionTypes.DELETE_SUCCESS: {
      return userAdapter.removeOne(action.payload, { ...state });
    }
    case UserActionTypes.DELETE_FAILURE: {
      return userAdapter.setAll([], {
        ...state,
        error: true,
        loading: false,
        total: 0,
      });
    }
    default:
      return state;
  }
}
