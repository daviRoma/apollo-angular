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

  private otherStatus = false;

  constructor() { }

  ngOnInit(): void {
    this.choiceAnswer = new SingleAnswer();
    this.choiceAnswer.questionId = this.question.id;
    this.choiceAnswer.questionType = this.question.questionType;

    this.checkAnswer = new MultiAnswer();
    this.checkAnswer.questionId = this.question.id;
    this.checkAnswer.questionType = this.question.questionType;
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

  updateRadioOtherAnswerChange(event): void {
    let value = (<HTMLInputElement>event.target).value;
    this.choiceAnswer.answer = value;
    this.optionSelected.emit(this.choiceAnswer);
  }

  choiceCheckAnswerChange(event, option): void {
    if (this.checkAnswer.answer.includes(option)) {
      this.checkAnswer.answer = this.checkAnswer.answer.filter(
        (element) => element !== option
      );
    } else {
      this.checkAnswer.answer.push(option);
    }
    this.optionSelected.emit(this.checkAnswer);
  }

  choiceSelectAnswerChange(option): void {

    this.checkAnswer.answer= option;
    this.optionSelected.emit(this.checkAnswer);
  }

  choiceCheckOtherAnswerChange(event): void {
    this.otherStatus = !this.otherStatus;

    let otherInput = <HTMLInputElement>(
      document.getElementById('other_choice-answer-' + this.question.id)
    );

    if (this.otherStatus) {
      otherInput.disabled = true;

      if (otherInput.value != '') {
        this.checkAnswer.answer.push(otherInput.value);
      }
    } else {
      otherInput.disabled = false;

      if (otherInput.value != '') {
        if (this.checkAnswer.answer.includes(otherInput.value)) {
          this.checkAnswer.answer = this.checkAnswer.answer.filter(
            (element) => element !== otherInput.value
          );
        }
      }
    }

    this.optionSelected.emit(this.checkAnswer);
  }
}
