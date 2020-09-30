import { Action } from '@ngrx/store';
import {
  SingleAnswer,
  AnswerRequest,
  AnswerResponse,
} from '../../../../models/answer.model';

export enum InputQuestionAnswerActionTypes {
  LOADING = '[Input Question Answer] Loading',
  LOAD_SUCCESS = '[Input Question Answer] Loading Success',
  LOAD_FAILURE = '[Input Question Answer] Loading Failure',
  LOADONE = '[Input Question Answer] Load One',
  LOADONE_SUCCESS = '[Input Question Answer] Load One Success',
  LOADONE_FAILURE = '[Input Question Answer] Load One Failure',
  NEW = '[Input Question Answer] New',
  NEW_SUCCESS = '[Input Question Answer] New Success',
  NEW_FAILURE = '[Input Question Answer] New Failure',
  UPDATE = '[Input Question Answer] Update',
  UPDATE_SUCCESS = '[Input Question Answer] Update Success',
  UPDATE_FAILURE = '[Input Question Answer] Update Failure',
  DELETE = '[Input Question Answer] Delete',
  DELETE_SUCCESS = '[Input Question Answer] Delete Success',
  DELETE_FAILURE = '[Input Question Answer] Delete Failure',
}

export class InputQuestionAnswerLoadAction implements Action {
  public readonly type = InputQuestionAnswerActionTypes.LOADING;
  constructor(public payload: AnswerRequest) {}
}

export class InputQuestionAnswerLoadSuccessAction implements Action {
  public readonly type = InputQuestionAnswerActionTypes.LOAD_SUCCESS;
  constructor(public payload: AnswerResponse) {}
}

export class InputQuestionAnswerLoadFailAction implements Action {
  public readonly type = InputQuestionAnswerActionTypes.LOAD_FAILURE;
  constructor(public error: any) {}
}

export class InputQuestionAnswerLoadOneAction implements Action {
  public readonly type = InputQuestionAnswerActionTypes.LOADONE;
  constructor(public payload: AnswerRequest) {}
}

export class InputQuestionAnswerLoadOneSuccessAction implements Action {
  public readonly type = InputQuestionAnswerActionTypes.LOADONE_SUCCESS;
  constructor(public payload: AnswerResponse) {}
}

export class InputQuestionAnswerLoadOneFailAction implements Action {
  public readonly type = InputQuestionAnswerActionTypes.LOADONE_FAILURE;
  constructor(public error: any) {}
}

export class InputQuestionAnswerNewAction implements Action {
  public readonly type = InputQuestionAnswerActionTypes.NEW;
  constructor(public payload: AnswerRequest) {}
}

export class InputQuestionAnswerNewSuccessAction implements Action {
  public readonly type = InputQuestionAnswerActionTypes.NEW_SUCCESS;
  constructor(public payload: any) {}
}

export class InputQuestionAnswerNewFailureAction implements Action {
  public readonly type = InputQuestionAnswerActionTypes.NEW_FAILURE;
  constructor(public error: any) {}
}

export class InputQuestionAnswerUpdateAction implements Action {
  public readonly type = InputQuestionAnswerActionTypes.UPDATE;
  constructor(public payload: AnswerRequest) {}
}

export class InputQuestionAnswerUpdateSuccessAction implements Action {
  public readonly type = InputQuestionAnswerActionTypes.UPDATE_SUCCESS;
  constructor(public payload: any) {}
}

export class InputQuestionAnswerUpdateFailureAction implements Action {
  public readonly type = InputQuestionAnswerActionTypes.UPDATE_FAILURE;
  constructor(public error: any) {}
}

export class InputQuestionAnswerDeleteAction implements Action {
  public readonly type = InputQuestionAnswerActionTypes.DELETE;
  constructor(public payload: AnswerRequest) {}
}

export class InputQuestionAnswerDeleteSuccessAction implements Action {
  public readonly type = InputQuestionAnswerActionTypes.DELETE_SUCCESS;
  constructor(public payload: any) {}
}

export class InputQuestionAnswerDeleteFailAction implements Action {
  public readonly type = InputQuestionAnswerActionTypes.DELETE_FAILURE;
  constructor(public error: any) {}
}

export type InputQuestionAnswerActionsAll =
  | InputQuestionAnswerLoadAction
  | InputQuestionAnswerLoadSuccessAction
  | InputQuestionAnswerLoadFailAction
  | InputQuestionAnswerLoadOneAction
  | InputQuestionAnswerLoadOneSuccessAction
  | InputQuestionAnswerLoadOneFailAction
  | InputQuestionAnswerNewAction
  | InputQuestionAnswerNewSuccessAction
  | InputQuestionAnswerNewFailureAction
  | InputQuestionAnswerUpdateAction
  | InputQuestionAnswerUpdateSuccessAction
  | InputQuestionAnswerUpdateFailureAction
  | InputQuestionAnswerDeleteAction
  | InputQuestionAnswerDeleteSuccessAction
  | InputQuestionAnswerDeleteFailAction;
