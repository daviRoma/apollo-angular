import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatrixSingleAnswer, MatrixMultiAnswer, MatrixSinglePair, MatrixMultiPair } from 'src/app/models/answer.model';
import { MatrixQuestion } from 'src/app/models/question.model';

@Component({
  selector: 'app-matrix-question-answer',
  templateUrl: './matrix-question-answer.component.html',
  styleUrls: ['./matrix-question-answer.component.scss'],
})
export class MatrixQuestionAnswerComponent implements OnInit {
  @Input() question: MatrixQuestion;

  @Input()
  set answers(answers: any[]) {
    // View answer
    if (answers) {
      this.readOnly = true;
      if (answers.length) this._answers = [ ...answers ];

    }
  }
  get answers(): any[] {
    return this._answers;
  }

  @Output() optionSelected = new EventEmitter();

  public matrixSingleAnswer: MatrixSingleAnswer;
  public matrixMultiAnswer: MatrixMultiAnswer;

  public readOnly: boolean;

  private _answers: any[];

  constructor() {}

  ngOnInit(): void {
    this.matrixSingleAnswer = new MatrixSingleAnswer();
    this.matrixSingleAnswer.questionId = this.question.id;
    this.matrixSingleAnswer.questionType = this.question.questionType;
    this.matrixSingleAnswer.answerPair = [];

    this.matrixMultiAnswer = new MatrixMultiAnswer();
    this.matrixMultiAnswer.questionId = this.question.id;
    this.matrixMultiAnswer.questionType = this.question.questionType;
    this.matrixMultiAnswer.answersPair = [];

  }

  isChecked(option: any, element: any): boolean {
    let checked = false;
    const answer = this._answers.find(
      answ => (
        answ.question.id === this.question.id && answ.question.questionType === 'App\\MatrixQuestion'
      )
    );

    if (answer) {
      answer.answers.forEach(value => {
        if (value.element === element.title) {
          value.answers.forEach(item => {
            if (option.value === item) {
              checked = true;
            }
          });
        }
      });
    }

    return checked;
  }

  radioMatrixAnswerChange(element, answer): void {

    const result = this.matrixSingleAnswer.answerPair.find(
      (item) => item.element == element
    );

    if (result) {
      result.answer = answer;
    } else {
      let pair = new MatrixSinglePair();
      pair.element = element;
      pair.answer= answer;
      this.matrixSingleAnswer.answerPair.push(pair);
    }
    this.optionSelected.emit(this.matrixSingleAnswer);
  }

  checkMatrixAnswerChange(element, answer): void {

    let pair = new MatrixMultiPair();
    pair.answers = [];

    pair.element = element;
    pair.answers.push(answer);

    const result = this.matrixMultiAnswer.answersPair.find(
      (item) => item.element == element
    );

    if (result) {
      if (result.answers.includes(answer)) {
        result.answers = result.answers.filter((obj) => obj !== answer);
        if (result.answers.length === 0) {
          this.matrixMultiAnswer.answersPair = this.matrixMultiAnswer.answersPair.filter(
            (obj) => obj.element != element
          );
        }
      } else {
        result.answers.push(answer);
      }
    } else {

      this.matrixMultiAnswer.answersPair.push(pair);
    }
    this.optionSelected.emit(this.matrixMultiAnswer);
  }
}
