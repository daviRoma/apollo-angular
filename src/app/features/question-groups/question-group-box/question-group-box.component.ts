import { Component, OnInit, Input } from '@angular/core';

import { Survey } from 'src/app/models/survey.model';
import { QuestionGroup } from 'src/app/models/question-group.model';

@Component({
  selector: 'app-question-group-box',
  templateUrl: './question-group-box.component.html',
  styleUrls: ['./question-group-box.component.scss']
})
export class QuestionGroupBoxComponent implements OnInit {

  @Input() questionGroup: QuestionGroup;

  constructor() { }

  ngOnInit(): void {
  }

  public openAddQuestionGroupModal(): void {}

  public openEditQuestionGroupModal(): void {}

  public openDeleteQuestionGroupDialog(): void {}

}
