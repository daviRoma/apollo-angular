import { UserActionsAll, UserActionTypes } from '../actions/user.actions';
import { initialUserState, UserState, userAdapter} from '../../../../state/user.state';

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

    case UserActionTypes.LOADONE: {
      return { ...state, loading: true };
    }

    case UserActionTypes.LOADONE_SUCCESS: {
      return state.total ?
        userAdapter.addOne(
          action.payload.data,
          { ...state, loading: false, error: false, total: state.total }) :
        userAdapter.setOne(action.payload.data, { ...state, loading: false, error: false, total: 1 });
    }

    case UserActionTypes.NEW: {
      return { ...state, loading: true };
    }
    case UserActionTypes.NEW_FAILURE: {
      return { ...state, loading: false, error: true};
    }

    case UserActionTypes.UPDATE: {
      return { ...state, loading: true };
    }
    case UserActionTypes.UPDATE_SUCCESS: {
      return userAdapter.updateOne(
        { id: action.payload.id, changes: action.payload },
        { ...state, loading: false, error: false }
      );
    }
    case UserActionTypes.UPDATE_FAILURE: {
      return { ...state, loading: false, error: true };
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
