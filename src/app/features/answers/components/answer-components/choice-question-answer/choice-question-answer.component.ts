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
  @Input() answers: any[];

  @Output() optionSelected = new EventEmitter();

  public choiceAnswer: SingleAnswer;
  public checkAnswer: MultiAnswer;

  public selectedValue: string;
  public readOnly: boolean;

  private otherStatus = false;

  constructor() { }

  ngOnInit(): void {
    this.choiceAnswer = new SingleAnswer();
    this.choiceAnswer.questionId = this.question.id;
    this.choiceAnswer.questionType = this.question.questionType;

    this.checkAnswer = new MultiAnswer();
    this.checkAnswer.questionId = this.question.id;
    this.checkAnswer.questionType = this.question.questionType;
    this.checkAnswer.answers = [];

    // View answer
    if (this.answers) {
      this.readOnly = true;
      this.showAnswer();
    }

  }

  showAnswer(): void {
    const answer = this.answers.find(answ => (answ.question.id === this.question.id && answ.question.questionType === 'App\\MultiQuestion'));
    const options = [...this.question.options].map(op => ({ id: op.id, value: op.value, checked: false }));

    if (answer) {
      this.question = {
        ...this.question,
        options: options.map(op => {
          answer.answers.forEach(value => {
            if (op.value === value) {
              op.checked = true;
              if (this.question.type === 'SELECT') this.selectedValue = op.value;
            }
          });
          return op;
        })
      };
    }
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
    if (this.checkAnswer.answers.includes(option)) {
      this.checkAnswer.answers = this.checkAnswer.answers.filter(
        (element) => element !== option
      );
    } else {
      this.checkAnswer.answers.push(option);
    }
    this.optionSelected.emit(this.checkAnswer);
  }

  choiceSelectAnswerChange(option): void {

    this.checkAnswer.answer = option;
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
        this.checkAnswer.answers.push(otherInput.value);
      }
    } else {
      otherInput.disabled = false;

      if (otherInput.value != '') {
        if (this.checkAnswer.answers.includes(otherInput.value)) {
          this.checkAnswer.answers = this.checkAnswer.answers.filter(
            (element) => element !== otherInput.value
          );
        }
      }
    }

    this.optionSelected.emit(this.checkAnswer);
  }
}
