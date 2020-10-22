import { act } from '@ngrx/effects';
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
        total: action.payload.meta ? action.payload.meta.total : action.payload.data.length
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

    case SurveyActionTypes.LOADONE: {
      return { ...state, loading: true };
    }
    case SurveyActionTypes.LOADONE_REDIRECT: {
      return state.total ?
        surveyAdapter.addOne(dataTransform([action.payload.data])[0],
          { ...state, loading: false, error: false, total: state.total + 1 }) :
        surveyAdapter.setOne(dataTransform([action.payload.data])[0], { ...state, loading: false, error: false, total: 1 });
    }
    case SurveyActionTypes.LOADONE_SUCCESS: {
      return state.total ?
        surveyAdapter.updateOne(
          { id: action.payload.data.id, changes: dataTransform([action.payload.data])[0] },
          { ...state, loading: false, error: false, total: state.total }) :
        surveyAdapter.setOne(dataTransform([action.payload.data])[0], { ...state, loading: false, error: false, total: 1 });
    }

    case SurveyActionTypes.NEW: {
      return { ...state, loading: true };
    }
    case SurveyActionTypes.NEW_FAILURE: {
      return { ...state, loading: false, error: true, total: state.total };
    }

    case SurveyActionTypes.UPDATE: {
      return { ...state, loading: true };
    }
    case SurveyActionTypes.UPDATE_FAILURE: {
      return { ...state, loading: false, error: true, total: state.total };
    }

    case SurveyActionTypes.DELETE: {
      return { ...state, loading: true };
    }
    case SurveyActionTypes.DELETE_SUCCESS: {
      return surveyAdapter.removeOne(action.payload, { ...state, loading: false, error: false, total: state.total - 1 });
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
