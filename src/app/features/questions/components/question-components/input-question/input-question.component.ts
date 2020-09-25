import { Component, OnInit, Input } from '@angular/core';
import { InputQuestion } from 'src/app/models/question.model';

@Component({
  selector: 'app-input-question',
  templateUrl: './input-question.component.html',
  styleUrls: ['./input-question.component.scss']
})
export class InputQuestionComponent implements OnInit {

  @Input() question: InputQuestion;

  constructor() { }

  ngOnInit(): void {
  }

  editQuestion(): void {

  }

  deleteQuestion(): void {

  }

}
