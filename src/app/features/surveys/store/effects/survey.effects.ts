import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';

import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { SurveyService } from '../../services/survey.service';

import {
  SurveyLoadAction,
  SurveyActionTypes,
  SurveyLoadSuccessAction,
  SurveyLoadFailAction,
  SurveyDeleteAction,
  SurveyNewAction,
  SurveyNewFailureAction,
  SurveyUpdateAction,
  SurveyUpdateSuccessAction,
  SurveyUpdateFailureAction,
  SurveyLoadOneSuccessAction,
  SurveyLoadOneFailAction,
  SurveyLoadOneAction,
  SurveyDeleteSuccessAction,
  SurveyDeleteFailAction,
  SurveyLoadOneRedirectAction,
  SurveyPublishAction,
  SurveyPublishSuccessAction,
  SurveyPublishFailureAction
} from '../actions/survey.actions';
import { SurveyRequest, SurveyResponse, Survey, SurveyPublishRequest } from 'src/app/models/survey.model';

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
    switchMap((params: number) =>
      this.surveyService.getSurvey(params).pipe(
        map((response: SurveyResponse) => new SurveyLoadOneSuccessAction(response)),
        catchError((error) => of(new SurveyLoadOneFailAction(error)))
      )
    )
  );

  // @Effect({ dispatch: false })
  // public loadOneRedirect = this.actions.pipe(
  //   ofType<SurveyLoadOneRedirectAction>(SurveyActionTypes.LOADONE_REDIRECT),
  //   // tap((action) => this.router.navigate(['/survey/detail', action.payload.data.id]))
  //   map((action) => )

  // );

  @Effect()
  public createSurvey = this.actions.pipe(
    ofType<SurveyNewAction>(SurveyActionTypes.NEW),
    map((action) => action.payload),
    switchMap((params: Survey) =>
      this.surveyService.createSurvey(params).pipe(
        map((response: SurveyResponse) => new SurveyLoadOneAction(
          parseInt(response.self.split('/')[response.self.split('/').length - 1], 0)
          )
        ),
        catchError((error) => of(new SurveyNewFailureAction(error)))
      )
    )
  );

  @Effect()
  public updateSurvey = this.actions.pipe(
    ofType<SurveyUpdateAction>(SurveyActionTypes.UPDATE),
    map((action) => action.payload),
    switchMap((request: Survey) =>
      this.surveyService.updateSurvey(request).pipe(
        map((response: any) => new SurveyUpdateSuccessAction(request.id)),
        catchError((error) => of(new SurveyUpdateFailureAction(error)))
      )
    )
  );

  @Effect()
  public updateSuccess = this.actions.pipe(
    ofType<SurveyUpdateSuccessAction>(SurveyActionTypes.UPDATE_SUCCESS),
    map((action) => action.payload),
    switchMap(
      (request: number) => this.surveyService.getSurvey(request).pipe(
        map((response: SurveyResponse) => new SurveyLoadOneSuccessAction(response)),
        catchError((error) => of(new SurveyLoadOneFailAction(error)))
      ))
  );

  @Effect()
  public deleteSurvey = this.actions.pipe(
    ofType<SurveyDeleteAction>(SurveyActionTypes.DELETE),
    map((action) => action.payload),
    switchMap((param: number) =>
      this.surveyService.deleteSurvey(param).pipe(
        map((response: any) => new SurveyDeleteSuccessAction(param)),
        catchError((error) => of(new SurveyDeleteFailAction(error)))
      )
    )
  );

  @Effect()
  public publishSurvey = this.actions.pipe(
    ofType<SurveyPublishAction>(SurveyActionTypes.PUBLISH),
    map((action) => action.payload),
    switchMap((request: SurveyPublishRequest) =>
      this.surveyService.publishSurvey(request).pipe(
        map((response: any) => new SurveyUpdateSuccessAction(request.id)),
        catchError((error) => of(new SurveyPublishFailureAction(error)))
      )
    )
  );

  // @Effect()
  // public publishSuccess = this.actions.pipe(
  //   ofType<SurveyPublishSuccessAction>(SurveyActionTypes.PUBLISH_SUCCESS),
  //   map((action) => action.payload),
  //   switchMap(
  //     (request: number) => this.surveyService.getSurvey(request).pipe(
  //       map((response: SurveyResponse) => new SurveyLoadOneSuccessAction(response)),
  //       catchError((error) => of(new SurveyLoadOneFailAction(error)))
  //     ))
  // );

}

