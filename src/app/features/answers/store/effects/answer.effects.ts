import { Injectable } from '@angular/core';

import { Actions, ofType, Effect } from '@ngrx/effects';

import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { AnswerService } from '../../services/answer.service';

import {
  AnswerActionTypes,
  AnswerLoadAction,
  AnswerLoadSuccessAction,
  AnswerLoadFailAction,
  AnswerLoadByQuestionAction,
  AnswerLoadByQuestionSuccessAction,
  AnswerLoadByQuestionFailAction
} from '../actions/answer.actions';

import { AnswerRequest } from '../../../../models/answer.model';

@Injectable()
export class AnswerEffects {
  constructor(private actions: Actions, private answerService: AnswerService) {}

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
  public loadOneAnswer = this.actions.pipe(
    ofType<AnswerLoadByQuestionAction>(AnswerActionTypes.LOAD_BY_QUESTION),
    map((action) => action.payload),
    switchMap((params: AnswerRequest) =>
      this.answerService.getAnswerByQuestion(params).pipe(
        map((response: any) => new AnswerLoadByQuestionSuccessAction(response)),
        catchError((error) => of(new AnswerLoadByQuestionFailAction(error)))
      )
    )
  );

}
