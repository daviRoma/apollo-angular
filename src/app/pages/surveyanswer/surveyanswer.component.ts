import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { QuestionGroupLoadAction } from 'src/app/features/question-groups/store/question-group.actions';
import { SurveyLoadAction, SurveyLoadOneAction } from 'src/app/features/surveys/store/actions/survey.actions';
import { QuestionGroup } from 'src/app/models/question-group.model';
import { Survey, SurveyRequest } from 'src/app/models/survey.model';
import { AppState } from 'src/app/state/app.state';
import * as fromSurvey from 'src/app/features/surveys/store/selectors/survey.selectors';
import * as fromQuestionGroup from 'src/app/features/question-groups/store/question-group.selectors';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-surveyanswer',
  templateUrl: './surveyanswer.component.html',
  styleUrls: ['./surveyanswer.component.scss']
})
export class SurveyanswerComponent implements OnInit {

  public survey: Survey;
  public questionGroups: QuestionGroup[];

  public userUnlocked: any;

  public surveyUnlocked = false;
  public surveyActive = false;

  public isLoading: boolean;

  private routeParamsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) {
    const self = this;
    this.questionGroups = [];
    this.routeParamsSubscription = this.route.params.subscribe((params) => {
      if (params.survey_id) {
        // Select survey from store by url parameter
        self.loadData(params.survey_id);
      }
    });

    this.isLoading = true;
  }

  ngOnInit(): void {



  }

  private loadData(surveyId: number): void {
    this.store.dispatch(new QuestionGroupLoadAction(surveyId));

    this.store.dispatch(new SurveyLoadOneAction({ id: surveyId, dispatch: true }));

    this.store
      .pipe(select(fromSurvey.selectEntity, { id: surveyId }))
      .subscribe((survey: Survey) => {
        if (survey) {
          this.survey = survey;
          this.isLoading = false;
          this.initializeSelectors();
        }
      });

    this.store
      .pipe(select(fromQuestionGroup.selectEntitiesBySurvey, { id: surveyId }))
      .subscribe((response: QuestionGroup[]) => {
        this.survey = { ...this.survey, questionGroups: response };
        this.questionGroups = response;
      });
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
    console.log("User Unlocked", this.userUnlocked);

  }

}
