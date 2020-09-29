import { AnswerState, initialAnswerState, answerAdapter } from '../../../../state/answer.state';
import { AnswerActionsAll, AnswerActionTypes } from '../actions/answer.actions';

export function questionReducer(state = initialAnswerState, action: AnswerActionsAll): AnswerState {
  switch (action.type) {
    case AnswerActionTypes.LOADING: {
      return { ...state, loading: true };
    }
    case AnswerActionTypes.LOAD_SUCCESS: {
      const questions = action.payload.data.map(
        (answer) =>
          ({
            ...answer
          })
        );
      return answerAdapter.setAll(questions, {
        ...state,
        error: false,
        loading: false,
        total: action.payload.data.length,
      });
    }
    case AnswerActionTypes.LOAD_FAILURE: {
      return answerAdapter.removeAll({
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
