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
  MatrixQuestionAnswerNewAction,
  MatrixQuestionAnswerNewSuccessAction,
  MatrixQuestionAnswerNewFailureAction,
  MatrixQuestionAnswerUpdateAction,
  MatrixQuestionAnswerUpdateSuccessAction,
  MatrixQuestionAnswerUpdateFailureAction,
  MatrixQuestionAnswerDeleteAction,
  MatrixQuestionAnswerDeleteSuccessAction,
  MatrixQuestionAnswerDeleteFailAction
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
      this.answerService.getMatrixQuestionsAnswers(request).pipe(
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
      this.answerService.getMatrixQuestionsAnswers(params).pipe(
        map(
          (response: AnswerResponse) =>
            new MatrixQuestionAnswerLoadSuccessAction(response)
        ),
        catchError((error) => of(new MatrixQuestionAnswerLoadOneFailAction(error)))
      )
    )
  );

  @Effect()
  public createMatrixQuestionAnswer = this.actions.pipe(
    ofType<MatrixQuestionAnswerNewAction>(MatrixQuestionAnswerActionTypes.NEW),
    map((action) => action.payload),
    switchMap((request: AnswerRequest) =>
      this.answerService.createMatrixQuestionAnswer(request).pipe(
        map(
          (response: AnswerResponse) =>
            new MatrixQuestionAnswerNewSuccessAction(response)
        ),
        catchError((error) => of(new MatrixQuestionAnswerNewFailureAction(error)))
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

  @Effect()
  public updateMatrixQuestionAnswer = this.actions.pipe(
    ofType<MatrixQuestionAnswerUpdateAction>(MatrixQuestionAnswerActionTypes.UPDATE),
    map((action) => action.payload),
    switchMap((request: AnswerRequest) =>
      this.answerService.updateMatrixQuestionAnswer(request).pipe(
        map((response: any) =>
          of(new MatrixQuestionAnswerUpdateSuccessAction(response))
        ),
        catchError((error) => of(new MatrixQuestionAnswerUpdateFailureAction(error)))
      )
    )
  );

  @Effect()
  public deleteMatrixQuestion = this.actions.pipe(
    ofType<MatrixQuestionAnswerDeleteAction>(MatrixQuestionAnswerActionTypes.DELETE),
    map((action) => action.payload),
    switchMap((param: AnswerRequest) =>
      this.answerService.deleteMatrixQuestionAnswer(param).pipe(
        map((response: any) => new MatrixQuestionAnswerDeleteSuccessAction(response)),
        catchError((error) => of(new MatrixQuestionAnswerDeleteFailAction(error)))
      )
    )
  );
}

