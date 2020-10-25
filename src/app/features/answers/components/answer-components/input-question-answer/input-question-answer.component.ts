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

  @Input()
  set answers(answers: any[]) {
    // View answer
    if (answers) {
      this.readOnly = true;
      if (answers.length) {
        this._answers = [ ...answers ];
        this.showAnswer();
      }
    }
  }
  get answers(): any[] {
    return this._answers;
  }

  public inputAnswer: SingleAnswer;

  public inputvalue: string;

  public readOnly: boolean;

  private _answers: any[];

  constructor() {}

  ngOnInit(): void {
    this.inputAnswer = new SingleAnswer();
    this.inputAnswer.questionId = this.question.id;
    this.inputAnswer.questionType = this.question.questionType;

  }

  showAnswer(): void {
    const answer = this._answers.find( answ => (answ.question.id === this.question.id && answ.question.questionType === 'App\\InputQuestion'));
    if (answer && answer.answers) this.inputvalue = answer.answers[0];
  }

  inputAnswerChange(event): void {
    this.inputAnswer.answer = event.target.value;
    this.inputInjected.emit(this.inputAnswer);
  }
}
