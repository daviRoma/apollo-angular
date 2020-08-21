

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, ofType, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { switchMap, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { AuthService } from '../services/auth.service';

import { AuthActionTypes, LogInSuccess, LogInFailure, RegistrationSuccess, RegistrationFailure } from './auth.actions';

import { Paths } from 'src/app/shared/path.conf';

@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  // Login effects

  @Effect()
  LogIn: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    switchMap((request: any) => this.authService.doLogin(request.payload.email, request.payload.password, '')),
    switchMap((loginResp: any) => of(new LogInSuccess(loginResp))),
    catchError((loginResp: any) => {
      console.error('[Login Error]', loginResp);
      return of(new LogInFailure(loginResp));
    })
  );

  @Effect({ dispatch: false })
  LogInSuccess: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((authResp: any) => {
      console.log('resp', authResp);
      localStorage.setItem('token', authResp.payload.access_token);
      localStorage.setItem('expires_in', authResp.payload.expires_in);
      this.router.navigateByUrl(Paths.userHome);
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  // Registration effects

  @Effect()
  Registration: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.REGISTRATION),
    switchMap((payload: any) => this.authService.signUp(payload.username, payload.email, payload.password)),
    switchMap((signupResp: any) => of(new RegistrationSuccess(signupResp))),
    catchError((signupResp: any) => of(new RegistrationFailure(signupResp)))
  );

  @Effect({ dispatch: false })
  RegistrationSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.REGISTRATION_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl(Paths.userHome);
    })
  );

  @Effect({ dispatch: false })
  SignUpFailure: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.REGISTRATION_FAILURE)
  );

  @Effect({ dispatch: false })
  LogOut: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem('token');
    })
  );

}

