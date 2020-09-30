import { Component, Input, OnInit } from '@angular/core';
import { MatrixQuestion } from 'src/app/models/question.model';

@Component({
  selector: 'app-matrix-question-answer',
  templateUrl: './matrix-question-answer.component.html',
  styleUrls: ['./matrix-question-answer.component.scss']
})
export class MatrixQuestionAnswerComponent implements OnInit {

  @Input() question: MatrixQuestion;


  constructor() { }

  ngOnInit(): void {
  }


  editQuestion(): void {}

  deleteQuestion(): void {}


}
