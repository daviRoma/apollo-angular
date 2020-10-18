import { QuestionState, initialQuestionState, questionAdapter } from '../../../../state/question.state';
import { MatrixQuestionActionsAll, MatrixQuestionActionTypes } from '../actions/matrix-question.actions';

export function MatrixQuestionReducer(
  state = initialQuestionState,
  action: MatrixQuestionActionsAll
): QuestionState {
  switch (action.type) {
    case MatrixQuestionActionTypes.LOADING: {
      return { ...state, loading: true };
    }
    case MatrixQuestionActionTypes.LOAD_SUCCESS: {
      const questions = action.payload.data.map((question) => ({
        ...question,
      }));
      return questionAdapter.setAll(questions, {
        ...state,
        error: false,
        loading: false,
        total: action.payload.data.length,
      });
    }
    case MatrixQuestionActionTypes.LOAD_FAILURE: {
      return questionAdapter.removeAll({
        ...state,
        error: true,
        loading: false,
        total: 0,
      });
    }

    case MatrixQuestionActionTypes.LOADONE_SUCCESS: {
      return questionAdapter.addOne({ ...action.payload.data }, { ...state });
    }

    case MatrixQuestionActionTypes.NEW: {
      return { ...state, loading: true };
    }
    case MatrixQuestionActionTypes.NEW_FAILURE: {
      return state;
    }

    case MatrixQuestionActionTypes.UPDATE: {
      return { ...state, loading: true };
    }
    case MatrixQuestionActionTypes.UPDATE_SUCCESS: {
      return questionAdapter.updateOne(
        { id: action.payload.id, changes: action.payload },
        { ...state }
      );
    }
    case MatrixQuestionActionTypes.UPDATE_FAILURE: {
      return state;
    }

    case MatrixQuestionActionTypes.DELETE: {
      return { ...state, loading: true };
    }
    case MatrixQuestionActionTypes.DELETE_SUCCESS: {
      return questionAdapter.removeOne(action.payload, { ...state });
    }
    case MatrixQuestionActionTypes.DELETE_FAILURE: {
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
