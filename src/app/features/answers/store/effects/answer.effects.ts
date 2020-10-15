import { Injectable } from '@angular/core';

import { Actions, ofType, Effect } from '@ngrx/effects';

import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { AnswerService } from '../../services/answer.service';

import {
  AnswerActionTypes,
  AnswerLoadAction,
  AnswerLoadSuccessAction,
  AnswerLoadFailAction,
  SubmitAnswersAction,
  SubmitAnswerSuccessAction,
  SubmitAnswerFailureAction
} from '../actions/answer.actions';

import { AnswerRequest, AnswerResponse } from '../../../../models/answer.model';

@Injectable()
export class AnswerEffects {
  constructor(private actions: Actions, private answerService: AnswerService) { }

  @Effect()
  public loadAnswers = this.actions.pipe(
    ofType<AnswerLoadAction>(AnswerActionTypes.LOADING),
    map((action) => action.payload),
    switchMap((params: AnswerRequest) =>
      this.answerService.getAnswers(params).pipe(
        map((response: any) => new AnswerLoadSuccessAction(response)),
        catchError((error) => of(new AnswerLoadFailAction(error)))
      )
    )
  );

  @Effect()
  public submitSurveyAnswer = this.actions.pipe(
    ofType<SubmitAnswersAction>(AnswerActionTypes.SUBMIT_ANSWER),
    map((action) => action.payload),
    switchMap((request: AnswerRequest) =>
      this.answerService.createAnswers(request).pipe(
        map((response: AnswerResponse) => new SubmitAnswerSuccessAction(response)),
        catchError((error) => of(new SubmitAnswerFailureAction(error))))
    )
  );

}
