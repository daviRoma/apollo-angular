import { QuestionState, initialQuestionState, questionAdapter } from '../../../../state/question.state';
import { QuestionActionsAll, QuestionActionTypes } from '../actions/question.actions';

export function questionReducer(state = initialQuestionState, action: QuestionActionsAll): QuestionState {
  switch (action.type) {
    case QuestionActionTypes.LOADING: {
      return { ...state, loading: true };
    }
    case QuestionActionTypes.LOAD_SUCCESS: {
      const questions = action.payload.data.map(
        (question) =>
          ({
            ...question
          })
        );
      return questionAdapter.setAll(questions, {
        ...state,
        error: false,
        loading: false,
        total: action.payload.data.length,
      });
    }
    case QuestionActionTypes.LOAD_FAILURE: {
      return questionAdapter.removeAll({
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
