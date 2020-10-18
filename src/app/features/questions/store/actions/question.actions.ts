import { Action } from '@ngrx/store';
import { Question, QuestionRequest, QuestionResponse } from '../../../../models/question.model';

export enum QuestionActionTypes {
  LOADING = '[Question] Loading',
  LOAD_SUCCESS = '[Question] Loading Success',
  LOAD_FAILURE = '[Question] Loading Failure',
}

export class QuestionLoadAction implements Action {
  public readonly type = QuestionActionTypes.LOADING;
  constructor(public payload: QuestionRequest) {}
}

export class QuestionLoadSuccessAction implements Action {
  public readonly type = QuestionActionTypes.LOAD_SUCCESS;
  constructor(public payload: QuestionResponse) {}
}

export class QuestionLoadFailAction implements Action {
  public readonly type = QuestionActionTypes.LOAD_FAILURE;
  constructor(public error: any) {}
}

export type QuestionActionsAll =
  | QuestionLoadAction
  | QuestionLoadSuccessAction
  | QuestionLoadFailAction;
