import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnswersWrapper } from 'src/app/models/answer.model';

import { QuestionGroup } from 'src/app/models/question-group.model';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-question-group-answer-box',
  templateUrl: './question-group-answer-box.component.html',
  styleUrls: ['./question-group-answer-box.component.scss'],
})
export class QuestionGroupAnswerBoxComponent implements OnInit {
  @Input() questionGroups: QuestionGroup[];

  public group: QuestionGroup;
  private index = 0;

  private mandatoryCompleted= true;
  private mandatoryQuestion: Question[];

  private answerWrapper: AnswersWrapper;

  constructor() {}

  ngOnInit(): void {
    console.log('Groups', this.questionGroups);
    this.group = this.questionGroups[0];

    this.answerWrapper = new AnswersWrapper();
    this.answerWrapper.answers = [];

    this.updateMandatoryQuestion();
  }

  onNextGroup(): void {
    if (
      this.index < this.questionGroups.length - 1 &&
      this.mandatoryCompleted
    ) {
      this.index++;
      this.group = this.questionGroups[this.index];
    }
  }

  onPreviousGroup(): void {
    if (this.index > 0) {
      this.index--;
      this.group = this.questionGroups[this.index];
    }
  }

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

  prova(event): void {
    let notEmptyAnswer = event.answers.filter(
      (item) => item.answer !== '' || item.answer != [] || item.answer.lenght != 0
    );

    this.mandatoryCompleted = true;

    if (this.mandatoryQuestion.length !== 0) {
      console.log("sono qui", this.mandatoryCompleted);

      for (let i = 0; i < this.mandatoryQuestion.length && this.mandatoryCompleted; i++) {
        if (!notEmptyAnswer.find(
            (obj) =>
              obj.questionId === this.mandatoryQuestion[i].id &&
              obj.questionType === this.mandatoryQuestion[i].questionType
          )
        ) {
          console.log('mandatory not finded', this.mandatoryQuestion[i]);
          this.mandatoryCompleted = false;
        } else console.log("mandatory finded")

      }
    } else {
      this.answerWrapper.answers.push(notEmptyAnswer);
    }

    if (this.mandatoryCompleted) {
      this.answerWrapper.answers[this.index] = notEmptyAnswer;
    }

    console.log(this.answerWrapper);
  }
}
