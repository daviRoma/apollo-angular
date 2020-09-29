import { Injectable } from '@angular/core';

import { Actions, ofType, Effect } from '@ngrx/effects';

import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { AnswerService } from '../../services/answer.service';

import {
  ChoiceQuestionAnswerActionTypes,
  ChoiceQuestionAnswerLoadAction,
  ChoiceQuestionAnswerLoadSuccessAction,
  ChoiceQuestionAnswerLoadFailAction,
  ChoiceQuestionAnswerLoadOneAction,
  ChoiceQuestionAnswerLoadOneFailAction,
  ChoiceQuestionAnswerNewAction,
  ChoiceQuestionAnswerNewSuccessAction,
  ChoiceQuestionAnswerNewFailureAction,
  ChoiceQuestionAnswerUpdateAction,
  ChoiceQuestionAnswerUpdateSuccessAction,
  ChoiceQuestionAnswerUpdateFailureAction,
  ChoiceQuestionAnswerDeleteAction,
  ChoiceQuestionAnswerDeleteSuccessAction,
  ChoiceQuestionAnswerDeleteFailAction
} from '../actions/choice-question-answer.actions';

import { AnswerResponse, AnswerRequest } from '../../../../models/answer.model';

@Injectable()
export class ChoiceQuestionAnswerEffects {
  constructor(
    private actions: Actions,
    private answerService: AnswerService
  ) {}

  @Effect()
  public loadChoiceQuestionsAnswers = this.actions.pipe(
    ofType<ChoiceQuestionAnswerLoadAction>(ChoiceQuestionAnswerActionTypes.LOADING),
    map((action) => action.payload),
    switchMap((request: AnswerRequest) =>
      this.answerService.getChoiceQuestionsAnswers(request).pipe(
        map((response: any) => new ChoiceQuestionAnswerLoadSuccessAction(response)),
        catchError((error) => of(new ChoiceQuestionAnswerLoadFailAction(error)))
      )
    )
  );

  @Effect()
  public loadOne = this.actions.pipe(
    ofType<ChoiceQuestionAnswerLoadOneAction>(ChoiceQuestionAnswerActionTypes.LOADONE),
    map((action) => action.payload),
    switchMap((params: any) =>
      this.answerService.getChoiceQuestionsAnswers(params).pipe(
        map(
          (response: AnswerResponse) =>
            new ChoiceQuestionAnswerLoadSuccessAction(response)
        ),
        catchError((error) => of(new ChoiceQuestionAnswerLoadOneFailAction(error)))
      )
    )
  );

  @Effect()
  public createChoiceQuestionAnswer = this.actions.pipe(
    ofType<ChoiceQuestionAnswerNewAction>(ChoiceQuestionAnswerActionTypes.NEW),
    map((action) => action.payload),
    switchMap((request: AnswerRequest) =>
      this.answerService.createChoiceQuestionAnswer(request).pipe(
        map(
          (response: AnswerResponse) =>
            new ChoiceQuestionAnswerNewSuccessAction(response)
        ),
        catchError((error) => of(new ChoiceQuestionAnswerNewFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  public loadOneSuccess = this.actions.pipe(
    ofType<ChoiceQuestionAnswerLoadOneAction>(
      ChoiceQuestionAnswerActionTypes.LOADONE_SUCCESS
    ),
    tap((action) => {
      return null;
    })
  );

  @Effect()
  public updateChoiceQuestionAnswer = this.actions.pipe(
    ofType<ChoiceQuestionAnswerUpdateAction>(ChoiceQuestionAnswerActionTypes.UPDATE),
    map((action) => action.payload),
    switchMap((request: AnswerRequest) =>
      this.answerService.updateChoiceQuestionAnswer(request).pipe(
        map((response: any) =>
          of(new ChoiceQuestionAnswerUpdateSuccessAction(response))
        ),
        catchError((error) => of(new ChoiceQuestionAnswerUpdateFailureAction(error)))
      )
    )
  );

  @Effect()
  public deleteChoiceQuestionAnswer = this.actions.pipe(
    ofType<ChoiceQuestionAnswerDeleteAction>(ChoiceQuestionAnswerActionTypes.DELETE),
    map((action) => action.payload),
    switchMap((param: AnswerRequest) =>
      this.answerService.deleteChoiceQuestionAnswer(param).pipe(
        map((response: any) => new ChoiceQuestionAnswerDeleteSuccessAction(response)),
        catchError((error) => of(new ChoiceQuestionAnswerDeleteFailAction(error)))
      )
    )
  );
}

