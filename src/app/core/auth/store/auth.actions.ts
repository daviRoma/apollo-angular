import { Action } from '@ngrx/store';
import { RegistrationRequest } from 'src/app/models/user.model';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  REGISTRATION = '[Auth] Registration',
  REGISTRATION_SUCCESS = '[Auth] Registration Success',
  REGISTRATION_FAILURE = '[Auth] Registration Failure',
  LOGOUT = '[Auth] Logout',
  LOAD_SESSIONUSER = '[Auth] Load Session User',
  LOAD_SESSIONUSER_SUCCESS = '[Auth] Load Session User Success',
  LOAD_SESSIONUSER_FAILURE = '[Auth] Load Session User Failure',
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: any) {}
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class Registration implements Action {
  readonly type = AuthActionTypes.REGISTRATION;
  constructor(public payload: RegistrationRequest) {}
}

export class RegistrationSuccess implements Action {
  readonly type = AuthActionTypes.REGISTRATION_SUCCESS;
  constructor(public payload: any) {}
}

export class RegistrationFailure implements Action {
  readonly type = AuthActionTypes.REGISTRATION_FAILURE;
  constructor(public payload: any) {}
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class LoadSessionUser implements Action {
  readonly type = AuthActionTypes.LOAD_SESSIONUSER;
  constructor() {}
}

export class LoadSessionUserSuccess implements Action {
  readonly type = AuthActionTypes.LOAD_SESSIONUSER_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadSessionUserFailure implements Action {
  readonly type = AuthActionTypes.LOAD_SESSIONUSER_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  LogIn
  | LogInSuccess
  | LogInFailure
  | Registration
  | RegistrationSuccess
  | RegistrationFailure
  | LogOut
  | LoadSessionUser
  | LoadSessionUserSuccess
  | LoadSessionUserFailure;
