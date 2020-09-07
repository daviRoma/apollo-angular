import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';

import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { UserService } from '../../services/user.service';

import {
  UserLoadAction,
  UserActionTypes,
  UserLoadSuccessAction,
  UserLoadFailAction,
  UserDeleteAction,
  UserNewAction,
  UserNewFailureAction,
  UserUpdateAction,
  UserUpdateSuccessAction,
  UserUpdateFailureAction,
  UserLoadOneSuccessAction,
  UserLoadOneFailAction,
  UserLoadOneAction,
  UserDeleteSuccessAction,
  UserDeleteFailAction,
} from '../actions/user.actions';
import { UserRequest } from '../../../../models/user.model';



@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private router: Router,
    private userService: UserService
  ) {}

  @Effect()
  public loadUsers = this.actions.pipe(
    ofType<UserLoadAction>(UserActionTypes.LOADING),
    map((action) => action.payload),
    switchMap((params: UserRequest) =>
      this.userService.getUsers(params).pipe(
        map((response: any) => new UserLoadSuccessAction(response)),
        catchError((error) => of(new UserLoadFailAction(error)))
      )
    )
  );

  @Effect()
  public loadOne = this.actions.pipe(
    ofType<UserLoadOneAction>(UserActionTypes.LOADONE),
    map((action) => action.payload),
    switchMap((params: string) =>
      this.userService.getUser(params).pipe(
        map((response: UserResponse) => new UserLoadOneSuccessAction(response)),
        catchError((error) => of(new UserLoadOneFailAction(error)))
      )
    )
  );

  @Effect()
  public createUser = this.actions.pipe(
    ofType<UserNewAction>(UserActionTypes.NEW),
    map((action) => action.payload),
    switchMap((params: User) =>
      this.userService.createUser(params).pipe(
        map(
          (response: UserResponse) =>
            new UserLoadOneAction(
              response.self.split('/')[response.self.split('/').length - 1]
            )
        ),
        catchError((error) => of(new UserNewFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  public loadOneSuccess = this.actions.pipe(
    ofType<UserLoadOneSuccessAction>(UserActionTypes.LOADONE_SUCCESS),
    tap((action) =>
      this.router.navigate(['/user/detail', action.payload.data.id])
    )
  );

  @Effect()
  public updateUser = this.actions.pipe(
    ofType<UserUpdateAction>(UserActionTypes.UPDATE),
    map((action) => action.payload),
    switchMap((request: User) =>
      this.userService.updateUser(request).pipe(
        map((response: any) => new UserUpdateSuccessAction(request)),
        catchError((error) => of(new UserUpdateFailureAction(error)))
      )
    )
  );

  @Effect()
  public deleteUser = this.actions.pipe(
    ofType<UserDeleteAction>(UserActionTypes.DELETE),
    map((action) => action.payload),
    switchMap((param: string) =>
      this.userService.deleteUser(param).pipe(
        map((response: any) => new UserDeleteSuccessAction(param)),
        catchError((error) => of(new UserDeleteFailAction(error)))
      )
    )
  );
}
