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
} from '../actions/answer.actions';

import { AnswerRequest } from '../../../../models/answer.model';

@Injectable()
export class AnswerEffects {
  constructor(private actions: Actions, private answerService: AnswerService) {}

  @Effect()
  public loadAnsers = this.actions.pipe(
    ofType<AnswerLoadAction>(AnswerActionTypes.LOADING),
    map((action) => action.payload),
    switchMap((params: AnswerRequest) =>
      this.answerService.getQuestions(params).pipe(
        map((response: any) => new AnswerLoadSuccessAction(response)),
        catchError((error) => of(new AnswerLoadFailAction(error)))
      )
    )
  );

}
