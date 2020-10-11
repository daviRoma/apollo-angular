import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';
import * as fromSurveyAnswer from 'src/app/features/answers/store/selectors/survey-answer.selectors';

import { AnswersWrapper } from 'src/app/models/answer.model';
import { QuestionGroup } from 'src/app/models/question-group.model';
import { SurveyAnswer } from 'src/app/models/survey-answer.model';

@Component({
  selector: 'app-question-group-answer-detail',
  templateUrl: './question-group-answer-detail.component.html',
  styleUrls: ['./question-group-answer-detail.component.scss'],
})
export class QuestionGroupAnswerDetailComponent implements OnInit {
  @Input() questionGroup: QuestionGroup;
  @Input() answerId: number;

  @Output() answerChange = new EventEmitter();

  private answerGroup: AnswersWrapper;

  public surveyAnswer: SurveyAnswer;

  public isLoading: boolean;

  constructor(private store: Store<AppState>) {
    this.answerGroup = new AnswersWrapper();
    this.answerGroup.answers = [];
  }

  ngOnInit(): void {
    if (this.answerId) this.loadSurveyAnswerData(this.answerId);

  }

  updateWrapper(event): void {
    let result = this.answerGroup.answers.find(
      (item) =>
        item.questionId == event.questionId &&
        item.questionType == event.questionType
    );

    if (result) {
      result = event;
    } else {
      this.answerGroup.answers.push(event);
    }
    this.answerChange.emit(this.answerGroup);
  }

  private loadSurveyAnswerData(answerId: number): void {
    this.store
      .pipe(select(fromSurveyAnswer.selectEntity, { id: answerId }))
      .subscribe((surveyAnswer: SurveyAnswer) => {
        console.log('SurveyAnswer', surveyAnswer);
        if (surveyAnswer) this.surveyAnswer = { ...surveyAnswer };
      });
  }
}
