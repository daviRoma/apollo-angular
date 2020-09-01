import { Action } from '@ngrx/store';
import { QuestionGroup, QuestionGroupResponse } from '../../../models/question-group.model';

export enum QuestionGroupActionTypes {
  LOADING = '[QuestionGroup] Loading',
  LOAD_SUCCESS = '[QuestionGroup] Loading Success',
  LOAD_FAILURE = '[QuestionGroup] Loading Failure',
  NEW = '[QuestionGroup] New',
  NEW_SUCCESS = '[QuestionGroup] New Success',
  NEW_FAILURE = '[QuestionGroup] New Failure',
  UPDATE = '[QuestionGroup] Update',
  UPDATE_SUCCESS = '[QuestionGroup] Update Success',
  UPDATE_FAILURE = '[QuestionGroup] Update Failure',
  DELETE = '[QuestionGroup] Delete',
  DELETE_SUCCESS = '[QuestionGroup] Delete Success',
  DELETE_FAILURE = '[QuestionGroup] Delete Failure',
}

export class QuestionGroupLoadAction implements Action {
  public readonly type = QuestionGroupActionTypes.LOADING;
  constructor(public payload: string) {}
}

export class QuestionGroupLoadSuccessAction implements Action {
  public readonly type = QuestionGroupActionTypes.LOAD_SUCCESS;
  constructor(public payload: QuestionGroupResponse) {}
}

export class QuestionGroupLoadFailAction implements Action {
  public readonly type = QuestionGroupActionTypes.LOAD_FAILURE;
  constructor(public error: any) {}
}

export class QuestionGroupNewAction implements Action {
  public readonly type = QuestionGroupActionTypes.NEW;
  constructor(public payload: QuestionGroup) {}
}

export class QuestionGroupNewSuccessAction implements Action {
  public readonly type = QuestionGroupActionTypes.NEW_SUCCESS;
  constructor(public payload: any) {}
}

export class QuestionGroupNewFailureAction implements Action {
  public readonly type = QuestionGroupActionTypes.NEW_FAILURE;
  constructor(public error: any) {}
}

export class QuestionGroupUpdateAction implements Action {
  public readonly type = QuestionGroupActionTypes.UPDATE;
  constructor(public payload: QuestionGroup) {}
}

export class QuestionGroupUpdateSuccessAction implements Action {
  public readonly type = QuestionGroupActionTypes.UPDATE_SUCCESS;
  constructor(public payload: any) {}
}

export class QuestionGroupUpdateFailureAction implements Action {
  public readonly type = QuestionGroupActionTypes.UPDATE_FAILURE;
  constructor(public error: any) {}
}

export class QuestionGroupDeleteAction implements Action {
  public readonly type = QuestionGroupActionTypes.DELETE;
  constructor(public payload: string) {}
}

export class QuestionGroupDeleteSuccessAction implements Action {
  public readonly type = QuestionGroupActionTypes.DELETE_SUCCESS;
  constructor(public payload: any) {}
}

export class QuestionGroupDeleteFailAction implements Action {
  public readonly type = QuestionGroupActionTypes.DELETE_FAILURE;
  constructor(public error: any) {}
}

export type QuestionGroupActionsAll =
  | QuestionGroupLoadAction
  | QuestionGroupLoadSuccessAction
  | QuestionGroupLoadFailAction
  | QuestionGroupNewAction
  | QuestionGroupNewSuccessAction
  | QuestionGroupNewFailureAction
  | QuestionGroupUpdateAction
  | QuestionGroupUpdateSuccessAction
  | QuestionGroupUpdateFailureAction
  | QuestionGroupDeleteAction
  | QuestionGroupDeleteSuccessAction
  | QuestionGroupDeleteFailAction;
