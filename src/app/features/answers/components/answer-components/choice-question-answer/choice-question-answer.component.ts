import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
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

  public readOnly: boolean;
  public otherChoice: string;

  private otherStatus = false;

  constructor() {
    this.otherChoice = null;
  }

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
    }

  }

  isChecked(option: any): boolean {
    let checked = false;
    const answer = this.answers.find(
      answ => (
        answ.question.id === this.question.id && answ.question.questionType === 'App\\MultiQuestion'
      )
    );

    answer.answers.forEach(value => {
      if (value === option.value) {
        checked = true;
      }
    });
    return checked;
  }

  hasOtherChoice(): boolean {
    const answer = this.answers.find(
      answ => (
        answ.question.id === this.question.id && answ.question.questionType === 'App\\MultiQuestion'
      )
    );

    answer.answers.forEach(value => {
      if (!this.question.options.find(op => op.value === value)) {
        this.otherChoice = value;
        return;
      }
    });

    return this.otherChoice !== null;
  }

  getSelected(): string {
    if (!this.answers) return null;
    let options = [...this.question.options].map(op => ({ id: op.id, value: op.value, selected: false }));
    let selectedValue;
    const answer = this.answers.find(
      answ => (
        answ.question.id === this.question.id && answ.question.questionType === 'App\\MultiQuestion'
      )
    );

    answer.answers.forEach(value => {
      if (options.find(op => op.value === value)) {
        options.find(op => op.value === value).selected = true;
        selectedValue = value;
        return;
      }
    });

    this.question = {
      ...this.question,
      options: [ ...options ]
    };

    return selectedValue;
  }

  // GESTIRE LA RIMOZIONE

  choiceRadioAnswerChange(event, option): void {
    this.choiceAnswer.answer = option;
    this.optionSelected.emit(this.choiceAnswer);
  }

  choiceRadioOtherAnswerChange(event): void {
    this.choiceAnswer.answer = event.target.value;
    this.optionSelected.emit(this.choiceAnswer);
  }

  updateRadioOtherAnswerChange(event): void {
    this.choiceAnswer.answer = event.target.value;
    this.optionSelected.emit(this.choiceAnswer);
  }

  choiceSelectAnswerChange(option): void {

    this.choiceAnswer.answer = option;
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

  choiceCheckOtherAnswerChange(event): void {
    this.otherStatus = !this.otherStatus;

    let otherInput = <HTMLInputElement>(
      document.getElementById('other_choice-answer-' + this.question.id)
    );

    if (this.otherStatus) {
      otherInput.disabled = true;

      if (otherInput.value !== '') {
        this.checkAnswer.answers.push(otherInput.value);
      }
    } else {
      otherInput.disabled = false;

      if (otherInput.value !== '') {
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
