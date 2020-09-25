import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Store, select } from '@ngrx/store';

import * as fromSurvey from 'src/app/features/surveys/store/selectors/survey.selectors';
import * as fromQuestionGroup from 'src/app/features/question-groups/store/question-group.selectors';
import * as fromAuth from 'src/app/core/auth/store/auth.selectors';
import { AppState } from 'src/app/state/app.state';

import { QuestionGroupLoadAction } from 'src/app/features/question-groups/store/question-group.actions';

import { Survey, SurveyRequest } from 'src/app/models/survey.model';
import { QuestionGroup } from 'src/app/models/question-group.model';
import { catchError } from 'rxjs/operators';
import { SurveyLoadAction } from 'src/app/features/surveys/store/actions/survey.actions';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {

  public survey: Survey;
  public questionGroups: QuestionGroup[];
  public user: User;

  private routeParamsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    const self = this;
    this.questionGroups = [];
    this.routeParamsSubscription = this.route.params.subscribe((params) => {
      if (params.survey_id) {
        // Select survey from store by url parameter
        self.store
          .pipe(select(fromAuth.selectAuthUser))
          .subscribe((user: User) => {
            if (user) {
              self.user = user;
              self.loadData(params.survey_id);
            }
          });
      }
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
  }

  private loadData(surveyId: string): void {
    this.store.dispatch( new QuestionGroupLoadAction(surveyId) );

    this.store
      .pipe(select(fromSurvey.selectEntity, { id: surveyId }))
      .subscribe((survey: Survey) => {
        if (survey) { this.survey = survey; }
        else {
          this.store.dispatch( new SurveyLoadAction({
            user_id: this.user.id,
          } as SurveyRequest));
        }
      });

    this.store
      .pipe(select(fromQuestionGroup.selectEntitiesBySurvey, { id: surveyId }))
      .subscribe((response: QuestionGroup[]) => {
        this.survey = { ...this.survey, questionGroups: response };
        this.questionGroups = response;
      });

  }

}
