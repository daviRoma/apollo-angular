import { Component, OnDestroy, OnInit } from '@angular/core';
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
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit, OnDestroy {

  public survey: Survey;
  public questionGroups: QuestionGroup[];

  public surveyAnswerId: number;

  public isLoading: boolean;

  private routeParamsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) {
    const self = this;
    this.isLoading = true;
    this.questionGroups = [];

    this.routeParamsSubscription = this.route.params
      .subscribe((params) => {
        if (params.survey_id && params.answer_id) {
          // Select survey from store by url parameter
          this.surveyAnswerId = params.answer_id;
          self.loadData(params.survey_id);
        }
    });

  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
  }

  showSubmittedView(event): void{


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
