import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  public params: any;

  public isLoading: boolean;

  private subscription: Subscription = new Subscription();
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
              self.params = { surveyId: parseInt(params.survey_id, 10) };
              self.store
                .pipe(select(fromSurvey.selectEntity, { id: self.params.surveyId }))
                .subscribe((survey: Survey) => {
                  if (survey) {
                    self.survey = { ...survey };
                    self.loadQuestionGroups();
                    self.isLoading =false;
                  } else self.loadSurveyData();
                }).unsubscribe();
            }
          });
      }
    });
  }

  ngOnInit(): void {
    this.subscription.add(
      this.store.pipe(select(fromSurvey.selectSurveyLoading)).subscribe((loading) => {
        if (!loading) {
          this.loadWithSelectors();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
    this.subscription.unsubscribe();
    this.store.complete();
  }

  private loadWithSelectors(): void {
    this.store
      .pipe(select(fromSurvey.selectEntity, { id: this.params.surveyId }))
      .subscribe((survey: Survey) => {
        if (survey) {
          this.survey = { ...survey };
          this.loadQuestionGroups();
        }
        this.isLoading = false;
    });
  }

  private loadSurveyData(): void {
    this.store.dispatch(new SurveyLoadOneAction({ id: this.params.surveyId, dispatch: true } as SurveyRequest));
    this.store.dispatch(new QuestionGroupLoadAction(this.params.surveyId));
  }

  private loadQuestionGroups(): void {
    this.store
      .pipe(select(fromQuestionGroup.selectEntitiesBySurvey, { id: this.params.surveyId }))
      .subscribe((response: QuestionGroup[]) => {
        this.survey = { ...this.survey, questionGroups: response };
        this.questionGroups = response;
      });
  }

}
