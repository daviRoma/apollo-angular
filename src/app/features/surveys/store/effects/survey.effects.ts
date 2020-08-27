

import { Injectable } from '@angular/core';

import { Actions, ofType, Effect } from '@ngrx/effects';

import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { SurveyService } from '../services/survey.service';

import { SurveyLoadAction, SurveyActionTypes, SurveyLoadSuccessAction, SurveyLoadFailAction, SurveyDeleteAction, SurveyNewAction, SurveyNewSuccessAction, SurveyNewFailureAction } from '../actions/survey.actions';
import { SurveyRequest, SurveyResponse, Survey } from 'src/app/models/survey.model';

@Injectable()
export class SurveyEffects {
  constructor(private actions: Actions, private surveyService: SurveyService) {}

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
  public createSurvey = this.actions.pipe(
    ofType<SurveyNewAction>(SurveyActionTypes.NEW),
    map((action) => action.payload),
    switchMap((params: Survey) =>
      this.surveyService.createSurvey(params).pipe(
        map((response: any) => new SurveyNewSuccessAction(response)),
        catchError((error) => of(new SurveyNewFailureAction(error)))
      )
    )
  );

  @Effect()
  public deleteSurvey = this.actions.pipe(
    ofType<SurveyDeleteAction>(SurveyActionTypes.DELETE),
    map((action) => action.payload),
    switchMap((param: string) =>
      this.surveyService.deleteSurvey(param).pipe(
        map(
          (response: SurveyResponse) => new SurveyLoadSuccessAction(response)
        ),
        catchError((error) => of(new SurveyLoadFailAction(error)))
      )
    )
  );
}

