import { Injectable } from '@angular/core';

import { Actions, ofType, Effect } from '@ngrx/effects';

import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { QuestionService } from '../../services/question.service';

import {
  ChoiceQuestionActionTypes,
  ChoiceQuestionLoadAction,
  ChoiceQuestionLoadSuccessAction,
  ChoiceQuestionLoadFailAction,
  ChoiceQuestionLoadOneAction,
  ChoiceQuestionLoadOneFailAction,
  ChoiceQuestionNewAction,
  ChoiceQuestionNewSuccessAction,
  ChoiceQuestionNewFailureAction,
  ChoiceQuestionUpdateAction,
  ChoiceQuestionUpdateSuccessAction,
  ChoiceQuestionUpdateFailureAction,
  ChoiceQuestionDeleteAction,
  ChoiceQuestionDeleteSuccessAction,
  ChoiceQuestionDeleteFailAction
} from '../actions/choice-question.actions';

import { QuestionResponse, QuestionRequest } from '../../../../models/question.model';

@Injectable()
export class ChoiceQuestionEffects {
  constructor(
    private actions: Actions,
    private questionService: QuestionService
  ) {}

  @Effect()
  public loadChoiceQuestions = this.actions.pipe(
    ofType<ChoiceQuestionLoadAction>(ChoiceQuestionActionTypes.LOADING),
    map((action) => action.payload),
    switchMap((request: QuestionRequest) =>
      this.questionService.getChoiceQuestions(request).pipe(
        map((response: any) => new ChoiceQuestionLoadSuccessAction(response)),
        catchError((error) => of(new ChoiceQuestionLoadFailAction(error)))
      )
    )
  );

  @Effect()
  public loadOne = this.actions.pipe(
    ofType<ChoiceQuestionLoadOneAction>(ChoiceQuestionActionTypes.LOADONE),
    map((action) => action.payload),
    switchMap((params: any) =>
      this.questionService.getChoiceQuestions(params).pipe(
        map(
          (response: QuestionResponse) =>
            new ChoiceQuestionLoadSuccessAction(response)
        ),
        catchError((error) => of(new ChoiceQuestionLoadOneFailAction(error)))
      )
    )
  );

  @Effect()
  public createChoiceQuestion = this.actions.pipe(
    ofType<ChoiceQuestionNewAction>(ChoiceQuestionActionTypes.NEW),
    map((action) => action.payload),
    switchMap((request: QuestionRequest) =>
      this.questionService.createChoiceQuestion(request).pipe(
        map(
          (response: QuestionResponse) =>
            new ChoiceQuestionNewSuccessAction(response)
        ),
        catchError((error) => of(new ChoiceQuestionNewFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  public loadOneSuccess = this.actions.pipe(
    ofType<ChoiceQuestionLoadOneAction>(
      ChoiceQuestionActionTypes.LOADONE_SUCCESS
    ),
    tap((action) => {
      return null;
    })
  );

  @Effect()
  public updateChoiceQuestion = this.actions.pipe(
    ofType<ChoiceQuestionUpdateAction>(ChoiceQuestionActionTypes.UPDATE),
    map((action) => action.payload),
    switchMap((request: QuestionRequest) =>
      this.questionService.updateChoiceQuestion(request).pipe(
        map((response: any) =>
          of(new ChoiceQuestionUpdateSuccessAction(response))
        ),
        catchError((error) => of(new ChoiceQuestionUpdateFailureAction(error)))
      )
    )
  );

  @Effect()
  public deleteChoiceQuestion = this.actions.pipe(
    ofType<ChoiceQuestionDeleteAction>(ChoiceQuestionActionTypes.DELETE),
    map((action) => action.payload),
    switchMap((param: QuestionRequest) =>
      this.questionService.deleteChoiceQuestion(param).pipe(
        map((response: any) => new ChoiceQuestionDeleteSuccessAction(response)),
        catchError((error) => of(new ChoiceQuestionDeleteFailAction(error)))
      )
    )
  );
}

