import { Injectable } from '@angular/core';

import { Actions, ofType, Effect } from '@ngrx/effects';

import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { AnswerService } from '../../services/answer.service';

import {
  InputQuestionAnswerActionTypes,
  InputQuestionAnswerLoadAction,
  InputQuestionAnswerLoadSuccessAction,
  InputQuestionAnswerLoadFailAction,
  InputQuestionAnswerLoadOneAction,
  InputQuestionAnswerLoadOneFailAction,
  InputQuestionAnswerNewAction,
  InputQuestionAnswerNewSuccessAction,
  InputQuestionAnswerNewFailureAction,
  InputQuestionAnswerUpdateAction,
  InputQuestionAnswerUpdateSuccessAction,
  InputQuestionAnswerUpdateFailureAction,
  InputQuestionAnswerDeleteAction,
  InputQuestionAnswerDeleteSuccessAction,
  InputQuestionAnswerDeleteFailAction
} from '../actions/input-question-answer.actions';

import { AnswerResponse, AnswerRequest } from '../../../../models/answer.model';

@Injectable()
export class InputQuestionAnswerEffects {
  constructor(
    private actions: Actions,
    private answerService: AnswerService
  ) {}

  @Effect()
  public loadInputQuestionsAnswers = this.actions.pipe(
    ofType<InputQuestionAnswerLoadAction>(InputQuestionAnswerActionTypes.LOADING),
    map((action) => action.payload),
    switchMap((request: AnswerRequest) =>
      this.answerService.getInputQuestionsAnswers(request).pipe(
        map((response: any) => new InputQuestionAnswerLoadSuccessAction(response)),
        catchError((error) => of(new InputQuestionAnswerLoadFailAction(error)))
      )
    )
  );

  @Effect()
  public loadOne = this.actions.pipe(
    ofType<InputQuestionAnswerLoadOneAction>(InputQuestionAnswerActionTypes.LOADONE),
    map((action) => action.payload),
    switchMap((params: any) =>
      this.answerService.getInputQuestionsAnswers(params).pipe(
        map(
          (response: AnswerResponse) =>
            new InputQuestionAnswerLoadSuccessAction(response)
        ),
        catchError((error) => of(new InputQuestionAnswerLoadOneFailAction(error)))
      )
    )
  );

  @Effect()
  public createInputQuestionAnswer = this.actions.pipe(
    ofType<InputQuestionAnswerNewAction>(InputQuestionAnswerActionTypes.NEW),
    map((action) => action.payload),
    switchMap((request: AnswerRequest) =>
      this.answerService.createInputQuestionAnswer(request).pipe(
        map(
          (response: AnswerResponse) =>
            new InputQuestionAnswerNewSuccessAction(response)
        ),
        catchError((error) => of(new InputQuestionAnswerNewFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  public loadOneSuccess = this.actions.pipe(
    ofType<InputQuestionAnswerLoadOneAction>(
      InputQuestionAnswerActionTypes.LOADONE_SUCCESS
    ),
    tap((action) => {
      return null;
    })
  );

  @Effect()
  public updateInputQuestionAnswer = this.actions.pipe(
    ofType<InputQuestionAnswerUpdateAction>(InputQuestionAnswerActionTypes.UPDATE),
    map((action) => action.payload),
    switchMap((request: AnswerRequest) =>
      this.answerService.updateInputQuestionAnswer(request).pipe(
        map((response: any) =>
          of(new InputQuestionAnswerUpdateSuccessAction(response))
        ),
        catchError((error) => of(new InputQuestionAnswerUpdateFailureAction(error)))
      )
    )
  );

  @Effect()
  public deleteInputQuestionAnswer = this.actions.pipe(
    ofType<InputQuestionAnswerDeleteAction>(InputQuestionAnswerActionTypes.DELETE),
    map((action) => action.payload),
    switchMap((param: AnswerRequest) =>
      this.answerService.deleteInputQuestionAnswer(param).pipe(
        map((response: any) => new InputQuestionAnswerDeleteSuccessAction(response)),
        catchError((error) => of(new InputQuestionAnswerDeleteFailAction(error)))
      )
    )
  );
}

