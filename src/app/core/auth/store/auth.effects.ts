

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, ofType, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { AuthService } from '../services/auth.service';

import { AuthActionTypes, LogInSuccess, LogInFailure, RegistrationSuccess, RegistrationFailure, LoadSessionUser, LoadSessionUserSuccess, LoadSessionUserFailure, LogOut, Registration } from './auth.actions';

import { Paths } from 'src/app/shared/config/path.conf';
import { RegistrationRequest, User } from 'src/app/models/user.model';

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
    switchMap(
      (request: any) =>
      this.authService.doLogin(request.payload.email, request.payload.password).pipe(
        map((response: any) => new LogInSuccess(response)),
        catchError((error: any) => of(new LogInFailure(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  LogInSuccess: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((authResp: any) => {
      this.authService.setStorage(authResp.payload);
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
    ofType<Registration>(AuthActionTypes.REGISTRATION),
    map((action) => action.payload),
    switchMap((request: RegistrationRequest) => this.authService.signUp(request).pipe(
      map((response: User) => new RegistrationSuccess(response)),
      catchError((error: any) => of(new RegistrationFailure(error)))
    ))
  );

  @Effect({ dispatch: false })
  RegistrationSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.REGISTRATION_SUCCESS),
    tap((user) => {
      this.router.navigateByUrl('/auth/login');
    })
  );

  @Effect({ dispatch: false })
  SignUpFailure: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.REGISTRATION_FAILURE)
  );

  @Effect({ dispatch: false })
  LogOut: Observable<Action> = this.actions.pipe(
    ofType<LogOut>(AuthActionTypes.LOGOUT),
    tap(() => this.authService.logout())
  );

  @Effect()
  public loadSessionUser = this.actions.pipe(
    ofType<LoadSessionUser>(AuthActionTypes.LOAD_SESSIONUSER),
    switchMap(() =>
      this.authService.getCurrentUser().pipe(
        map((response: User) => new LoadSessionUserSuccess({...response, token: localStorage.getItem('token')})),
        catchError((error) => of(new LoadSessionUserFailure(error)))
      )
    )
  );

}

