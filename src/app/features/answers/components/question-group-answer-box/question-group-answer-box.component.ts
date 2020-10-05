import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Input } from '@angular/core';
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

  public group: QuestionGroup;
  private index = 0;

  private answerWrapper: AnswersWrapper;

  private mandatoryCompleted = false;
  private mandatoryQuestion: Question[];

  private canContinue = false;
  private matrixCheckCompleted = false;
  private matrixRadioCompleted = false;

  private surveyEnd = false;

  constructor(private store: Store<AppState>
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


    let array = this.answerWrapper.answers;

    let myJsonString = JSON.stringify(array);
    
    console.log(myJsonString);


    let li = JSON.parse(myJsonString);

    console.log(li);

    console.log('SumbitSurveyAnswer', 'OnSubmit', this.answerWrapper);
    const payload = {
      email: this.answerWrapper.email,
      password: this.answerWrapper.password,
      answers: li
    };
    this.store.dispatch(new SubmitAnswers(payload));

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
    if (this.mandatoryQuestion) {
      console.log('Mandatory Questions', this.mandatoryQuestion);
    } else {
      console.log('No mandatory question');
    }
  }

  updateWrapper(event): void {

    console.log("event", event);

    const notEmptyAnswer = event.answers.filter(
      (item) => item.answer.length > 0
    );
    console.log("Not Empty Answer", notEmptyAnswer);

    this.mandatoryCompleted = this.areMandatoryCompleted(notEmptyAnswer);

    if (this.mandatoryCompleted) {

      this.isMatrixCheckAnswerCompleted(notEmptyAnswer);
      this.isMatrixRadioAnswerCompleted(notEmptyAnswer);

      if (this.matrixCheckCompleted && this.matrixRadioCompleted) {

        this.answerWrapper.answers = notEmptyAnswer;
        console.log("Wrapper Updated", this.answerWrapper);

        this.canContinue = true;

      } else {
        console.log("MatrixCheck or MatrixRadio not completed", this.matrixCheckCompleted, this.matrixRadioCompleted);

        this.canContinue = false;
      }

    } else console.log("Mandatory completed", this.mandatoryCompleted);

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
    console.log("MatrixCheckQuestion", multiCheckQuestion);

    if (multiCheckQuestion.length != 0) {

      multiCheckQuestion.forEach((item) => {
        let questionNumber = item.options.length;
        let result = answerList.find(
          (obj) => obj.questionId === item.id && obj.questionType === item.questionType
        );

        if (result) {
          if (result.answer.length !== questionNumber) {
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
        let questionNumber = item.options.length;

        let result = answerList.find(
          (obj) => obj.questionId === item.id && obj.questionType === item.questionType
        );

        if (result) {
          if (result.answer.length !== questionNumber) {
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