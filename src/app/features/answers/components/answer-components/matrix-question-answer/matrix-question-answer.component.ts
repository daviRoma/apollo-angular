import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatrixAnswer, MatrixPair } from 'src/app/models/answer.model';
import { MatrixQuestion } from 'src/app/models/question.model';

@Component({
  selector: 'app-matrix-question-answer',
  templateUrl: './matrix-question-answer.component.html',
  styleUrls: ['./matrix-question-answer.component.scss'],
})
export class MatrixQuestionAnswerComponent implements OnInit {
  @Input() question: MatrixQuestion;

  @Output() optionSelected = new EventEmitter();

  public matrixAnswer: MatrixAnswer;

  constructor() {}

  ngOnInit(): void {
    this.matrixAnswer = new MatrixAnswer();
    this.matrixAnswer.questionId = this.question.id;
    this.matrixAnswer.questionType = this.question.questionType;
    this.matrixAnswer.answer = [];
  }

  radioMatrixAnswerChange(element, answer): void {

    const result = this.matrixAnswer.answer.find(
      (item) => item.element == element
    );

    if (result) {
      result.answer = answer;
    } else {
      let pair = new MatrixPair();
      pair.answer = [];
      pair.element = element;
      pair.answer.push(element);
      this.matrixAnswer.answer.push(pair);
    }

    this.optionSelected.emit(this.matrixAnswer);
  }

  checkMatrixAnswerChange(element, answer): void {
    console.log(element, answer);

    let pair = new MatrixPair();
    pair.answer = [];

    pair.element = element;
    pair.answer.push(answer);

    const result = this.matrixAnswer.answer.find(
      (item) => item.element == element
    );

    if (result) {
      if (result.answer.includes(answer)) {
        result.answer = result.answer.filter((obj) => obj !== answer);
        if (result.answer.length === 0) {
          this.matrixAnswer.answer = this.matrixAnswer.answer.filter(
            (obj) => obj.element != element
          );
        }
      } else {
        result.answer.push(answer);
      }
    } else {
      this.matrixAnswer.answer.push(pair);
    }

    this.optionSelected.emit(this.matrixAnswer);
  }
}
