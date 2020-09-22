import { Injectable } from '@angular/core';

import { Actions, ofType, Effect } from '@ngrx/effects';

import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { QuestionService } from '../../services/question.service';

import {
  MatrixQuestionActionTypes,
  MatrixQuestionLoadAction,
  MatrixQuestionLoadSuccessAction,
  MatrixQuestionLoadFailAction,
  MatrixQuestionLoadOneAction,
  MatrixQuestionLoadOneFailAction,
  MatrixQuestionNewAction,
  MatrixQuestionNewSuccessAction,
  MatrixQuestionNewFailureAction,
  MatrixQuestionUpdateAction,
  MatrixQuestionUpdateSuccessAction,
  MatrixQuestionUpdateFailureAction,
  MatrixQuestionDeleteAction,
  MatrixQuestionDeleteSuccessAction,
  MatrixQuestionDeleteFailAction
} from '../actions/matrix-question.actions';

import { QuestionResponse, QuestionRequest } from '../../../../models/question.model';

@Injectable()
export class MatrixQuestionEffects {
  constructor(
    private actions: Actions,
    private questionService: QuestionService
  ) {}

  @Effect()
  public loadMatrixQuestions = this.actions.pipe(
    ofType<MatrixQuestionLoadAction>(MatrixQuestionActionTypes.LOADING),
    map((action) => action.payload),
    switchMap((request: QuestionRequest) =>
      this.questionService.getMatrixQuestions(request).pipe(
        map((response: any) => new MatrixQuestionLoadSuccessAction(response)),
        catchError((error) => of(new MatrixQuestionLoadFailAction(error)))
      )
    )
  );

  @Effect()
  public loadOne = this.actions.pipe(
    ofType<MatrixQuestionLoadOneAction>(MatrixQuestionActionTypes.LOADONE),
    map((action) => action.payload),
    switchMap((params: any) =>
      this.questionService.getMatrixQuestions(params).pipe(
        map(
          (response: QuestionResponse) =>
            new MatrixQuestionLoadSuccessAction(response)
        ),
        catchError((error) => of(new MatrixQuestionLoadOneFailAction(error)))
      )
    )
  );

  @Effect()
  public createMatrixQuestion = this.actions.pipe(
    ofType<MatrixQuestionNewAction>(MatrixQuestionActionTypes.NEW),
    map((action) => action.payload),
    switchMap((request: QuestionRequest) =>
      this.questionService.createMatrixQuestion(request).pipe(
        map(
          (response: QuestionResponse) =>
            new MatrixQuestionNewSuccessAction(response)
        ),
        catchError((error) => of(new MatrixQuestionNewFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  public loadOneSuccess = this.actions.pipe(
    ofType<MatrixQuestionLoadOneAction>(
      MatrixQuestionActionTypes.LOADONE_SUCCESS
    ),
    tap((action) => {
      return null;
    })
  );

  @Effect()
  public updateMatrixQuestion = this.actions.pipe(
    ofType<MatrixQuestionUpdateAction>(MatrixQuestionActionTypes.UPDATE),
    map((action) => action.payload),
    switchMap((request: QuestionRequest) =>
      this.questionService.updateMatrixQuestion(request).pipe(
        map((response: any) =>
          of(new MatrixQuestionUpdateSuccessAction(response))
        ),
        catchError((error) => of(new MatrixQuestionUpdateFailureAction(error)))
      )
    )
  );

  @Effect()
  public deleteMatrixQuestion = this.actions.pipe(
    ofType<MatrixQuestionDeleteAction>(MatrixQuestionActionTypes.DELETE),
    map((action) => action.payload),
    switchMap((param: QuestionRequest) =>
      this.questionService.deleteMatrixQuestion(param).pipe(
        map((response: any) => new MatrixQuestionDeleteSuccessAction(response)),
        catchError((error) => of(new MatrixQuestionDeleteFailAction(error)))
      )
    )
  );
}

