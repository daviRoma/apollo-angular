import { Action } from '@ngrx/store';
import {
  InputQuestion,
  QuestionResponse,
  QuestionRequest,
} from '../../../../models/question.model';

export enum InputQuestionActionTypes {
  LOADING = '[Input Question] Loading',
  LOAD_SUCCESS = '[Input Question] Loading Success',
  LOAD_FAILURE = '[Input Question] Loading Failure',
  LOADONE = '[Input Question] Load One',
  LOADONE_SUCCESS = '[Input Question] Load One Success',
  LOADONE_FAILURE = '[Input Question] Load One Failure',
  NEW = '[Input Question] New',
  NEW_SUCCESS = '[Input Question] New Success',
  NEW_FAILURE = '[Input Question] New Failure',
  UPDATE = '[Input Question] Update',
  UPDATE_SUCCESS = '[Input Question] Update Success',
  UPDATE_FAILURE = '[Input Question] Update Failure',
  DELETE = '[Input Question] Delete',
  DELETE_SUCCESS = '[Input Question] Delete Success',
  DELETE_FAILURE = '[Input Question] Delete Failure',
}

export class InputQuestionLoadAction implements Action {
  public readonly type = InputQuestionActionTypes.LOADING;
  constructor(public payload: QuestionRequest) {}
}

export class InputQuestionLoadSuccessAction implements Action {
  public readonly type = InputQuestionActionTypes.LOAD_SUCCESS;
  constructor(public payload: QuestionResponse) {}
}

export class InputQuestionLoadFailAction implements Action {
  public readonly type = InputQuestionActionTypes.LOAD_FAILURE;
  constructor(public error: any) {}
}

export class InputQuestionLoadOneAction implements Action {
  public readonly type = InputQuestionActionTypes.LOADONE;
  constructor(public payload: QuestionRequest) {}
}

export class InputQuestionLoadOneSuccessAction implements Action {
  public readonly type = InputQuestionActionTypes.LOADONE_SUCCESS;
  constructor(public payload: QuestionResponse) {}
}

export class InputQuestionLoadOneFailAction implements Action {
  public readonly type = InputQuestionActionTypes.LOADONE_FAILURE;
  constructor(public error: any) {}
}

export class InputQuestionNewAction implements Action {
  public readonly type = InputQuestionActionTypes.NEW;
  constructor(public payload: QuestionRequest) {}
}

export class InputQuestionNewSuccessAction implements Action {
  public readonly type = InputQuestionActionTypes.NEW_SUCCESS;
  constructor(public payload: any) {}
}

export class InputQuestionNewFailureAction implements Action {
  public readonly type = InputQuestionActionTypes.NEW_FAILURE;
  constructor(public error: any) {}
}

export class InputQuestionUpdateAction implements Action {
  public readonly type = InputQuestionActionTypes.UPDATE;
  constructor(public payload: QuestionRequest) {}
}

export class InputQuestionUpdateSuccessAction implements Action {
  public readonly type = InputQuestionActionTypes.UPDATE_SUCCESS;
  constructor(public payload: any) {}
}

export class InputQuestionUpdateFailureAction implements Action {
  public readonly type = InputQuestionActionTypes.UPDATE_FAILURE;
  constructor(public error: any) {}
}

export class InputQuestionDeleteAction implements Action {
  public readonly type = InputQuestionActionTypes.DELETE;
  constructor(public payload: QuestionRequest) {}
}

export class InputQuestionDeleteSuccessAction implements Action {
  public readonly type = InputQuestionActionTypes.DELETE_SUCCESS;
  constructor(public payload: any) {}
}

export class InputQuestionDeleteFailAction implements Action {
  public readonly type = InputQuestionActionTypes.DELETE_FAILURE;
  constructor(public error: any) {}
}

export type InputQuestionActionsAll =
  | InputQuestionLoadAction
  | InputQuestionLoadSuccessAction
  | InputQuestionLoadFailAction
  | InputQuestionLoadOneAction
  | InputQuestionLoadOneSuccessAction
  | InputQuestionLoadOneFailAction
  | InputQuestionNewAction
  | InputQuestionNewSuccessAction
  | InputQuestionNewFailureAction
  | InputQuestionUpdateAction
  | InputQuestionUpdateSuccessAction
  | InputQuestionUpdateFailureAction
  | InputQuestionDeleteAction
  | InputQuestionDeleteSuccessAction
  | InputQuestionDeleteFailAction;
