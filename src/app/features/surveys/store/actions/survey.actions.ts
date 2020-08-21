import { Action } from '@ngrx/store';
import { SurveyRequest, SurveyResponse } from '../../../../models/survey.model';

export enum SurveyActionTypes {
  LOADING = '[Survey] Loading',
  LOAD_SUCCESS = '[Survey] Loading Success',
  LOAD_FAILURE = '[Survey] Loading Failure'
}

export class SurveyLoadAction implements Action {
  public readonly type = SurveyActionTypes.LOADING;
  constructor(public payload: SurveyRequest) {}
}
export class SurveyLoadSuccessAction implements Action {
  public readonly type = SurveyActionTypes.LOAD_SUCCESS;
  constructor(public payload: SurveyResponse) {}
}
export class SurveyLoadFailAction implements Action {
  public readonly type = SurveyActionTypes.LOAD_FAILURE;
  constructor(public error: any) {}
}

export type SurveyActionsAll =
  | SurveyLoadAction
  | SurveyLoadSuccessAction
  | SurveyLoadFailAction;
