import { Action } from '@ngrx/store';
import { InvitationPool, InvitationPoolRequest } from '../../../../models/invitation-pool.model';

export enum InvitationPoolActionTypes {
  LOADONE = '[InvitationPool] Loadone',
  LOADONE_SUCCESS = '[InvitationPool] Loadone Success',
  LOADONE_FAILURE = '[InvitationPool] Loadone Failure',
  NEW = '[InvitationPool] New',
  NEW_SUCCESS = '[InvitationPool] New Success',
  NEW_FAILURE = '[InvitationPool] New Failure',
  UPDATE = '[InvitationPool] Update',
  UPDATE_SUCCESS = '[InvitationPool] Update Success',
  UPDATE_FAILURE = '[InvitationPool] Update Failure',
  DELETE = '[InvitationPool] Delete',
  DELETE_SUCCESS = '[InvitationPool] Delete Success',
  DELETE_FAILURE = '[InvitationPool] Delete Failure',
}

export class InvitationPoolLoadOneAction implements Action {
  public readonly type = InvitationPoolActionTypes.LOADONE;
  constructor(public payload: InvitationPoolRequest) {}
}

export class InvitationPoolLoadOneSuccessAction implements Action {
  public readonly type = InvitationPoolActionTypes.LOADONE_SUCCESS;
  constructor(public payload: InvitationPool) {}
}

export class InvitationPoolLoadOneFailAction implements Action {
  public readonly type = InvitationPoolActionTypes.LOADONE_FAILURE;
  constructor(public error: any) {}
}

export class InvitationPoolNewAction implements Action {
  public readonly type = InvitationPoolActionTypes.NEW;
  constructor(public payload: InvitationPoolRequest) {}
}

export class InvitationPoolNewSuccessAction implements Action {
  public readonly type = InvitationPoolActionTypes.NEW_SUCCESS;
  constructor(public payload: any) {}
}

export class InvitationPoolNewFailureAction implements Action {
  public readonly type = InvitationPoolActionTypes.NEW_FAILURE;
  constructor(public error: any) {}
}

export class InvitationPoolUpdateAction implements Action {
  public readonly type = InvitationPoolActionTypes.UPDATE;
  constructor(public payload: InvitationPoolRequest) {}
}

export class InvitationPoolUpdateSuccessAction implements Action {
  public readonly type = InvitationPoolActionTypes.UPDATE_SUCCESS;
  constructor(public payload: number) {}
}

export class InvitationPoolUpdateFailureAction implements Action {
  public readonly type = InvitationPoolActionTypes.UPDATE_FAILURE;
  constructor(public error: any) {}
}

export class InvitationPoolDeleteAction implements Action {
  public readonly type = InvitationPoolActionTypes.DELETE;
  constructor(public payload: InvitationPoolRequest) {}
}

export class InvitationPoolDeleteSuccessAction implements Action {
  public readonly type = InvitationPoolActionTypes.DELETE_SUCCESS;
  constructor(public payload: any) {}
}

export class InvitationPoolDeleteFailAction implements Action {
  public readonly type = InvitationPoolActionTypes.DELETE_FAILURE;
  constructor(public error: any) {}
}

export type InvitationPoolActionsAll =
  | InvitationPoolLoadOneAction
  | InvitationPoolLoadOneSuccessAction
  | InvitationPoolLoadOneFailAction
  | InvitationPoolNewAction
  | InvitationPoolNewSuccessAction
  | InvitationPoolNewFailureAction
  | InvitationPoolUpdateAction
  | InvitationPoolUpdateSuccessAction
  | InvitationPoolUpdateFailureAction
  | InvitationPoolDeleteAction
  | InvitationPoolDeleteSuccessAction
  | InvitationPoolDeleteFailAction
  | InvitationPoolUpdateFailureAction;
