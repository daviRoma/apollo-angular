import { Injectable } from '@angular/core';

import { Actions, ofType, Effect } from '@ngrx/effects';

import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { QuestionService } from '../../services/question.service';

import {
  QuestionActionTypes,
  QuestionLoadAction,
  QuestionLoadSuccessAction,
  QuestionLoadFailAction,
} from '../actions/question.actions';

import { QuestionRequest } from '../../../../models/question.model';

@Injectable()
export class QuestionEffects {
  constructor(private actions: Actions, private questionService: QuestionService) {}

  @Effect()
  public loadQuestions = this.actions.pipe(
    ofType<QuestionLoadAction>(QuestionActionTypes.LOADING),
    map((action) => action.payload),
    switchMap((params: QuestionRequest) =>
      this.questionService.getQuestions(params).pipe(
        map((response: any) => new QuestionLoadSuccessAction(response)),
        catchError((error) => of(new QuestionLoadFailAction(error)))
      )
    )
  );

}
