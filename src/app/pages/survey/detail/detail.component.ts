import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

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
import { takeUntil } from 'rxjs/operators';

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
  public isStart: boolean;

  private routeParamsSubscription: Subscription;
  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    const self = this;
    this.isLoading = true;
    this.isStart = true;
    this.questionGroups = [];

    this.routeParamsSubscription = this.route.params.subscribe((params) => {
      if (params.survey_id) {
        // Select survey from store by url parameter
        self.store
          .select(fromAuth.selectAuthUser)
          .pipe(takeUntil(this.destroy))
          .subscribe((user: User) => {
            if (user) {
              self.user = user;
              self.params = { surveyId: parseInt(params.survey_id, 10) };
              if (this.isStart) {
                this.loadSurveyData();
                this.isStart = false;
              }

            }
          });
      }
    });
  }

  ngOnInit(): void {
    this.store
      .select(fromSurvey.selectSurveyLoading)
      .pipe(takeUntil(this.destroy))
      .subscribe((loading) => {
      if (!loading) {
        this.loadWithSelectors();
      }
    });

    this.store
      .select(fromQuestionGroup.selectQuestionGroupLoading)
      .pipe(takeUntil(this.destroy))
      .subscribe((loading: boolean) => {
        if (!loading) {
          this.loadQuestionGroupsWithSelectors();
        }
      });
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
    this.store.complete();
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  private loadWithSelectors(): void {
    this.store
      .select(fromSurvey.selectEntity, { id: this.params.surveyId })
      .pipe(takeUntil(this.destroy))
      .subscribe((survey: Survey) => {
        if (survey) {
          this.survey = { ...survey };
        }
        this.isLoading = false;
    });
  }

  private loadSurveyData(): void {
    this.store.dispatch(new SurveyLoadOneAction({ id: this.params.surveyId, dispatch: true } as SurveyRequest));
    this.store.dispatch(new QuestionGroupLoadAction(this.params.surveyId));
  }

  private loadQuestionGroupsWithSelectors(): void {
    this.store
      .select(fromQuestionGroup.selectEntitiesBySurvey, { id: this.params.surveyId })
      .pipe(takeUntil(this.destroy))
      .subscribe((response: QuestionGroup[]) => {
        if (response && response.length) {
          this.survey = { ...this.survey, questionGroups: [ ...response ] };
          this.questionGroups = [ ...response ];
        } else {
          this.survey = { ...this.survey, questionGroups: [] };
          this.questionGroups = [];
        }
      });

  }

}
