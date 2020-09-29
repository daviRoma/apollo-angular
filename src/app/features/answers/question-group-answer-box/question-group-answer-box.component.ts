import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { QuestionGroup } from 'src/app/models/question-group.model';

@Component({
  selector: 'app-question-group-answer-box',
  templateUrl: './question-group-answer-box.component.html',
  styleUrls: ['./question-group-answer-box.component.scss']
})
export class QuestionGroupAnswerBoxComponent implements OnInit {

  @Input() questionGroups: QuestionGroup[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
