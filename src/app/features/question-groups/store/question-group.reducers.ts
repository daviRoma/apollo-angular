import { QuestionGroupState, initialQuestionGroupState, questionGroupAdapter } from '../../../state/question-group.state';
import { QuestionGroupActionsAll, QuestionGroupActionTypes } from './question-group.actions';

export function questionGroupReducer(state = initialQuestionGroupState, action: QuestionGroupActionsAll): QuestionGroupState {
  switch (action.type) {
    case QuestionGroupActionTypes.LOADING: {
      return { ...state, loading: true };
    }
    case QuestionGroupActionTypes.LOAD_SUCCESS: {
      return questionGroupAdapter.setAll(action.payload.data, {
        ...state,
        error: false,
        loading: false,
        total: action.payload.data.length,
      });
    }
    case QuestionGroupActionTypes.LOAD_FAILURE: {
      return questionGroupAdapter.removeAll({
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
