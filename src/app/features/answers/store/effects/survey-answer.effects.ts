import { Injectable } from '@angular/core';

import { Actions, ofType, Effect } from '@ngrx/effects';

import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { AnswerService } from '../../services/answer.service';

import {
  SurveyAnswerLoadAction,
  SurveyAnswerLoadSuccessAction,
  SurveyAnswerLoadFailAction,
  SurveyAnswerActionTypes
} from '../actions/survey-answer.actions';

import { SurveyAnswerRequest } from '../../../../models/survey-answer.model';

@Injectable()
export class SurveyAnswerEffects {
  constructor(private actions: Actions, private answerService: AnswerService) {}

  @Effect()
  public loadSurveyAnswers = this.actions.pipe(
    ofType<SurveyAnswerLoadAction>(SurveyAnswerActionTypes.LOADING),
    map((action) => action.payload),
    switchMap((params: SurveyAnswerRequest) =>
      this.answerService.getAnswers(params).pipe(
        map((response: any) => new SurveyAnswerLoadSuccessAction(response)),
        catchError((error) => of(new SurveyAnswerLoadFailAction(error)))
      )
    )
  );
}
