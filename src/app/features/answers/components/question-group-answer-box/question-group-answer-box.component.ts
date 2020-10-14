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

  public group: QuestionGroup;
  public surveyId: number;

  private index = 0;

  private answerWrapper: AnswersWrapper;

  private mandatoryCompleted = false;
  private mandatoryQuestion: Question[];

  private canContinue = false;
  private matrixCheckCompleted = false;
  private matrixRadioCompleted = false;

  public surveyEnd: boolean;

  constructor(private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.surveyEnd = false;
    this.group = this.questionGroups[0];
    this.surveyId = this.group.survey;

    if (this.questionGroups.length === 1) {
      this.surveyEnd = true;
    }

    this.answerWrapper = new AnswersWrapper();
    this.answerWrapper.answers = [];

    this.updateMandatoryQuestion();
  }

  onNextGroup(): void {
    if (this.index < this.questionGroups.length - 1 && this.canContinue) {
      this.index++;
      this.group = this.questionGroups[this.index];

      if (this.index === this.questionGroups.length - 1) {
        this.surveyEnd = true;
      }
    }
  }

  submitSurveyAnswers(): void {
    let payload: any;

    if (this.userUnlocked != null) {
      payload = {
        email: this.userUnlocked.email,
        password: this.userUnlocked.password,
        answers: [ ...this.answerWrapper.answers]
      };

    } else {
      payload = { answers: [ ...this.answerWrapper.answers ] };
    }

    this.store.dispatch(new SubmitAnswersAction(
      {
        surveyId: this.surveyId,
        answerWrapper: payload
      } as AnswerRequest
    ));

    this.submitted.emit(true);

  }

  // onPreviousGroup(): void {
  //   if (this.index > 0) {
  //     this.index--;
  //     this.group = this.questionGroups[this.index]; }
  // }

  updateMandatoryQuestion(): void {
    this.mandatoryQuestion = this.questionGroups[this.index].questions.filter(
      (item) => item.mandatory == true
    );
  }

  updateWrapper(event): void {
    const notEmptyAnswer = event.answers.filter(
      (item) => (item.answer && item.answer.length > 0) || (item.answerPair && item.answerPair.length > 0 || (item.answersPair && item.answersPair.length > 0))
    );
    this.mandatoryCompleted = this.areMandatoryCompleted(notEmptyAnswer);

    this.isMatrixCheckAnswerCompleted(notEmptyAnswer);
    this.isMatrixRadioAnswerCompleted(notEmptyAnswer);

    if (this.mandatoryCompleted) {


      if (this.matrixCheckCompleted && this.matrixRadioCompleted) {
        this.answerWrapper.answers = notEmptyAnswer;
        this.canContinue = true;
      } else {
        this.canContinue = false;
      }

    }

  }

  areMandatoryCompleted(answerList): boolean {

    if (this.mandatoryQuestion.length !== 0) {
      for (let i = 0; i < this.mandatoryQuestion.length && this.mandatoryCompleted; i++) {
        if (!answerList.find(
          (obj) => obj.questionId === this.mandatoryQuestion[i].id && obj.questionType === this.mandatoryQuestion[i].questionType)) {
          return false;
        }
      }
      return true;
    } else return true;
  }


  isMatrixCheckAnswerCompleted(answerList): void {

    let multiCheckQuestion: MatrixQuestion[] = this.group.questions.filter(
      (item) => item.questionType === 'App\\MatrixQuestion' && item.type == 'CHECK' && item.mandatory === true) as MatrixQuestion[];

    if (multiCheckQuestion.length != 0) {

      multiCheckQuestion.forEach((item) => {
        let questionNumber = item.elements.length;
        let result = answerList.find(
          (obj) => obj.questionId === item.id && obj.questionType === item.questionType
        );

        if (result) {
          if (result.answers.length !== questionNumber) {
            this.matrixCheckCompleted = false;
          } else {
            this.matrixCheckCompleted = true;
          }
        }
      });

    } else this.matrixCheckCompleted = true;

  }


  isMatrixRadioAnswerCompleted(answerList): void {

    let multiRadioQuestion: MatrixQuestion[] = this.group.questions.filter(
      (item) => item.questionType === 'App\\MatrixQuestion' && item.type == 'RADIO' && item.mandatory == true
    ) as MatrixQuestion[];

    if (multiRadioQuestion.length != 0) {

      multiRadioQuestion.forEach((item) => {
        let questionNumber = item.elements.length;

        let result = answerList.find(
          (obj) => obj.questionId === item.id && obj.questionType === item.questionType
        );

        if (result) {

          if (result.answerPair.length !== questionNumber) {
            this.matrixRadioCompleted = false;
          } else {
            this.matrixRadioCompleted = true;
          }
        }
      });

    }
    else this.matrixRadioCompleted = true;
  };

}
