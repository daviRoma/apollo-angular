import { Component, OnInit } from '@angular/core';
import { ChoiceQuestion } from 'src/app/models/question.model';

@Component({
  selector: 'app-choice-question',
  templateUrl: './choice-question.component.html',
  styleUrls: ['./choice-question.component.scss']
})
export class ChoiceQuestionComponent implements OnInit {

  public question: ChoiceQuestion;

  constructor() { }

  ngOnInit(): void {
  }

  editQuestion(): void {}

  deleteQuestion(): void {}

}
