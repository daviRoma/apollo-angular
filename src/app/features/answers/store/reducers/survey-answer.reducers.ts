import { SurveyAnswerState, initialSurveyAnswerState, surveyAnswerAdapter } from '../../../../state/survey-answer.state';
import { SurveyAnswerActionsAll, SurveyAnswerActionTypes } from '../actions/survey-answer.actions';

export function surveyAnswerReducer(state = initialSurveyAnswerState, action: SurveyAnswerActionsAll): SurveyAnswerState {
  switch (action.type) {
    case SurveyAnswerActionTypes.LOADING: {
      return { ...state, loading: true };
    }
    case SurveyAnswerActionTypes.LOAD_SUCCESS: {
      const answers = action.payload.data.map(
        (answer) =>
          ({
            ...answer
          })
        );
      return surveyAnswerAdapter.setAll(answers, {
        ...state,
        error: false,
        loading: false,
        total: action.payload.data.length,
      });
    }
    case SurveyAnswerActionTypes.LOAD_FAILURE: {
      return surveyAnswerAdapter.removeAll({
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
