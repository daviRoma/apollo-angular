import { Action } from '@ngrx/store';
import { SurveyAnswerRespone, SurveyAnswerRequest } from '../../../../models/survey-answer.model';

export enum SurveyAnswerActionTypes {
  LOADING = '[SurveyAnswer] Loading',
  LOAD_SUCCESS = '[SurveyAnswer] Loading Success',
  LOAD_FAILURE = '[SurveyAnswer] Loading Failure',
}

export class SurveyAnswerLoadAction implements Action {
  public readonly type = SurveyAnswerActionTypes.LOADING;
  constructor(public payload: SurveyAnswerRequest) {}
}

export class SurveyAnswerLoadSuccessAction implements Action {
  public readonly type = SurveyAnswerActionTypes.LOAD_SUCCESS;
  constructor(public payload: SurveyAnswerRespone) {}
}

export class SurveyAnswerLoadFailAction implements Action {
  public readonly type = SurveyAnswerActionTypes.LOAD_FAILURE;
  constructor(public error: any) {}
}

export type SurveyAnswerActionsAll =
  | SurveyAnswerLoadAction
  | SurveyAnswerLoadSuccessAction
  | SurveyAnswerLoadFailAction;
