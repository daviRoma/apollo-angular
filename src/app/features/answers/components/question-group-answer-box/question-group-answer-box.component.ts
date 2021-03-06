import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AnswerRequest, AnswersWrapper } from 'src/app/models/answer.model';

import { QuestionGroup } from 'src/app/models/question-group.model';
import { MatrixQuestion, Question } from 'src/app/models/question.model';
import { AppState } from 'src/app/state/app.state';
import { SubmitAnswersAction } from '../../store/actions/answer.actions';

@Component({
  selector: 'app-question-group-answer-box',
  templateUrl: './question-group-answer-box.component.html',
  styleUrls: ['./question-group-answer-box.component.scss'],
})
export class QuestionGroupAnswerBoxComponent implements OnInit {
  @Input() questionGroups: QuestionGroup[];
  @Input() userUnlocked: any;

  @Output() submitted = new EventEmitter();
  @Input() answerId: number;

  get isSurveyEnd(): boolean {
    return this.surveyEnd && !this.answerId;
  }

  get hasNext(): boolean {
    return !this.surveyEnd;
  }

  public group: QuestionGroup;
  public surveyId: number;

  public pageIndex: number;

  public mandatoryCompleted = true;

  private surveyEnd: boolean;
  private answerWrapper: AnswersWrapper;

  private mandatoryQuestion: Question[];

  private canContinue = false;
  private matrixCheckCompleted = false;
  private matrixRadioCompleted = false;

  constructor(private store: Store<AppState>) {
    this.pageIndex = 0;
  }

  ngOnInit(): void {
    if (this.questionGroups && this.questionGroups.length) {
      this.group = this.questionGroups[0];
      this.surveyId = this.group.survey;
    }

    if (this.questionGroups.length === 1) {
      this.surveyEnd = true;
    }

    this.answerWrapper = new AnswersWrapper();
    this.answerWrapper.answers = [];

    this.updateMandatoryQuestion();
  }

  onNextGroup(): void {
    if (
      (this.pageIndex < this.questionGroups.length - 1 && this.canContinue) ||
      this.answerId
    ) {
      this.pageIndex += 1;
      this.group = this.questionGroups[this.pageIndex];
      this.updateMandatoryQuestion();

      if (this.pageIndex === this.questionGroups.length - 1) {
        this.surveyEnd = true;
      }
    }
  }

  onPreviousGroup(): void {
    this.pageIndex -= 1;
    this.group = this.questionGroups[this.pageIndex];
    this.surveyEnd = false;
  }

  submitSurveyAnswers(): void {
    this.mandatoryCompleted = this.areMandatoryCompleted(this.answerWrapper.answers);

    if (this.canContinue) {

      let payload: any;

      if (this.userUnlocked != null) {
        payload = {
          email: this.userUnlocked.email,
          password: this.userUnlocked.password,
          answers: [...this.answerWrapper.answers],
        };
      } else {
        payload = { answers: [...this.answerWrapper.answers] };
      }

      this.store.dispatch(
        new SubmitAnswersAction({
          surveyId: this.surveyId,
          answerWrapper: payload,
        } as AnswerRequest)
      );

      this.submitted.emit(true);

    }
  }

  updateMandatoryQuestion(): void {
    this.mandatoryQuestion = this.questionGroups[
      this.pageIndex
    ].questions.filter((item) => item.mandatory);

    if (this.mandatoryQuestion.length !== 0) {
      this.mandatoryCompleted = true;
      this.canContinue = false;
    }
  }

  updateWrapper(event): void {

    this.mandatoryCompleted = true;

    const notEmptyAnswer = event.answers.filter(
      (item) =>
        (item.answer && item.answer.length > 0) ||
        (item.answers && item.answers.length > 0) ||
        (item.answerPair && item.answerPair.length > 0) ||
        (item.answersPair && item.answersPair.length > 0)
    );

    // this.mandatoryCompleted = this.areMandatoryCompleted(notEmptyAnswer);

    this.isMatrixCheckAnswerCompleted(notEmptyAnswer);
    this.isMatrixRadioAnswerCompleted(notEmptyAnswer);

    this.answerWrapper.answers = notEmptyAnswer;

    if (this.matrixCheckCompleted && this.matrixRadioCompleted) {
      this.answerWrapper.answers = this.answerWrapper.answers.filter(
        (item) =>
          (item.answer && item.answer.length > 0) ||
          (item.answers && item.answers.length > 0) ||
          (item.answerPair && item.answerPair.length > 0) ||
          (item.answersPair && item.answersPair.length > 0)
      );

      this.mandatoryCompleted = this.areMandatoryCompleted(this.answerWrapper.answers);

      this.canContinue = this.mandatoryCompleted;
    }
  }

  areMandatoryCompleted(answerList): boolean {

    if (this.mandatoryQuestion.length !== 0) {

      for (let i = 0; i < this.mandatoryQuestion.length && this.mandatoryCompleted; i++) {

        if (!answerList.find((obj) =>
          obj.questionId === this.mandatoryQuestion[i].id &&
          obj.questionType === this.mandatoryQuestion[i].questionType)) {
          return false;
        }
      }

      return true;
    } else return true;
  }

  isMatrixCheckAnswerCompleted(answerList): void {
    let multiCheckQuestion: MatrixQuestion[] = this.group.questions.filter(
      (item) =>
        (item.questionType === 'App\\MatrixQuestion' &&
        item.type === 'CHECK' &&
        item.mandatory)
    ) as MatrixQuestion[];

    if (multiCheckQuestion.length) {
      multiCheckQuestion.forEach((item) => {
        const result = answerList.find(
          (obj) =>
            obj.questionId === item.id && obj.questionType === item.questionType
        );

        if (result) {
          if (result.answers && result.answers.length !== item.elements.length) {
            this.matrixCheckCompleted = false;
          } else {
            this.matrixCheckCompleted = true;
          }
        }
      });
    } else this.matrixCheckCompleted = true;
  }

  isMatrixRadioAnswerCompleted(answerList): void {
    const multiRadioQuestion: MatrixQuestion[] = this.group.questions.filter(
      (item) =>
        (item.questionType === 'App\\MatrixQuestion' &&
        item.type === 'RADIO' &&
        item.mandatory)
    ) as MatrixQuestion[];

    if (multiRadioQuestion.length) {
      multiRadioQuestion.forEach((item) => {

        const result = answerList.find(
          (obj) =>
            obj.questionId === item.id && obj.questionType === item.questionType
        );

        if (result) {
          // Check question number
          if (result.answerPair && result.answerPair.length !== item.elements.length) {
            this.matrixRadioCompleted = false;
          } else {
            this.matrixRadioCompleted = true;
          }
        }
      });
    } else this.matrixRadioCompleted = true;
  }
}
