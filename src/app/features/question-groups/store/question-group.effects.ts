import { Injectable } from '@angular/core';

import { Actions, ofType, Effect } from '@ngrx/effects';

import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { QuestionGroupService } from '../services/question-group.service';

import { QuestionGroupActionTypes, QuestionGroupLoadAction, QuestionGroupLoadSuccessAction, QuestionGroupLoadFailAction } from './question-group.actions';

@Injectable()
export class QuestionGroupEffects {
  constructor(private actions: Actions, private questionGroupService: QuestionGroupService) {}

  @Effect()
  public loadQuestionGroups = this.actions.pipe(
    ofType<QuestionGroupLoadAction>(QuestionGroupActionTypes.LOADING),
    map((action) => action.payload),
    switchMap((params: string) =>
      this.questionGroupService.getQuestionGroups(params).pipe(
        map((response: any) => new QuestionGroupLoadSuccessAction(response)),
        catchError((error) => of(new QuestionGroupLoadFailAction(error)))
      )
    )
  );

}

