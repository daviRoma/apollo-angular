import { Component, Input, OnInit } from '@angular/core';
import { InputQuestion } from 'src/app/models/question.model';

@Component({
  selector: 'app-input-question-answer',
  templateUrl: './input-question-answer.component.html',
  styleUrls: ['./input-question-answer.component.scss']
})
export class InputQuestionAnswerComponent implements OnInit {

  @Input() question: InputQuestion;

  constructor() { }

  ngOnInit(): void {

    console.log("question", this.question);

  }

  editQuestion(): void {

  }

  deleteQuestion(): void {

  }

}
