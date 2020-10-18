/**
 * App state
 */
import { AuthState, initialAuthState } from './auth.state';
import { SurveyState, initialSurveyState } from './survey.state';
import { QuestionGroupState, initialQuestionGroupState } from './question-group.state';
import { QuestionState, initialQuestionState } from './question.state';
import { UserState, initialUserState } from './user.state';
import { SurveyAnswerState, initialSurveyAnswerState } from './survey-answer.state';
import { AnswerState, initialAnswerState } from './answer.state';


import * as auth from 'src/app/core/auth/store/auth.reducer';
import * as survey from 'src/app/features/surveys/store/reducers/survey.reducers';
import * as questionGroup from 'src/app/features/question-groups/store/question-group.reducers';
import * as question from 'src/app/features/questions/store/reducers/question.reducers';
import * as surveyAnswer from 'src/app/features/answers/store/reducers/survey-answer.reducers';
import * as answer from 'src/app/features/answers/store/reducers/answer.reducers';
import * as user from 'src/app/features/users/store/reducers/user.reducers';


export interface AppState {
  auth: AuthState;
  survey: SurveyState;
  questionGroup: QuestionGroupState;
  question: QuestionState;
  surveyAnswer: SurveyAnswerState;
  answer: AnswerState;
  user: UserState;
}

export const reducers = {
  auth: auth.reducer,
  survey: survey.surveyReducer,
  questiongroup: questionGroup.questionGroupReducer,
  question: question.questionReducer,
  surveyAnswer: surveyAnswer.surveyAnswerReducer,
  answer : answer.answerReducer,
  user: user.userReducer
};

export const initialAppState: AppState = {
  auth: initialAuthState,
  survey: initialSurveyState,
  questionGroup: initialQuestionGroupState,
  question: initialQuestionState,
  surveyAnswer: initialSurveyAnswerState,
  answer: initialAnswerState,
  user: initialUserState
};
