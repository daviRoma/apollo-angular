import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Store, select } from '@ngrx/store';

import * as fromSurvey from 'src/app/features/surveys/store/selectors/survey.selectors';
import * as fromQuestionGroup from 'src/app/features/question-groups/store/question-group.selectors';
import * as fromAuth from 'src/app/core/auth/store/auth.selectors';
import { AppState } from 'src/app/state/app.state';

import { SurveyLoadOneAction } from 'src/app/features/surveys/store/actions/survey.actions';
import { QuestionGroupLoadAction } from 'src/app/features/question-groups/store/question-group.actions';

import { Survey, SurveyRequest } from 'src/app/models/survey.model';
import { QuestionGroup } from 'src/app/models/question-group.model';
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
  public isLoading: boolean;

  private routeParamsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    const self = this;
    this.isLoading = true;
    this.questionGroups = [];

    this.routeParamsSubscription = this.route.params.subscribe((params) => {
      if (params.survey_id) {
        // Select survey from store by url parameter
        self.store
          .pipe(select(fromAuth.selectAuthUser))
          .subscribe((user: User) => {
            if (user) {
              self.user = user;
              self.loadSurveyData(params.survey_id);
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

  private loadSurveyData(surveyId: number): void {
    this.store.dispatch( new QuestionGroupLoadAction(surveyId) );

    this.store
      .pipe(select(fromSurvey.selectEntity, { id: surveyId }))
      .subscribe((survey: Survey) => {
        if (survey) {
          this.survey = survey;
          this.isLoading = false;
          this.loadQuestionGroups();
        } else {
          this.store.dispatch( new SurveyLoadOneAction({ id: surveyId, dispatch: true } as SurveyRequest));
        }
      });

  }

  private loadQuestionGroups(): void {
    this.store
      .pipe(select(fromQuestionGroup.selectEntitiesBySurvey, { id: this.survey.id }))
      .subscribe((response: QuestionGroup[]) => {
        this.survey = { ...this.survey, questionGroups: response };
        this.questionGroups = response;
      });
  }

}
