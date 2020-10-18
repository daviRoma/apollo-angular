import { Action } from '@ngrx/store';
import { Answer, AnswerRequest, AnswerResponse } from '../../../../models/answer.model';

export enum AnswerActionTypes {
  LOADING = '[Answer] Loading',
  LOAD_SUCCESS = '[Answer] Loading Success',
  LOAD_FAILURE = '[Answer] Loading Failure',
  SUBMIT_ANSWER = '[Answer] Submit Answer',
  SUBMIT_ANSWER_SUCCESS = '[Answer] Submit Answer Success',
  SUBMIT_ANSWER_FAILURE = '[Answer] Submit Answer Failure'
}

export class AnswerLoadAction implements Action {
  public readonly type = AnswerActionTypes.LOADING;
  constructor(public payload: AnswerRequest) { }
}

export class AnswerLoadSuccessAction implements Action {
  public readonly type = AnswerActionTypes.LOAD_SUCCESS;
  constructor(public payload: AnswerResponse) { }
}

export class AnswerLoadFailAction implements Action {
  public readonly type = AnswerActionTypes.LOAD_FAILURE;
  constructor(public error: any) { }
}

export class SubmitAnswersAction implements Action {
  public readonly type = AnswerActionTypes.SUBMIT_ANSWER;
  constructor(public payload: AnswerRequest) {}
}

export class SubmitAnswerSuccessAction implements Action {
  public readonly type = AnswerActionTypes.SUBMIT_ANSWER_SUCCESS;
  constructor(public error: any) {}
}

export class SubmitAnswerFailureAction implements Action {
  public readonly type = AnswerActionTypes.SUBMIT_ANSWER_FAILURE;
  constructor(public error: any) { }
}


export type AnswerActionsAll =
  AnswerLoadAction | AnswerLoadSuccessAction | AnswerLoadFailAction | SubmitAnswersAction | SubmitAnswerFailureAction;
