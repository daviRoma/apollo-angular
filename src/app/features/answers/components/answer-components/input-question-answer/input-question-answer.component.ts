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
  @Input() answers: any[];

  @Output() inputInjected = new EventEmitter();

  public inputAnswer: SingleAnswer;

  public inputvalue: string;

  public readOnly: boolean;

  constructor() {}

  ngOnInit(): void {
    this.inputAnswer = new SingleAnswer();
    this.inputAnswer.questionId = this.question.id;
    this.inputAnswer.questionType = this.question.questionType;

    // View answer
    if (this.answers) {
      this.readOnly = true;
      this.showAnswer();
    }

  }

  showAnswer(): void {
    const answer = this.answers.find( answ => (answ.question.id === this.question.id && answ.question.questionType === 'App\\InputQuestion'));
    if (answer) this.inputvalue = answer.answers[0];
  }

  inputAnswerChange(event): void {
    this.inputAnswer.answer = event.target.value;
    console.log(event.target.value);
    this.inputInjected.emit(this.inputAnswer);
  }
}
