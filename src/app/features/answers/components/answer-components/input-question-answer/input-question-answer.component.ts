import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SingleAnswer } from 'src/app/models/answer.model';
import { InputQuestion } from 'src/app/models/question.model';

@Component({
  selector: 'app-input-question-answer',
  templateUrl: './input-question-answer.component.html',
  styleUrls: ['./input-question-answer.component.scss'],
})
export class InputQuestionAnswerComponent implements OnInit {
  @Input() question: InputQuestion;

  @Output() inputInjected = new EventEmitter();

  public inputAnswer: SingleAnswer;

  constructor() {}

  ngOnInit(): void {
    this.inputAnswer = new SingleAnswer();
    this.inputAnswer.questionId = this.question.id;
    this.inputAnswer.questionType = this.question.questionType;
  }

  inputAnswerChange(event): void {
    let inputField = <HTMLInputElement>(
      document.getElementById('input-' + this.question.id)
    );

    this.inputAnswer.answer = inputField.value;

    this.inputInjected.emit(this.inputAnswer);
  }
}
