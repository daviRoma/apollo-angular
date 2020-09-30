import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MultiAnswer, SingleAnswer } from 'src/app/models/answer.model';
import { ChoiceQuestion } from 'src/app/models/question.model';

@Component({
  selector: 'app-choice-question-answer',
  templateUrl: './choice-question-answer.component.html',
  styleUrls: ['./choice-question-answer.component.scss'],
})
export class ChoiceQuestionAnswerComponent implements OnInit {
  @Input() question: ChoiceQuestion;
  @Output() optionSelected = new EventEmitter();

  public choiceAnswer: SingleAnswer;
  public checkAnswer: MultiAnswer;

  @ViewChild('otherRadio') otherRadio: ElementRef;

  constructor() {}

  ngOnInit(): void {
    this.choiceAnswer = new SingleAnswer();
    this.choiceAnswer.questionType = 'App\\MultiQuestion';
    this.choiceAnswer.questionId = this.question.id;

    this.checkAnswer = new MultiAnswer();
    this.checkAnswer.questionType = 'App\\MultiQuestion';
    this.checkAnswer.questionId = this.question.id;
    this.checkAnswer.answer = [];
  }

  // GESTIRE LA RIMOZIONE

  choiceRadioAnswerChange(event, option): void {

    this.choiceAnswer.answer = option;
    this.optionSelected.emit(this.choiceAnswer);
  }

  choiceRadioOtherAnswerChange(event): void {

    let value = (<HTMLInputElement>event.target).value;
    this.choiceAnswer.answer = value;
    this.optionSelected.emit(this.choiceAnswer);
  }

  // updateRadioOtherAnswerChange(event): void {

  //   let value = (<HTMLInputElement>event.target).value;
  //   this.choiceAnswer.answer = value;
  //   this.optionSelected.emit(this.choiceAnswer);
  // }

  choiceCheckAnswerChange(event, option): void {

    this.checkAnswer.answer.push(option);
    console.log(this.checkAnswer);

    this.optionSelected.emit(this.checkAnswer);
  }

  choiceCheckOtherAnswerChange(event): void {
   
    let value = (<HTMLInputElement>event.target).value;
    this.checkAnswer.answer.push(value);
    console.log(this.checkAnswer);

    this.optionSelected.emit(this.choiceAnswer);
  }

  // updateCheckOtherAnswerChange(event): void {
  //   let value = (<HTMLInputElement>event.target).value;
  //   this.choiceAnswer.answer = value;
  //   this.choiceAnswer.questionType = 'App\\MultiQuestion';
  //   this.choiceAnswer.questionId = this.question.id;

  //   this.optionSelected.emit(this.choiceAnswer);
  // }
}
