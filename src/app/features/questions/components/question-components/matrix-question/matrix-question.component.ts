import { Component, OnInit, Input } from '@angular/core';
import { MatrixQuestion } from 'src/app/models/question.model';

@Component({
  selector: 'app-matrix-question',
  templateUrl: './matrix-question.component.html',
  styleUrls: ['./matrix-question.component.scss']
})
export class MatrixQuestionComponent implements OnInit {

  @Input() question: MatrixQuestion;

  constructor() { }

  ngOnInit(): void {
  }

  editQuestion(): void {}

  deleteQuestion(): void {}

}
