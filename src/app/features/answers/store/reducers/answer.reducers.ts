import { AnswerState, initialAnswerState, answerAdapter } from '../../../../state/answer.state';
import { AnswerActionsAll, AnswerActionTypes } from '../actions/answer.actions';

export function answerReducer(state = initialAnswerState, action: AnswerActionsAll): AnswerState {
  switch (action.type) {
    case AnswerActionTypes.LOADING: {
      return { ...state, loading: true };
    }
    case AnswerActionTypes.LOAD_SUCCESS: {
      const answers = action.payload.data.map(
        (answer) =>
          ({
            ...answer
          })
        );
      return answerAdapter.setAll(answers, {
        ...state,
        error: false,
        loading: false,
        total: action.payload.data.length,
      });
    }
    case AnswerActionTypes.SUBMIT_ANSWER_FAILURE: {
      return answerAdapter.removeAll({
        ...state,
        error: true,
        loading: false,
        total: 0,
      });
    }
    case AnswerActionTypes.SUBMIT_ANSWER: {
      return { ...state, loading: true };
    }

    default:
      return state;
  }

}
