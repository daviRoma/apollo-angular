/**
 * App state
 */
import { AuthState, initialAuthState } from './auth.state';
import { SurveyState, initialSurveyState } from './survey.state';
import { QuestionGroupState, initialQuestionGroupState } from './question-group.state';


import * as auth from 'src/app/core/auth/store/auth.reducer';
import * as survey from 'src/app/features/surveys/store/reducers/survey.reducers';
import * as questionGroup from 'src/app/features/question-groups/store/question-group.reducers';
import * as user from 'src/app/features/users/store/reducers/user.reducers';
import { UserState, initialUserState } from './user.state';


export interface AppState {
  auth: AuthState;
  survey: SurveyState;
  questionGroup: QuestionGroupState;
  user: UserState;
}

export const reducers = {
  auth: auth.reducer,
  survey: survey.surveyReducer,
  questiongroup: questionGroup.questionGroupReducer,
  user: user.userReducer
};

export const initialAppState: AppState = {
  auth: initialAuthState,
  survey: initialSurveyState,
  questionGroup: initialQuestionGroupState,
  user: initialUserState
};
