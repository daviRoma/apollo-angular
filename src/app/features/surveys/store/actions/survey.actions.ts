import { Action } from '@ngrx/store';
import { SurveyRequest, SurveyResponse } from '../../../../models/survey.model';

export enum SurveyActionTypes {
  LOADING = '[Survey] Loading',
  LOAD_SUCCESS = '[Survey] Loading Success',
  LOAD_FAILURE = '[Survey] Loading Failure',
  NEW = '[Survey] New',
  DELETE = '[Survey] Delete',
  DELETE_SUCCESS = '[Survey] Delete Success',
  DELETE_FAILURE = '[Survey] Delete Failure',
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

export class SurveyNewAction implements Action {
  public readonly type = SurveyActionTypes.NEW;
  constructor(public payload: SurveyRequest) {}
}

export class SurveyDeleteAction implements Action {
  public readonly type = SurveyActionTypes.DELETE;
  constructor(public payload: string) {}
}

export class SurveyDeleteSuccessAction implements Action {
  public readonly type = SurveyActionTypes.DELETE_SUCCESS;
  constructor(public payload: SurveyResponse) {}
}

export class SurveyDeleteFailAction implements Action {
  public readonly type = SurveyActionTypes.DELETE_FAILURE;
  constructor(public error: any) {}
}

export type SurveyActionsAll =
  | SurveyLoadAction
  | SurveyLoadSuccessAction
  | SurveyLoadFailAction
  | SurveyNewAction
  | SurveyDeleteAction
  | SurveyDeleteSuccessAction
  | SurveyDeleteFailAction;
