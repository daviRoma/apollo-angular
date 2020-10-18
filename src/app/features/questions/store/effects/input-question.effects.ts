import { Injectable } from '@angular/core';

import { Actions, ofType, Effect } from '@ngrx/effects';

import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { QuestionService } from '../../services/question.service';

import {
  InputQuestionActionTypes,
  InputQuestionLoadAction,
  InputQuestionLoadSuccessAction,
  InputQuestionLoadFailAction,
  InputQuestionLoadOneAction,
  InputQuestionLoadOneFailAction,
  InputQuestionNewAction,
  InputQuestionNewSuccessAction,
  InputQuestionNewFailureAction,
  InputQuestionUpdateAction,
  InputQuestionUpdateSuccessAction,
  InputQuestionUpdateFailureAction,
  InputQuestionDeleteAction,
  InputQuestionDeleteSuccessAction,
  InputQuestionDeleteFailAction
} from '../actions/input-question.actions';

import { QuestionResponse, QuestionRequest } from '../../../../models/question.model';

@Injectable()
export class InputQuestionEffects {
  constructor(
    private actions: Actions,
    private questionService: QuestionService
  ) {}

  @Effect()
  public loadInputQuestions = this.actions.pipe(
    ofType<InputQuestionLoadAction>(InputQuestionActionTypes.LOADING),
    map((action) => action.payload),
    switchMap((request: QuestionRequest) =>
      this.questionService.getInputQuestions(request).pipe(
        map((response: any) => new InputQuestionLoadSuccessAction(response)),
        catchError((error) => of(new InputQuestionLoadFailAction(error)))
      )
    )
  );

  @Effect()
  public loadOne = this.actions.pipe(
    ofType<InputQuestionLoadOneAction>(InputQuestionActionTypes.LOADONE),
    map((action) => action.payload),
    switchMap((params: any) =>
      this.questionService.getInputQuestions(params).pipe(
        map(
          (response: QuestionResponse) =>
            new InputQuestionLoadSuccessAction(response)
        ),
        catchError((error) => of(new InputQuestionLoadOneFailAction(error)))
      )
    )
  );

  @Effect()
  public createInputQuestion = this.actions.pipe(
    ofType<InputQuestionNewAction>(InputQuestionActionTypes.NEW),
    map((action) => action.payload),
    switchMap((request: QuestionRequest) =>
      this.questionService.createInputQuestion(request).pipe(
        map((response: QuestionResponse) => new InputQuestionNewSuccessAction(response)),
        catchError((error) => of(new InputQuestionNewFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  public loadOneSuccess = this.actions.pipe(
    ofType<InputQuestionLoadOneAction>(
      InputQuestionActionTypes.LOADONE_SUCCESS
    ),
    tap((action) => {
      return null;
    })
  );

  @Effect()
  public updateInputQuestion = this.actions.pipe(
    ofType<InputQuestionUpdateAction>(InputQuestionActionTypes.UPDATE),
    map((action) => action.payload),
    switchMap((request: QuestionRequest) =>
      this.questionService.updateInputQuestion(request).pipe(
        map((response: any) => new InputQuestionUpdateSuccessAction(request)),
        catchError((error) => of(new InputQuestionUpdateFailureAction(error)))
      )
    )
  );

  @Effect()
  public deleteInputQuestion = this.actions.pipe(
    ofType<InputQuestionDeleteAction>(InputQuestionActionTypes.DELETE),
    map((action) => action.payload),
    switchMap((param: QuestionRequest) =>
      this.questionService.deleteInputQuestion(param).pipe(
        map((response: any) => new InputQuestionDeleteSuccessAction(response)),
        catchError((error) => of(new InputQuestionDeleteFailAction(error)))
      )
    )
  );
}

