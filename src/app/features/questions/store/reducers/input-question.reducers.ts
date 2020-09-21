import {
  QuestionState,
  initialQuestionState,
  questionAdapter,
} from '../../../../state/question.state';
import { InputQuestionActionsAll, InputQuestionActionTypes } from '../actions/input-question.actions';

export function inputQuestionReducer(
  state = initialQuestionState,
  action: InputQuestionActionsAll
): QuestionState {
  switch (action.type) {
    case InputQuestionActionTypes.LOADING: {
      return { ...state, loading: true };
    }
    case InputQuestionActionTypes.LOAD_SUCCESS: {
      const questions = action.payload.data.map((question) => ({ ...question }));
      return questionAdapter.setAll(questions, {
        ...state,
        error: false,
        loading: false,
        total: action.payload.data.length,
      });
    }
    case InputQuestionActionTypes.LOAD_FAILURE: {
      return questionAdapter.removeAll({
        ...state,
        error: true,
        loading: false,
        total: 0,
      });
    }

    case InputQuestionActionTypes.LOADONE_SUCCESS: {
      return questionAdapter.addOne(
        { ...action.payload.data },
        { ...state }
      );
    }

    case InputQuestionActionTypes.NEW: {
      return { ...state, loading: true };
    }
    case InputQuestionActionTypes.NEW_FAILURE: {
      return state;
    }

    case InputQuestionActionTypes.UPDATE: {
      return { ...state, loading: true };
    }
    case InputQuestionActionTypes.UPDATE_SUCCESS: {
      return questionAdapter.updateOne(
        { id: action.payload.id, changes: action.payload },
        { ...state }
      );
    }
    case InputQuestionActionTypes.UPDATE_FAILURE: {
      return state;
    }

    case InputQuestionActionTypes.DELETE: {
      return { ...state, loading: true };
    }
    case InputQuestionActionTypes.DELETE_SUCCESS: {
      return questionAdapter.removeOne(action.payload, { ...state });
    }
    case InputQuestionActionTypes.DELETE_FAILURE: {
      return questionAdapter.setAll([], {
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
