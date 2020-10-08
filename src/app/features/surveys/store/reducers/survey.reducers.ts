import { SurveyState, initialSurveyState, surveyAdapter } from '../../../../state/survey.state';
import { SurveyActionsAll, SurveyActionTypes } from '../actions/survey.actions';

export function surveyReducer(state = initialSurveyState, action: SurveyActionsAll): SurveyState {
  switch (action.type) {
    case SurveyActionTypes.LOADING: {
      return { ...state, loading: true };
    }
    case SurveyActionTypes.LOAD_SUCCESS: {
      return surveyAdapter.setAll( dataTransform(action.payload.data), {
        ...state,
        error: false,
        loading: false,
        total: action.payload.meta ? action.payload.meta.total : action.payload.data.length,
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

    case SurveyActionTypes.LOADONE_SUCCESS: {
      return surveyAdapter.setOne(dataTransform([action.payload.data])[0], { ...state });
    }

    case SurveyActionTypes.NEW: {
      return { ...state, loading: true };
    }
    case SurveyActionTypes.NEW_FAILURE: {
      return state;
    }

    case SurveyActionTypes.UPDATE: {
      return { ...state, loading: true };
    }
    case SurveyActionTypes.UPDATE_FAILURE: {
      return state;
    }

    case SurveyActionTypes.DELETE: {
      return { ...state, loading: true };
    }
    case SurveyActionTypes.DELETE_SUCCESS: {
      return surveyAdapter.removeOne(action.payload, { ...state });
    }
    case SurveyActionTypes.DELETE_FAILURE: {
      return surveyAdapter.setAll([], {
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

function dataTransform(data: any[]): any {
  return data.map(
    (survey) => ({
      ...survey,
      invitationPool: survey.invitationPool ? { ...survey.invitationPool, emails: survey.invitationPool.emails.map(el => el.email) } : null
    })
  );
}
