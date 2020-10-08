import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AnswersWrapper } from 'src/app/models/answer.model';

import { QuestionGroup } from 'src/app/models/question-group.model';
import { MatrixQuestion, Question } from 'src/app/models/question.model';
import { AppState } from 'src/app/state/app.state';
import { SubmitAnswers } from '../../store/actions/answer.actions';




@Component({
  selector: 'app-question-group-answer-box',
  templateUrl: './question-group-answer-box.component.html',
  styleUrls: ['./question-group-answer-box.component.scss'],
})
export class QuestionGroupAnswerBoxComponent implements OnInit {
  @Input() questionGroups: QuestionGroup[];
  @Input() userUnlocked: any;

  @Output() submitted= new EventEmitter();

  public group: QuestionGroup;
  private index = 0;

  private answerWrapper: AnswersWrapper;

  private mandatoryCompleted = false;
  private mandatoryQuestion: Question[];

  private canContinue = false;
  private matrixCheckCompleted = false;
  private matrixRadioCompleted = false;

  public surveyEnd = false;

  constructor(private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    console.log('Groups', this.questionGroups);
    this.group = this.questionGroups[0];

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

    let answer = JSON.parse(JSON.stringify(this.answerWrapper.answers));

    console.log('SumbitSurveyAnswer', 'OnSubmit', this.answerWrapper);
    let payload: any;
    if (this.userUnlocked != null) {
      payload = {
        email: this.userUnlocked.email,
        password: this.userUnlocked.password,
        answers: answer
      };

    } else {
      payload = {
        answers: answer
      }
    }

    this.store.dispatch(new SubmitAnswers(JSON.stringify(payload)));

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
