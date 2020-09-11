import { Action } from '@ngrx/store';
import { UserRequest, UserResponse, User } from '../../../../models/user.model';

export enum UserActionTypes {
  LOADING = '[User] Loading',
  LOAD_SUCCESS = '[User] Loading Success',
  LOAD_FAILURE = '[User] Loading Failure',
  LOADONE = '[User] Loadone',
  LOADONE_SUCCESS = '[User] Loadone Success',
  LOADONE_FAILURE = '[User] Loadone Failure',
  NEW = '[User] New',
  NEW_SUCCESS = '[User] New Success',
  NEW_FAILURE = '[User] New Failure',
  UPDATE = '[User] Update',
  UPDATE_SUCCESS = '[User] Update Success',
  UPDATE_FAILURE = '[User] Update Failure',
  DELETE = '[User] Delete',
  DELETE_SUCCESS = '[User] Delete Success',
  DELETE_FAILURE = '[User] Delete Failure',
}

export class UserLoadAction implements Action {
  public readonly type = UserActionTypes.LOADING;
  constructor(public payload: UserRequest) {
    console.log("action called: User Load Action")
  }
}

export class UserLoadSuccessAction implements Action {
  public readonly type = UserActionTypes.LOAD_SUCCESS;
  constructor(public payload: UserResponse) {}
}

export class UserLoadFailAction implements Action {
  public readonly type = UserActionTypes.LOAD_FAILURE;
  constructor(public error: any) {}
}

export class UserLoadOneAction implements Action {
  public readonly type = UserActionTypes.LOADONE;
  constructor(public payload: string) {}
}

export class UserLoadOneSuccessAction implements Action {
  public readonly type = UserActionTypes.LOADONE_SUCCESS;
  constructor(public payload: UserResponse) {}
}

export class UserLoadOneFailAction implements Action {
  public readonly type = UserActionTypes.LOADONE_FAILURE;
  constructor(public error: any) {}
}

export class UserNewAction implements Action {
  public readonly type = UserActionTypes.NEW;
  constructor(public payload: User) {}
}

export class UserNewSuccessAction implements Action {
  public readonly type = UserActionTypes.NEW_SUCCESS;
  constructor(public payload: UserResponse) {}
}

export class UserNewFailureAction implements Action {
  public readonly type = UserActionTypes.NEW_FAILURE;
  constructor(public error: any) {}
}

export class UserUpdateAction implements Action {
  public readonly type = UserActionTypes.UPDATE;
  constructor(public payload: User) {}
}

export class UserUpdateSuccessAction implements Action {
  public readonly type = UserActionTypes.UPDATE_SUCCESS;
  constructor(public payload: User) {}
}

export class UserUpdateFailureAction implements Action {
  public readonly type = UserActionTypes.UPDATE_FAILURE;
  constructor(public error: any) {}
}

export class UserDeleteAction implements Action {
  public readonly type = UserActionTypes.DELETE;
  constructor(public payload: number) {}
}

export class UserDeleteSuccessAction implements Action {
  public readonly type = UserActionTypes.DELETE_SUCCESS;
  constructor(public payload: any) {}
}

export class UserDeleteFailAction implements Action {
  public readonly type = UserActionTypes.DELETE_FAILURE;
  constructor(public error: any) {}
}

export type UserActionsAll =
  | UserLoadAction
  | UserLoadSuccessAction
  | UserLoadFailAction
  | UserLoadOneAction
  | UserLoadOneSuccessAction
  | UserLoadOneFailAction
  | UserNewAction
  | UserNewSuccessAction
  | UserNewFailureAction
  | UserUpdateAction
  | UserUpdateSuccessAction
  | UserUpdateFailureAction
  | UserDeleteAction
  | UserDeleteSuccessAction
  | UserDeleteFailAction;
