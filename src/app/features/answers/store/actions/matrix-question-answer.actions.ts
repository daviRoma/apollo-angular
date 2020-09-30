import { Action } from '@ngrx/store';
import {
  MatrixRadioAnswer,
  MatrixCheckAnswer,
  AnswerResponse,
  AnswerRequest,
} from '../../../../models/answer.model';

export enum MatrixQuestionAnswerActionTypes {
  LOADING = '[Matrix Question Answer] Loading',
  LOAD_SUCCESS = '[Matrix Question Answer] Loading Success',
  LOAD_FAILURE = '[Matrix Question Answer] Loading Failure',
  LOADONE = '[Matrix Question Answer] Load One',
  LOADONE_SUCCESS = '[Matrix Question Answer] Load One Success',
  LOADONE_FAILURE = '[Matrix Question Answer] Load One Failure',
  NEW = '[Matrix Question Answer] New',
  NEW_SUCCESS = '[Matrix Question Answer] New Success',
  NEW_FAILURE = '[Matrix Question Answer] New Failure',
  UPDATE = '[Matrix Question Answer] Update',
  UPDATE_SUCCESS = '[Matrix Question Answer] Update Success',
  UPDATE_FAILURE = '[Matrix Question Answer] Update Failure',
  DELETE = '[Matrix Question Answer] Delete',
  DELETE_SUCCESS = '[Matrix Question Answer] Delete Success',
  DELETE_FAILURE = '[Matrix Question Answer] Delete Failure',
}

export class MatrixQuestionAnswerLoadAction implements Action {
  public readonly type = MatrixQuestionAnswerActionTypes.LOADING;
  constructor(public payload: AnswerRequest) {}
}

export class MatrixQuestionAnswerLoadSuccessAction implements Action {
  public readonly type = MatrixQuestionAnswerActionTypes.LOAD_SUCCESS;
  constructor(public payload: AnswerResponse) {}
}

export class MatrixQuestionAnswerLoadFailAction implements Action {
  public readonly type = MatrixQuestionAnswerActionTypes.LOAD_FAILURE;
  constructor(public error: any) {}
}

export class MatrixQuestionAnswerLoadOneAction implements Action {
  public readonly type = MatrixQuestionAnswerActionTypes.LOADONE;
  constructor(public payload: AnswerRequest) {}
}

export class MatrixQuestionAnswerLoadOneSuccessAction implements Action {
  public readonly type = MatrixQuestionAnswerActionTypes.LOADONE_SUCCESS;
  constructor(public payload: AnswerResponse) {}
}

export class MatrixQuestionAnswerLoadOneFailAction implements Action {
  public readonly type = MatrixQuestionAnswerActionTypes.LOADONE_FAILURE;
  constructor(public error: any) {}
}

export class MatrixQuestionAnswerNewAction implements Action {
  public readonly type = MatrixQuestionAnswerActionTypes.NEW;
  constructor(public payload: AnswerRequest) {}
}

export class MatrixQuestionAnswerNewSuccessAction implements Action {
  public readonly type = MatrixQuestionAnswerActionTypes.NEW_SUCCESS;
  constructor(public payload: any) {}
}

export class MatrixQuestionAnswerNewFailureAction implements Action {
  public readonly type = MatrixQuestionAnswerActionTypes.NEW_FAILURE;
  constructor(public error: any) {}
}

export class MatrixQuestionAnswerUpdateAction implements Action {
  public readonly type = MatrixQuestionAnswerActionTypes.UPDATE;
  constructor(public payload: AnswerRequest) {}
}

export class MatrixQuestionAnswerUpdateSuccessAction implements Action {
  public readonly type = MatrixQuestionAnswerActionTypes.UPDATE_SUCCESS;
  constructor(public payload: any) {}
}

export class MatrixQuestionAnswerUpdateFailureAction implements Action {
  public readonly type = MatrixQuestionAnswerActionTypes.UPDATE_FAILURE;
  constructor(public error: any) {}
}

export class MatrixQuestionAnswerDeleteAction implements Action {
  public readonly type = MatrixQuestionAnswerActionTypes.DELETE;
  constructor(public payload: AnswerRequest) {}
}

export class MatrixQuestionAnswerDeleteSuccessAction implements Action {
  public readonly type = MatrixQuestionAnswerActionTypes.DELETE_SUCCESS;
  constructor(public payload: any) {}
}

export class MatrixQuestionAnswerDeleteFailAction implements Action {
  public readonly type = MatrixQuestionAnswerActionTypes.DELETE_FAILURE;
  constructor(public error: any) {}
}

export type MatrixQuestionAnswerActionsAll =
  | MatrixQuestionAnswerLoadAction
  | MatrixQuestionAnswerLoadSuccessAction
  | MatrixQuestionAnswerLoadFailAction
  | MatrixQuestionAnswerLoadOneAction
  | MatrixQuestionAnswerLoadOneSuccessAction
  | MatrixQuestionAnswerLoadOneFailAction
  | MatrixQuestionAnswerNewAction
  | MatrixQuestionAnswerNewSuccessAction
  | MatrixQuestionAnswerNewFailureAction
  | MatrixQuestionAnswerUpdateAction
  | MatrixQuestionAnswerUpdateSuccessAction
  | MatrixQuestionAnswerUpdateFailureAction
  | MatrixQuestionAnswerDeleteAction
  | MatrixQuestionAnswerDeleteSuccessAction
  | MatrixQuestionAnswerDeleteFailAction;
