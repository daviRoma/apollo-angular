import { SurveyState, initialSurveyState, surveyAdapter } from '../../../../state/survey.state';
import { SurveyActionsAll, SurveyActionTypes } from '../actions/survey.actions';

export function surveyReducer(state = initialSurveyState, action: SurveyActionsAll): SurveyState {
  switch (action.type) {
    case SurveyActionTypes.LOADING: {
      return { ...state, loading: true };
    }
    case SurveyActionTypes.LOAD_SUCCESS: {
      return surveyAdapter.setAll(action.payload.surveys, {
        ...state,
        error: false,
        loading: false,
        total: action.payload.surveys.length,
      });
    }
    case SurveyActionTypes.LOAD_FAILURE: {
      return surveyAdapter.removeAll({
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
