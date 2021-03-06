import { Injectable } from '@angular/core';

import { Actions, ofType, Effect } from '@ngrx/effects';

import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { QuestionGroupService } from '../services/question-group.service';

import {
  QuestionGroupActionTypes,
  QuestionGroupLoadAction,
  QuestionGroupLoadSuccessAction,
  QuestionGroupLoadFailAction,
  QuestionGroupLoadOneAction,
  QuestionGroupLoadOneFailAction,
  QuestionGroupNewAction,
  QuestionGroupNewSuccessAction,
  QuestionGroupNewFailureAction,
  QuestionGroupUpdateAction,
  QuestionGroupUpdateSuccessAction,
  QuestionGroupUpdateFailureAction,
  QuestionGroupDeleteAction,
  QuestionGroupDeleteSuccessAction,
  QuestionGroupDeleteFailAction,
  QuestionGroupLoadOneSuccessAction
} from './question-group.actions';

import { QuestionGroupResponse, QuestionGroupRequest } from 'src/app/models/question-group.model';

@Injectable()
export class QuestionGroupEffects {
  constructor(private actions: Actions, private questionGroupService: QuestionGroupService) {}

  @Effect()
  public loadQuestionGroups = this.actions.pipe(
    ofType<QuestionGroupLoadAction>(QuestionGroupActionTypes.LOADING),
    map((action) => action.payload),
    switchMap((params: number) =>
      this.questionGroupService.getQuestionGroups(params).pipe(
        map((response: any) => new QuestionGroupLoadSuccessAction(response)),
        catchError((error) => of(new QuestionGroupLoadFailAction(error)))
      )
    )
  );

  @Effect()
  public loadOne = this.actions.pipe(
    ofType<QuestionGroupLoadOneAction>(QuestionGroupActionTypes.LOADONE),
    map((action) => action.payload),
    switchMap((params: any) =>
      this.questionGroupService.getQuestionGroup(params).pipe(
        map((response: QuestionGroupResponse) => new QuestionGroupLoadOneSuccessAction(response)),
        catchError((error) => of(new QuestionGroupLoadOneFailAction(error)))
    ))
  );

  @Effect()
  public createQuestionGroup = this.actions.pipe(
    ofType<QuestionGroupNewAction>(QuestionGroupActionTypes.NEW),
    map((action) => action.payload),
    switchMap((request: QuestionGroupRequest) =>
      this.questionGroupService.createQuestionGroup(request).pipe(
        map((response: QuestionGroupResponse) => new QuestionGroupLoadAction(request.surveyId)),
        catchError((error) => of(new QuestionGroupNewFailureAction(error)))
      )
    )
  );

  @Effect()
  public updateQuestionGroup = this.actions.pipe(
    ofType<QuestionGroupUpdateAction>(QuestionGroupActionTypes.UPDATE),
    map((action) => action.payload),
    switchMap((request: QuestionGroupRequest) =>
      this.questionGroupService.updateQuestionGroup(request).pipe(
        map((response: any) => new QuestionGroupLoadOneAction(request)),
        catchError((error) => of(new QuestionGroupUpdateFailureAction(error)))
      )
    )
  );

  @Effect()
  public deleteQuestionGroup = this.actions.pipe(
    ofType<QuestionGroupDeleteAction>(QuestionGroupActionTypes.DELETE),
    map((action) => action.payload),
    switchMap((param: QuestionGroupRequest) =>
      this.questionGroupService.deleteQuestionGroup(param).pipe(
        map(() => new QuestionGroupDeleteSuccessAction(param.questionGroup.id)),
        catchError((error) => of(new QuestionGroupDeleteFailAction(error)))
      )
    )
  );
}

