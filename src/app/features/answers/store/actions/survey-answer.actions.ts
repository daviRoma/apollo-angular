import { Action } from '@ngrx/store';
import { SurveyAnswerRespone, SurveyAnswerRequest } from '../../../../models/survey-answer.model';

export enum SurveyAnswerActionTypes {
  LOADING = '[SurveyAnswer] Loading',
  LOAD_SUCCESS = '[SurveyAnswer] Loading Success',
  LOAD_FAILURE = '[SurveyAnswer] Loading Failure',
  LOADONE = '[SurveyAnswer] Load One',
  LOADONE_SUCCESS = '[SurveyAnswer] Load One Success',
  LOADONE_FAILURE = '[SurveyAnswer] Load One Failure'
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

export class SurveyAnswerLoadOneAction implements Action {
  public readonly type = SurveyAnswerActionTypes.LOADONE;
  constructor(public payload: SurveyAnswerRequest) {}
}

export class SurveyAnswerLoadOneSuccessAction implements Action {
  public readonly type = SurveyAnswerActionTypes.LOADONE_SUCCESS;
  constructor(public payload: SurveyAnswerRespone) {}
}

export class SurveyAnswerLoadOneFailAction implements Action {
  public readonly type = SurveyAnswerActionTypes.LOADONE_FAILURE;
  constructor(public error: any) {}
}

export type SurveyAnswerActionsAll =
  | SurveyAnswerLoadAction
  | SurveyAnswerLoadSuccessAction
  | SurveyAnswerLoadFailAction
  | SurveyAnswerLoadOneAction
  | SurveyAnswerLoadOneSuccessAction
  | SurveyAnswerLoadOneFailAction;
