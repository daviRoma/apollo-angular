import { Component, OnInit } from '@angular/core';
import { ChoiceQuestion } from 'src/app/models/question.model';

@Component({
  selector: 'app-choice-question-answer',
  templateUrl: './choice-question-answer.component.html',
  styleUrls: ['./choice-question-answer.component.scss']
})
export class ChoiceQuestionAnswerComponent implements OnInit {

  public question: ChoiceQuestion;

  constructor() { }

  ngOnInit(): void {
  }

  editQuestion(): void {}

  deleteQuestion(): void {}

}
