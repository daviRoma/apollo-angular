import { Action } from '@ngrx/store';
import { Answer, AnswerRequest, AnswerResponse } from '../../../../models/answer.model';

export enum AnswerActionTypes {
  LOADING = '[Answer] Loading',
  LOAD_SUCCESS = '[Answer] Loading Success',
  LOAD_FAILURE = '[Answer] Loading Failure',
}

export class AnswerLoadAction implements Action {
  public readonly type = AnswerActionTypes.LOADING;
  constructor(public payload: AnswerRequest) {}
}

export class AnswerLoadSuccessAction implements Action {
  public readonly type = AnswerActionTypes.LOAD_SUCCESS;
  constructor(public payload: AnswerResponse) {}
}

export class AnswerLoadFailAction implements Action {
  public readonly type = AnswerActionTypes.LOAD_FAILURE;
  constructor(public error: any) {}
}

export type AnswerActionsAll =
  | AnswerLoadAction
  | AnswerLoadSuccessAction
  | AnswerLoadFailAction;
