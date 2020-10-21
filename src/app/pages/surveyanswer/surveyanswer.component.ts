import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from 'src/app/state/app.state';
import { QuestionGroupLoadAction } from 'src/app/features/question-groups/store/question-group.actions';
import { SurveyLoadOneAction } from 'src/app/features/surveys/store/actions/survey.actions';

import * as fromSurvey from 'src/app/features/surveys/store/selectors/survey.selectors';
import * as fromQuestionGroup from 'src/app/features/question-groups/store/question-group.selectors';

import { QuestionGroup } from 'src/app/models/question-group.model';
import { Survey } from 'src/app/models/survey.model';

@Component({
  selector: 'app-surveyanswer',
  templateUrl: './surveyanswer.component.html',
  styleUrls: ['./surveyanswer.component.scss']
})
export class SurveyanswerComponent implements OnInit, OnDestroy {

  public survey: Survey;
  public questionGroups: QuestionGroup[];

  public surveyAnswerId: number;

  public userUnlocked: any;

  public surveyUnlocked = false;
  public surveyActive = false;

  public isLoading: boolean;

  public surveySubmitted = false;
  public surveyId: number;

  private subscription: Subscription = new Subscription();

  private routeParamsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) {
    const self = this;
    this.isLoading = true;
    this.questionGroups = [];
    this.routeParamsSubscription = this.route.params.subscribe((params) => {
      if (params.survey_id) {
        // Select survey from store by url parameter
        self.loadData(params.survey_id);
        this.surveyId = params.survey_id;
      }
    });

  }

  ngOnInit(): void {
    this.subscription.add(
      this.store.pipe(select(fromSurvey.selectSurveyLoading)).subscribe((loading) => {
        this.isLoading = loading;
      })
    );
    this.store
      .pipe(select(fromSurvey.selectEntity, { id: this.surveyId }))
      .subscribe((survey: Survey) => {
        if (survey) {
          this.survey = survey;
          this.isLoading = false;
          this.initializeSelectors();
        }
      });

    this.store
      .pipe(select(fromQuestionGroup.selectEntitiesBySurvey, { id: this.surveyId }))
      .subscribe((response: QuestionGroup[]) => {
        this.survey = { ...this.survey, questionGroups: response };
        this.questionGroups = response;
      });
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
  }

  login(): void {
    this.surveyActive = true;
  }

  initializeSelectors(): void {

    if (this.survey.active) {
      this.surveyActive = true;
    } else {
      this.surveyActive = false;
    }
    if (this.survey.secret) {
      this.surveyUnlocked = false;
    } else {
      this.surveyUnlocked = true;
    }
  }

  unlockAccess(event): void{

    this.surveyUnlocked = true;
    this.userUnlocked = event;

  }

  showSubmittedView(event): void{
    if (event) {
      this.surveySubmitted = true;
      this.surveyActive = false;
      this.surveyUnlocked = false;
    }

  }

  private loadData(surveyId: number): void {
    this.store.dispatch(new QuestionGroupLoadAction(surveyId));

    this.store.dispatch(new SurveyLoadOneAction({ id: surveyId, dispatch: true }));

    this.store
      .pipe(select(fromSurvey.selectEntity, { id: this.surveyId }))
      .subscribe((survey: Survey) => {
        if (survey) {
          this.survey = survey;
          this.isLoading = false;
          this.initializeSelectors();
        }
      });
  }

}
