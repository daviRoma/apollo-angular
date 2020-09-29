import { AnswerState, initialAnswerState, answerAdapter } from '../../../../state/answer.state';
import { MatrixQuestionAnswerActionsAll, MatrixQuestionAnswerActionTypes } from '../actions/matrix-question-answer.actions';

export function MatrixQuestionReducer(
  state = initialAnswerState,
  action: MatrixQuestionAnswerActionsAll
): AnswerState {
  switch (action.type) {
    case MatrixQuestionAnswerActionTypes.LOADING: {
      return { ...state, loading: true };
    }
    case MatrixQuestionAnswerActionTypes.LOAD_SUCCESS: {
      const answers = action.payload.data.map((answer) => ({
        ...answer,
      }));
      return answerAdapter.setAll(answers, {
        ...state,
        error: false,
        loading: false,
        total: action.payload.data.length,
      });
    }
    case MatrixQuestionAnswerActionTypes.LOAD_FAILURE: {
      return answerAdapter.removeAll({
        ...state,
        error: true,
        loading: false,
        total: 0,
      });
    }

    case MatrixQuestionAnswerActionTypes.LOADONE_SUCCESS: {
      return answerAdapter.addOne({ ...action.payload.data }, { ...state });
    }

    case MatrixQuestionAnswerActionTypes.NEW: {
      return { ...state, loading: true };
    }
    case MatrixQuestionAnswerActionTypes.NEW_FAILURE: {
      return state;
    }

    case MatrixQuestionAnswerActionTypes.UPDATE: {
      return { ...state, loading: true };
    }
    case MatrixQuestionAnswerActionTypes.UPDATE_SUCCESS: {
      return answerAdapter.updateOne(
        { id: action.payload.id, changes: action.payload },
        { ...state }
      );
    }
    case MatrixQuestionAnswerActionTypes.UPDATE_FAILURE: {
      return state;
    }

    case MatrixQuestionAnswerActionTypes.DELETE: {
      return { ...state, loading: true };
    }
    case MatrixQuestionAnswerActionTypes.DELETE_SUCCESS: {
      return answerAdapter.removeOne(action.payload, { ...state });
    }
    case MatrixQuestionAnswerActionTypes.DELETE_FAILURE: {
      return answerAdapter.setAll([], {
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
