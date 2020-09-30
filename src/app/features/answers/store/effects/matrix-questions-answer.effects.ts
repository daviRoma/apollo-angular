import { Injectable } from '@angular/core';

import { Actions, ofType, Effect } from '@ngrx/effects';

import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { AnswerService } from '../../services/answer.service';

import {
  MatrixQuestionAnswerActionTypes,
  MatrixQuestionAnswerLoadAction,
  MatrixQuestionAnswerLoadSuccessAction,
  MatrixQuestionAnswerLoadFailAction,
  MatrixQuestionAnswerLoadOneAction,
  MatrixQuestionAnswerLoadOneFailAction,
} from '../actions/matrix-question-answer.actions';

import { AnswerResponse, AnswerRequest } from '../../../../models/answer.model';

@Injectable()
export class MatrixQuestionAnswerEffects {
  constructor(
    private actions: Actions,
    private answerService: AnswerService
  ) {}

  @Effect()
  public loadMatrixQuestionsAnswers = this.actions.pipe(
    ofType<MatrixQuestionAnswerLoadAction>(MatrixQuestionAnswerActionTypes.LOADING),
    map((action) => action.payload),
    switchMap((request: AnswerRequest) =>
      this.answerService.getAnswers(request).pipe(
        map((response: any) => new MatrixQuestionAnswerLoadSuccessAction(response)),
        catchError((error) => of(new MatrixQuestionAnswerLoadFailAction(error)))
      )
    )
  );

  @Effect()
  public loadOne = this.actions.pipe(
    ofType<MatrixQuestionAnswerLoadOneAction>(MatrixQuestionAnswerActionTypes.LOADONE),
    map((action) => action.payload),
    switchMap((params: any) =>
      this.answerService.getAnswer(params).pipe(
        map(
          (response: AnswerResponse) =>
            new MatrixQuestionAnswerLoadSuccessAction(response)
        ),
        catchError((error) => of(new MatrixQuestionAnswerLoadOneFailAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  public loadOneSuccess = this.actions.pipe(
    ofType<MatrixQuestionAnswerLoadOneAction>(
      MatrixQuestionAnswerActionTypes.LOADONE_SUCCESS
    ),
    tap((action) => {
      return null;
    })
  );

}

