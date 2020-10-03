import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Store, select } from '@ngrx/store';

import * as fromSurvey from 'src/app/features/surveys/store/selectors/survey.selectors';
import * as fromQuestionGroup from 'src/app/features/question-groups/store/question-group.selectors';
import * as fromQuestion from 'src/app/features/questions/store/selectors/question.selectors';
import * as fromAuth from 'src/app/core/auth/store/auth.selectors';

import { QuestionLoadAction } from 'src/app/features/questions/store/actions/question.actions';

import { AppState } from 'src/app/state/app.state';

import { QuestionGroupLoadAction } from 'src/app/features/question-groups/store/question-group.actions';
import { AnswerLoadByQuestionAction } from 'src/app/features/answers/store/actions/answer.actions';
import { SurveyLoadAction } from 'src/app/features/surveys/store/actions/survey.actions';

import { Survey, SurveyRequest } from 'src/app/models/survey.model';
import { QuestionGroup } from 'src/app/models/question-group.model';
import { QuestionRequest, Question } from 'src/app/models/question.model';
import { User } from 'src/app/models/user.model';
import { AnswerRequest } from 'src/app/models/answer.model';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

  public survey: Survey;

  public questionGroups: QuestionGroup[];
  public questions: Question[];

  public questionGroupId: number;
  public questionId: number;

  public user: User;

  public isLoadingSurvey: boolean;
  public isLoadingGroups: boolean;

  private routeParamsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    const self = this;
    this.isLoadingSurvey = true;
    this.isLoadingGroups = true;

    this.questions = [];

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

  onQuestionGroupChange(event): void {
    this.questionGroupId = event.target.value;
    // Get questions
    this.store.dispatch(new QuestionLoadAction({
      surveyId: this.survey.id,
      questionGroupId: this.questionGroupId
    } as QuestionRequest));

    this.loadQuestionsData();
  }

  onQuestionChange(event): void {
    const question = this.questions.find(q => q.idDB === parseInt(event.target.value, 0));
    const request = {
      questionId: question.idDB,
      questionGroupId: this.questionGroupId,
      surveyId: this.survey.id
    } as AnswerRequest;

    this.store.dispatch(new AnswerLoadByQuestionAction(request));
  }

  private loadData(surveyId: number): void {
    this.store.dispatch( new QuestionGroupLoadAction(surveyId) );

    this.store
      .pipe(select(fromSurvey.selectEntity, { id: surveyId }))
      .subscribe((survey: Survey) => {
        if (survey) {
          this.survey = survey;
          this.isLoadingSurvey = false;
          this.loadQuestionGroupsData();
        }
        else {
          this.store.dispatch( new SurveyLoadAction({ user_id: this.user.id } as SurveyRequest));
        }
      });

  }

  private loadQuestionGroupsData(): void {
    this.store
      .pipe(select(fromQuestionGroup.selectEntitiesBySurvey, { id: this.survey.id }))
      .subscribe((response: QuestionGroup[]) => {
        this.survey = { ...this.survey, questionGroups: response };
        this.questionGroups = response;
        this.isLoadingGroups = false;
      });
  }

  private loadQuestionsData(): void {
    this.store
      .pipe(select(fromQuestion.selectEntitiesByGroup, { id: this.questionGroupId }))
      .subscribe((response: Question[]) => {
        if (response) {
          console.log(response);

          this.questions = [ ...response ];
        }
      });

  }
}
