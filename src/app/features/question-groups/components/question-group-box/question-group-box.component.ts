import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';

import { QuestionGroup } from 'src/app/models/question-group.model';
import { EditQuestionGroupComponent } from '../dialogs/edit-question-group/edit-question-group.component';

@Component({
  selector: 'app-question-group-box',
  templateUrl: './question-group-box.component.html',
  styleUrls: ['./question-group-box.component.scss'],
})
export class QuestionGroupBoxComponent implements OnInit {

  @Input() questionGroups: QuestionGroup[];
  @Input() surveyId: number;

  constructor(
    public questionGroupDialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    console.log('Question Groups', this.questionGroups);
  }

  openAddQuestionGroupModal(): void {
    this.questionGroupDialog.open(EditQuestionGroupComponent, {
      width: '35%',
      position: { top: '6%' },
      data: {
        surveyId: this.surveyId,
        dialogConfig: {
          title: 'New Question Group',
          operation: 'new',
        },
      },
    });
  }
}
