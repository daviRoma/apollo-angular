import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';

import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { SurveyService } from '../../services/survey.service';

import { SurveyLoadAction, SurveyActionTypes, SurveyLoadSuccessAction, SurveyLoadFailAction, SurveyDeleteAction, SurveyNewAction, SurveyNewSuccessAction, SurveyNewFailureAction, SurveyUpdateAction, SurveyUpdateSuccessAction, SurveyUpdateFailureAction, SurveyLoadOneSuccessAction, SurveyLoadOneFailAction, SurveyLoadOneAction, SurveyDeleteSuccessAction, SurveyDeleteFailAction } from '../actions/survey.actions';
import { SurveyRequest, SurveyResponse, Survey } from 'src/app/models/survey.model';

@Injectable()
export class SurveyEffects {
  constructor(
    private actions: Actions,
    private router: Router,
    private surveyService: SurveyService
  ) {}

  @Effect()
  public loadSurveys = this.actions.pipe(
    ofType<SurveyLoadAction>(SurveyActionTypes.LOADING),
    map((action) => action.payload),
    switchMap((params: SurveyRequest) =>
      this.surveyService.getSurveys(params).pipe(
        map((response: any) => new SurveyLoadSuccessAction(response)),
        catchError((error) => of(new SurveyLoadFailAction(error)))
      )
    )
  );

  @Effect()
  public loadOne = this.actions.pipe(
    ofType<SurveyLoadOneAction>(SurveyActionTypes.LOADONE),
    map((action) => action.payload),
    switchMap((params: string) =>
      this.surveyService.getSurvey(params).pipe(
        map((response: SurveyResponse) => new SurveyLoadOneSuccessAction(response)),
        catchError((error) => of(new SurveyLoadOneFailAction(error)))
    ))
  );

  @Effect()
  public createSurvey = this.actions.pipe(
    ofType<SurveyNewAction>(SurveyActionTypes.NEW),
    map((action) => action.payload),
    switchMap((params: Survey) =>
      this.surveyService.createSurvey(params).pipe(
        map((response: SurveyResponse) => new SurveyLoadOneAction(response.self.split('/')[response.self.split('/').length-1])),
        catchError((error) => of(new SurveyNewFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  public loadOneSuccess = this.actions.pipe(
    ofType<SurveyLoadOneSuccessAction>(SurveyActionTypes.LOADONE_SUCCESS),
    tap((action) => this.router.navigate(['/survey/detail', action.payload.data.id]))
  );

  @Effect()
  public updateSurvey = this.actions.pipe(
    ofType<SurveyUpdateAction>(SurveyActionTypes.UPDATE),
    map((action) => action.payload),
    switchMap((request: Survey) =>
      this.surveyService.updateSurvey(request).pipe(
        map((response: any) => of(new SurveyUpdateSuccessAction(request))),
        catchError((error) => of(new SurveyUpdateFailureAction(error)))
      )
    )
  );

  @Effect()
  public deleteSurvey = this.actions.pipe(
    ofType<SurveyDeleteAction>(SurveyActionTypes.DELETE),
    map((action) => action.payload),
    switchMap((param: string) =>
      this.surveyService.deleteSurvey(param).pipe(
        map((response: any) => new SurveyDeleteSuccessAction(param)),
        catchError((error) => of(new SurveyDeleteFailAction(error)))
      )
    )
  );
}

