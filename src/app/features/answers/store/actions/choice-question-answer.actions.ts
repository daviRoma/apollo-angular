import { Action } from '@ngrx/store';
import {
  ChoiceQuestionAnswer,
  AnswerResponse,
  AnswerRequest,
} from '../../../../models/answer.model';

export enum ChoiceQuestionAnswerActionTypes {
  LOADING = '[Choice Question Answer] Loading',
  LOAD_SUCCESS = '[Choice Question Answer] Loading Success',
  LOAD_FAILURE = '[Choice Question Answer] Loading Failure',
  LOADONE = '[Choice Question Answer] Load One',
  LOADONE_SUCCESS = '[Choice Question Answer] Load One Success',
  LOADONE_FAILURE = '[Choice Question Answer] Load One Failure',
  NEW = '[Choice Question Answer] New',
  NEW_SUCCESS = '[Choice Question Answer] New Success',
  NEW_FAILURE = '[Choice Question Answer] New Failure',
  UPDATE = '[Choice Question Answer] Update',
  UPDATE_SUCCESS = '[Choice Question Answer] Update Success',
  UPDATE_FAILURE = '[Choice Question Answer] Update Failure',
  DELETE = '[Choice Question Answer] Delete',
  DELETE_SUCCESS = '[Choice Question Answer] Delete Success',
  DELETE_FAILURE = '[Choice Question Answer] Delete Failure',
}

export class ChoiceQuestionAnswerLoadAction implements Action {
  public readonly type = ChoiceQuestionAnswerActionTypes.LOADING;
  constructor(public payload: AnswerRequest) {}
}

export class ChoiceQuestionAnswerLoadSuccessAction implements Action {
  public readonly type = ChoiceQuestionAnswerActionTypes.LOAD_SUCCESS;
  constructor(public payload: AnswerResponse) {}
}

export class ChoiceQuestionAnswerLoadFailAction implements Action {
  public readonly type = ChoiceQuestionAnswerActionTypes.LOAD_FAILURE;
  constructor(public error: any) {}
}

export class ChoiceQuestionAnswerLoadOneAction implements Action {
  public readonly type = ChoiceQuestionAnswerActionTypes.LOADONE;
  constructor(public payload: AnswerRequest) {}
}

export class ChoiceQuestionAnswerLoadOneSuccessAction implements Action {
  public readonly type = ChoiceQuestionAnswerActionTypes.LOADONE_SUCCESS;
  constructor(public payload: AnswerResponse) {}
}

export class ChoiceQuestionAnswerLoadOneFailAction implements Action {
  public readonly type = ChoiceQuestionAnswerActionTypes.LOADONE_FAILURE;
  constructor(public error: any) {}
}

export class ChoiceQuestionAnswerNewAction implements Action {
  public readonly type = ChoiceQuestionAnswerActionTypes.NEW;
  constructor(public payload: AnswerRequest) {}
}

export class ChoiceQuestionAnswerNewSuccessAction implements Action {
  public readonly type = ChoiceQuestionAnswerActionTypes.NEW_SUCCESS;
  constructor(public payload: any) {}
}

export class ChoiceQuestionAnswerNewFailureAction implements Action {
  public readonly type = ChoiceQuestionAnswerActionTypes.NEW_FAILURE;
  constructor(public error: any) {}
}

export class ChoiceQuestionAnswerUpdateAction implements Action {
  public readonly type = ChoiceQuestionAnswerActionTypes.UPDATE;
  constructor(public payload: AnswerRequest) {}
}

export class ChoiceQuestionAnswerUpdateSuccessAction implements Action {
  public readonly type = ChoiceQuestionAnswerActionTypes.UPDATE_SUCCESS;
  constructor(public payload: any) {}
}

export class ChoiceQuestionAnswerUpdateFailureAction implements Action {
  public readonly type = ChoiceQuestionAnswerActionTypes.UPDATE_FAILURE;
  constructor(public error: any) {}
}

export class ChoiceQuestionAnswerDeleteAction implements Action {
  public readonly type = ChoiceQuestionAnswerActionTypes.DELETE;
  constructor(public payload: AnswerRequest) {}
}

export class ChoiceQuestionAnswerDeleteSuccessAction implements Action {
  public readonly type = ChoiceQuestionAnswerActionTypes.DELETE_SUCCESS;
  constructor(public payload: any) {}
}

export class ChoiceQuestionAnswerDeleteFailAction implements Action {
  public readonly type = ChoiceQuestionAnswerActionTypes.DELETE_FAILURE;
  constructor(public error: any) {}
}

export type ChoiceQuestionAnswerActionsAll =
  | ChoiceQuestionAnswerLoadAction
  | ChoiceQuestionAnswerLoadSuccessAction
  | ChoiceQuestionAnswerLoadFailAction
  | ChoiceQuestionAnswerLoadOneAction
  | ChoiceQuestionAnswerLoadOneSuccessAction
  | ChoiceQuestionAnswerLoadOneFailAction
  | ChoiceQuestionAnswerNewAction
  | ChoiceQuestionAnswerNewSuccessAction
  | ChoiceQuestionAnswerNewFailureAction
  | ChoiceQuestionAnswerUpdateAction
  | ChoiceQuestionAnswerUpdateSuccessAction
  | ChoiceQuestionAnswerUpdateFailureAction
  | ChoiceQuestionAnswerDeleteAction
  | ChoiceQuestionAnswerDeleteSuccessAction
  | ChoiceQuestionAnswerDeleteFailAction;
