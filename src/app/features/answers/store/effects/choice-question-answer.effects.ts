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
      this.answerService.getAnswers(request).pipe(
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
      this.answerService.getAnswer(params).pipe(
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
      this.answerService.createAnswers(request).pipe(
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

}

