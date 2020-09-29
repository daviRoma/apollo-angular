/**
 * App state
 */
import { AuthState, initialAuthState } from './auth.state';
import { SurveyState, initialSurveyState } from './survey.state';
import { QuestionGroupState, initialQuestionGroupState } from './question-group.state';
import { QuestionState, initialQuestionState, questionAdapter } from './question.state';
import { UserState, initialUserState } from './user.state';


import * as auth from 'src/app/core/auth/store/auth.reducer';
import * as survey from 'src/app/features/surveys/store/reducers/survey.reducers';
import * as questionGroup from 'src/app/features/question-groups/store/question-group.reducers';
import * as question from 'src/app/features/questions/store/reducers/question.reducers';
import * as user from 'src/app/features/users/store/reducers/user.reducers';


export interface AppState {
  auth: AuthState;
  survey: SurveyState;
  questionGroup: QuestionGroupState;
  question: QuestionState;
  user: UserState;
}

export const reducers = {
  auth: auth.reducer,
  survey: survey.surveyReducer,
  questiongroup: questionGroup.questionGroupReducer,
  question: question.questionReducer,
  user: user.userReducer
};

export const initialAppState: AppState = {
  auth: initialAuthState,
  survey: initialSurveyState,
  questionGroup: initialQuestionGroupState,
  question: initialQuestionState,
  user: initialUserState
};
