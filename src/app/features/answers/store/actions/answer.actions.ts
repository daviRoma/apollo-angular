import { Action } from '@ngrx/store';
import { Answer, AnswerRequest, AnswerResponse } from '../../../../models/answer.model';

export enum AnswerActionTypes {
  LOADING = '[Answer] Loading',
  LOAD_SUCCESS = '[Answer] Loading Success',
  LOAD_FAILURE = '[Answer] Loading Failure',
  SUBMIT_ANSWER = '[Answer] Submit SurveyAnswer',
  SUBMIT_FAILURE = '[Answer] Submit Failure'
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

export class SubmitAnswers implements Action {
  public readonly type = AnswerActionTypes.SUBMIT_ANSWER;
  constructor(public payload: any) { 
  }
}

export class SubmitAnswerFailureAction implements Action {
  public readonly type = AnswerActionTypes.SUBMIT_FAILURE;
  constructor(public error: any) { }
}


export type AnswerActionsAll =
  AnswerLoadAction | AnswerLoadSuccessAction | AnswerLoadFailAction | SubmitAnswers | SubmitAnswerFailureAction;
