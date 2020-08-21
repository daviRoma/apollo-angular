/**
 * App state
 */
import { createFeatureSelector } from '@ngrx/store';

import { AuthState, initialAuthState } from './auth.state';
import { SurveyState, initialSurveyState } from './survey.state';

import * as auth from 'src/app/core/auth/store/auth.reducer';
import * as survey from 'src/app/features/surveys/store/reducers/survey.reducers';

export interface AppState {
  auth: AuthState;
  survey: SurveyState;
}

export const reducers = {
  auth: auth.reducer,
  survey: survey.surveyReducer
};

export const initialAppState: AppState = {
  auth: initialAuthState,
  survey: initialSurveyState
};

export const selectAuthState = createFeatureSelector<AppState>('auth');
