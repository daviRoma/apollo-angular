import { SurveyState, initialSurveyState, surveyAdapter } from '../../../../state/survey.state';
import { SurveyActionsAll, SurveyActionTypes } from '../actions/survey.actions';
import { Survey } from 'src/app/models/survey.model';
import { Update } from '@ngrx/entity';

export function surveyReducer(state = initialSurveyState, action: SurveyActionsAll): SurveyState {
  switch (action.type) {
    case SurveyActionTypes.LOADING: {
      return { ...state, loading: true };
    }
    case SurveyActionTypes.LOAD_SUCCESS: {
      return surveyAdapter.setAll(action.payload.data, {
        ...state,
        error: false,
        loading: false,
        total: action.payload.data.length,
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

    case SurveyActionTypes.NEW: {
      return { ...state, loading: true };
    }
    case SurveyActionTypes.NEW_SUCCESS: {
      return surveyAdapter.addOne(
        { ...action.payload, createDate: new Date() },
        { ...state }
      );
    }
    case SurveyActionTypes.NEW_FAILURE: {
      return state;
    }

    case SurveyActionTypes.UPDATE: {
      return { ...state, loading: true };
    }
    case SurveyActionTypes.UPDATE_SUCCESS: {
      return surveyAdapter.updateOne(
        { id: action.payload.id, changes: action.payload },
        { ...state }
      );
    }
    case SurveyActionTypes.UPDATE_FAILURE: {
      return state;
    }

    case SurveyActionTypes.DELETE: {
      return { ...state, loading: true };
    }
    case SurveyActionTypes.DELETE_SUCCESS: {
      return surveyAdapter.setAll(action.payload.data, {
        ...state,
        error: false,
        loading: false,
        total: action.payload.data.length,
      });
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
