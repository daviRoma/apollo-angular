import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';

import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { InvitationPoolService } from '../../services/invitation-pool.service';
import { SurveyService } from '../../services/survey.service';

import { InvitationPoolLoadOneAction, InvitationPoolActionTypes, InvitationPoolLoadOneSuccessAction, InvitationPoolLoadOneFailAction, InvitationPoolNewAction, InvitationPoolNewSuccessAction, InvitationPoolUpdateAction, InvitationPoolUpdateSuccessAction, InvitationPoolUpdateFailureAction, InvitationPoolDeleteAction } from '../actions/invitation-pool.actions';
import { SurveyLoadOneSuccessAction, SurveyLoadOneFailAction } from '../actions/survey.actions';
import { InvitationPoolRequest, InvitationPool } from '../../../../models/invitation-pool.model';
import { SurveyResponse } from '../../../../models/survey.model';

@Injectable()
export class InvitationPoolEffects {
  constructor(
    private actions: Actions,
    private invitationPoolService: InvitationPoolService,
    private surveyService: SurveyService
  ) {}

  @Effect()
  public loadOne = this.actions.pipe(
    ofType<InvitationPoolLoadOneAction>(InvitationPoolActionTypes.LOADONE),
    map((action) => action.payload),
    switchMap((params: InvitationPoolRequest) =>
      this.invitationPoolService.getInvitationPool(params).pipe(
        map((response: InvitationPool) => new InvitationPoolLoadOneSuccessAction(response)),
        catchError((error) => of(new InvitationPoolLoadOneFailAction(error)))
      )
    )
  );

  @Effect()
  public createInvitationPool = this.actions.pipe(
    ofType<InvitationPoolNewAction>(InvitationPoolActionTypes.NEW),
    map((action) => action.payload),
    switchMap((request: InvitationPoolRequest) =>
      this.invitationPoolService.createInvitationPool(request).pipe(
        map((response: InvitationPool) => new InvitationPoolNewSuccessAction(request.surveyId)),
        catchError((error) => of(new InvitationPoolLoadOneFailAction(error)))
      )
    )
  );

  @Effect()
  public createSuccess = this.actions.pipe(
    ofType<InvitationPoolNewSuccessAction>(InvitationPoolActionTypes.UPDATE_SUCCESS),
    map((action) => action.payload),
    switchMap(
      (request: number) => this.surveyService.getSurvey(request).pipe(
        map((response: SurveyResponse) => new SurveyLoadOneSuccessAction(response)),
        catchError((error) => of(new SurveyLoadOneFailAction(error)))
      ))
  );

  @Effect()
  public updateInvitationPool = this.actions.pipe(
    ofType<InvitationPoolUpdateAction>(InvitationPoolActionTypes.UPDATE),
    map((action) => action.payload),
    switchMap((request: InvitationPoolRequest) =>
      this.invitationPoolService.updateInvitationPool(request).pipe(
        map((response: any) => new InvitationPoolUpdateSuccessAction(request.surveyId)),
        catchError((error) => of(new InvitationPoolUpdateFailureAction(error)))
      )
    )
  );

  @Effect()
  public updateSuccess = this.actions.pipe(
    ofType<InvitationPoolUpdateSuccessAction>(InvitationPoolActionTypes.UPDATE_SUCCESS),
    map((action) => action.payload),
    switchMap(
      (request: number) => this.surveyService.getSurvey(request).pipe(
        map((response: SurveyResponse) => new SurveyLoadOneSuccessAction(response)),
        catchError((error) => of(new SurveyLoadOneFailAction(error)))
      ))
  );

  @Effect()
  public deleteInvitationPool = this.actions.pipe(
    ofType<InvitationPoolDeleteAction>(InvitationPoolActionTypes.DELETE),
    map((action) => action.payload),
    switchMap((request: InvitationPoolRequest) =>
      this.invitationPoolService.deleteInvitationPool(request).pipe(
        map((response: any) => new InvitationPoolUpdateSuccessAction(response)),
        catchError((error) => of(new InvitationPoolLoadOneFailAction(error)))
      )
    )
  );

}

