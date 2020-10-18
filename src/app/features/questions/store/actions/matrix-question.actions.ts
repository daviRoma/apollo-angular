import { Action } from '@ngrx/store';
import {
  MatrixQuestion,
  QuestionResponse,
  QuestionRequest,
} from '../../../../models/question.model';

export enum MatrixQuestionActionTypes {
  LOADING = '[Matrix Question] Loading',
  LOAD_SUCCESS = '[Matrix Question] Loading Success',
  LOAD_FAILURE = '[Matrix Question] Loading Failure',
  LOADONE = '[Matrix Question] Load One',
  LOADONE_SUCCESS = '[Matrix Question] Load One Success',
  LOADONE_FAILURE = '[Matrix Question] Load One Failure',
  NEW = '[Matrix Question] New',
  NEW_SUCCESS = '[Matrix Question] New Success',
  NEW_FAILURE = '[Matrix Question] New Failure',
  UPDATE = '[Matrix Question] Update',
  UPDATE_SUCCESS = '[Matrix Question] Update Success',
  UPDATE_FAILURE = '[Matrix Question] Update Failure',
  DELETE = '[Matrix Question] Delete',
  DELETE_SUCCESS = '[Matrix Question] Delete Success',
  DELETE_FAILURE = '[Matrix Question] Delete Failure',
}

export class MatrixQuestionLoadAction implements Action {
  public readonly type = MatrixQuestionActionTypes.LOADING;
  constructor(public payload: QuestionRequest) {}
}

export class MatrixQuestionLoadSuccessAction implements Action {
  public readonly type = MatrixQuestionActionTypes.LOAD_SUCCESS;
  constructor(public payload: QuestionResponse) {}
}

export class MatrixQuestionLoadFailAction implements Action {
  public readonly type = MatrixQuestionActionTypes.LOAD_FAILURE;
  constructor(public error: any) {}
}

export class MatrixQuestionLoadOneAction implements Action {
  public readonly type = MatrixQuestionActionTypes.LOADONE;
  constructor(public payload: QuestionRequest) {}
}

export class MatrixQuestionLoadOneSuccessAction implements Action {
  public readonly type = MatrixQuestionActionTypes.LOADONE_SUCCESS;
  constructor(public payload: QuestionResponse) {}
}

export class MatrixQuestionLoadOneFailAction implements Action {
  public readonly type = MatrixQuestionActionTypes.LOADONE_FAILURE;
  constructor(public error: any) {}
}

export class MatrixQuestionNewAction implements Action {
  public readonly type = MatrixQuestionActionTypes.NEW;
  constructor(public payload: QuestionRequest) {}
}

export class MatrixQuestionNewSuccessAction implements Action {
  public readonly type = MatrixQuestionActionTypes.NEW_SUCCESS;
  constructor(public payload: any) {}
}

export class MatrixQuestionNewFailureAction implements Action {
  public readonly type = MatrixQuestionActionTypes.NEW_FAILURE;
  constructor(public error: any) {}
}

export class MatrixQuestionUpdateAction implements Action {
  public readonly type = MatrixQuestionActionTypes.UPDATE;
  constructor(public payload: QuestionRequest) {}
}

export class MatrixQuestionUpdateSuccessAction implements Action {
  public readonly type = MatrixQuestionActionTypes.UPDATE_SUCCESS;
  constructor(public payload: any) {}
}

export class MatrixQuestionUpdateFailureAction implements Action {
  public readonly type = MatrixQuestionActionTypes.UPDATE_FAILURE;
  constructor(public error: any) {}
}

export class MatrixQuestionDeleteAction implements Action {
  public readonly type = MatrixQuestionActionTypes.DELETE;
  constructor(public payload: QuestionRequest) {}
}

export class MatrixQuestionDeleteSuccessAction implements Action {
  public readonly type = MatrixQuestionActionTypes.DELETE_SUCCESS;
  constructor(public payload: any) {}
}

export class MatrixQuestionDeleteFailAction implements Action {
  public readonly type = MatrixQuestionActionTypes.DELETE_FAILURE;
  constructor(public error: any) {}
}

export type MatrixQuestionActionsAll =
  | MatrixQuestionLoadAction
  | MatrixQuestionLoadSuccessAction
  | MatrixQuestionLoadFailAction
  | MatrixQuestionLoadOneAction
  | MatrixQuestionLoadOneSuccessAction
  | MatrixQuestionLoadOneFailAction
  | MatrixQuestionNewAction
  | MatrixQuestionNewSuccessAction
  | MatrixQuestionNewFailureAction
  | MatrixQuestionUpdateAction
  | MatrixQuestionUpdateSuccessAction
  | MatrixQuestionUpdateFailureAction
  | MatrixQuestionDeleteAction
  | MatrixQuestionDeleteSuccessAction
  | MatrixQuestionDeleteFailAction;
