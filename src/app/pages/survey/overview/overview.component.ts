import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

import { Store, select } from '@ngrx/store';

import * as fromSurvey from 'src/app/features/surveys/store/selectors/survey.selectors';
import * as fromQuestionGroup from 'src/app/features/question-groups/store/question-group.selectors';
import * as fromQuestion from 'src/app/features/questions/store/selectors/question.selectors';
import * as fromAuth from 'src/app/core/auth/store/auth.selectors';
import * as fromSurveyAnswer from 'src/app/features/answers/store/selectors/survey-answer.selectors';

import { QuestionLoadAction } from 'src/app/features/questions/store/actions/question.actions';

import { AppState } from 'src/app/state/app.state';

import { QuestionGroupLoadAction } from 'src/app/features/question-groups/store/question-group.actions';
import { SurveyLoadOneAction } from 'src/app/features/surveys/store/actions/survey.actions';

import { Survey, SurveyRequest } from 'src/app/models/survey.model';
import { QuestionAnswer } from 'src/app/models/survey-answer.model';
import { QuestionGroup } from 'src/app/models/question-group.model';
import { QuestionRequest, Question } from 'src/app/models/question.model';
import { User } from 'src/app/models/user.model';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnDestroy {
  public survey: Survey;

  public questionGroups: QuestionGroup[];
  public questions: Question[];
  public question: Question;
  public questionAnswers: QuestionAnswer[];

  public questionGroupId: number;

  public user: User;

  public isLoadingSurvey: boolean;
  public isLoadingGroups: boolean;
  public isLoadingAnswers: boolean;

  private routeParamsSubscription: Subscription;
  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    const self = this;
    this.isLoadingSurvey = true;
    this.isLoadingGroups = true;
    this.isLoadingAnswers = true;

    this.questions = [];

    this.routeParamsSubscription = this.route.params.subscribe((params) => {
      if (params.survey_id) {
        // Select survey from store by url parameter
        self.store
          .select(fromAuth.selectAuthUser)
          .pipe(takeUntil(this.destroy))
          .subscribe((user: User) => {
            if (user) {
              self.user = user;
              self.loadData(params.survey_id);
            }
          });
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  onQuestionGroupChange(event): void {
    this.isLoadingAnswers = true;
    this.questions = [];

    // Check valid question group id
    if (event.target.value === '' || event.target.value === null) {
      this.questionGroupId = null;
      return;
    }

    this.questionGroupId = event.target.value;

    // Get questions
    this.store.dispatch(
      new QuestionLoadAction({
        surveyId: this.survey.id,
        questionGroupId: this.questionGroupId,
      } as QuestionRequest)
    );

    this.loadQuestionsData();
  }

  onQuestionChange(event): void {
    if (!this.questions.length) return;
    this.question = { ...this.questions.find(
      q => (q.id + '-' + q.idDB === event.target.value)
    )};

    this.store
      .select(fromSurveyAnswer.selectAnswersByQuestion, { id: this.question.idDB, type: this.question.questionType })
      .pipe(takeUntil(this.destroy))
      .subscribe((response: QuestionAnswer[]) => {
        if (response.length) {
          this.questionAnswers = [ ...response ];
          this.isLoadingAnswers = false;
        }
    });
  }

  private loadData(surveyId: number): void {
    this.store.dispatch(new QuestionGroupLoadAction(surveyId));

    this.store
      .select(fromSurvey.selectEntity, { id: surveyId })
      .pipe(takeUntil(this.destroy))
      .subscribe((survey: Survey) => {
        if (survey) {
          this.survey = survey;
          this.isLoadingSurvey = false;
          this.loadQuestionGroupsData();
        } else {
          this.store.dispatch( new SurveyLoadOneAction({ id: surveyId, dispatch: true } as SurveyRequest));
        }
      });
  }

  private loadQuestionGroupsData(): void {
    this.store
      .select(fromQuestionGroup.selectEntitiesBySurvey, { id: this.survey.id })
      .pipe(takeUntil(this.destroy))
      .subscribe((response: QuestionGroup[]) => {
        this.survey = { ...this.survey, questionGroups: response };
        this.questionGroups = [ ...response ];
        this.isLoadingGroups = false;
      });
  }

  private loadQuestionsData(): void {
    this.store
      .select(fromQuestion.selectEntitiesByGroup, { id: this.questionGroupId })
      .pipe(takeUntil(this.destroy))
      .subscribe((response: Question[]) => {
        if (response && response.length) {
          this.questions = [...response];
        }
      });
  }
}
