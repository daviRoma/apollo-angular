import { Action } from '@ngrx/store';
import {
  ChoiceQuestion,
  QuestionResponse,
  QuestionRequest,
} from '../../../../models/question.model';

export enum ChoiceQuestionActionTypes {
  LOADING = '[Choice Question] Loading',
  LOAD_SUCCESS = '[Choice Question] Loading Success',
  LOAD_FAILURE = '[Choice Question] Loading Failure',
  LOADONE = '[Choice Question] Load One',
  LOADONE_SUCCESS = '[Choice Question] Load One Success',
  LOADONE_FAILURE = '[Choice Question] Load One Failure',
  NEW = '[Choice Question] New',
  NEW_SUCCESS = '[Choice Question] New Success',
  NEW_FAILURE = '[Choice Question] New Failure',
  UPDATE = '[Choice Question] Update',
  UPDATE_SUCCESS = '[Choice Question] Update Success',
  UPDATE_FAILURE = '[Choice Question] Update Failure',
  DELETE = '[Choice Question] Delete',
  DELETE_SUCCESS = '[Choice Question] Delete Success',
  DELETE_FAILURE = '[Choice Question] Delete Failure',
}

export class ChoiceQuestionLoadAction implements Action {
  public readonly type = ChoiceQuestionActionTypes.LOADING;
  constructor(public payload: QuestionRequest) {}
}

export class ChoiceQuestionLoadSuccessAction implements Action {
  public readonly type = ChoiceQuestionActionTypes.LOAD_SUCCESS;
  constructor(public payload: QuestionResponse) {}
}

export class ChoiceQuestionLoadFailAction implements Action {
  public readonly type = ChoiceQuestionActionTypes.LOAD_FAILURE;
  constructor(public error: any) {}
}

export class ChoiceQuestionLoadOneAction implements Action {
  public readonly type = ChoiceQuestionActionTypes.LOADONE;
  constructor(public payload: QuestionRequest) {}
}

export class ChoiceQuestionLoadOneSuccessAction implements Action {
  public readonly type = ChoiceQuestionActionTypes.LOADONE_SUCCESS;
  constructor(public payload: QuestionResponse) {}
}

export class ChoiceQuestionLoadOneFailAction implements Action {
  public readonly type = ChoiceQuestionActionTypes.LOADONE_FAILURE;
  constructor(public error: any) {}
}

export class ChoiceQuestionNewAction implements Action {
  public readonly type = ChoiceQuestionActionTypes.NEW;
  constructor(public payload: QuestionRequest) {}
}

export class ChoiceQuestionNewSuccessAction implements Action {
  public readonly type = ChoiceQuestionActionTypes.NEW_SUCCESS;
  constructor(public payload: any) {}
}

export class ChoiceQuestionNewFailureAction implements Action {
  public readonly type = ChoiceQuestionActionTypes.NEW_FAILURE;
  constructor(public error: any) {}
}

export class ChoiceQuestionUpdateAction implements Action {
  public readonly type = ChoiceQuestionActionTypes.UPDATE;
  constructor(public payload: QuestionRequest) {}
}

export class ChoiceQuestionUpdateSuccessAction implements Action {
  public readonly type = ChoiceQuestionActionTypes.UPDATE_SUCCESS;
  constructor(public payload: any) {}
}

export class ChoiceQuestionUpdateFailureAction implements Action {
  public readonly type = ChoiceQuestionActionTypes.UPDATE_FAILURE;
  constructor(public error: any) {}
}

export class ChoiceQuestionDeleteAction implements Action {
  public readonly type = ChoiceQuestionActionTypes.DELETE;
  constructor(public payload: QuestionRequest) {}
}

export class ChoiceQuestionDeleteSuccessAction implements Action {
  public readonly type = ChoiceQuestionActionTypes.DELETE_SUCCESS;
  constructor(public payload: any) {}
}

export class ChoiceQuestionDeleteFailAction implements Action {
  public readonly type = ChoiceQuestionActionTypes.DELETE_FAILURE;
  constructor(public error: any) {}
}

export type ChoiceQuestionActionsAll =
  | ChoiceQuestionLoadAction
  | ChoiceQuestionLoadSuccessAction
  | ChoiceQuestionLoadFailAction
  | ChoiceQuestionLoadOneAction
  | ChoiceQuestionLoadOneSuccessAction
  | ChoiceQuestionLoadOneFailAction
  | ChoiceQuestionNewAction
  | ChoiceQuestionNewSuccessAction
  | ChoiceQuestionNewFailureAction
  | ChoiceQuestionUpdateAction
  | ChoiceQuestionUpdateSuccessAction
  | ChoiceQuestionUpdateFailureAction
  | ChoiceQuestionDeleteAction
  | ChoiceQuestionDeleteSuccessAction
  | ChoiceQuestionDeleteFailAction;
