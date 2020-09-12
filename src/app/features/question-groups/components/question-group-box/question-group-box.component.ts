import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { QuestionGroup } from 'src/app/models/question-group.model';

import { EditQuestionGroupComponent } from 'src/app/features/question-groups/components/dialogs/edit-question-group/edit-question-group.component';
import { DeleteQuestionGroupComponent } from 'src/app/features/question-groups/components/dialogs/delete-question-group/delete-question-group.component';

@Component({
  selector: 'app-question-group-box',
  templateUrl: './question-group-box.component.html',
  styleUrls: ['./question-group-box.component.scss']
})
export class QuestionGroupBoxComponent implements OnInit {

  @Input() questionGroup: QuestionGroup;

  constructor(public questionGroupDialog: MatDialog) { }

  ngOnInit(): void {
  }

  openAddQuestionGroupModal(): void {
    this.questionGroupDialog.open(EditQuestionGroupComponent, {
      width: '35%',
      position: { top: '6%' },
      data: {
        dialogConfig: {
          title: 'New Question Group',
          operation: 'new'
        }
      }
    });
  }

  openEditQuestionGroupModal(): void {
    this.questionGroupDialog.open(EditQuestionGroupComponent, {
      width: '35%',
      position: { top: '6%' },
      data: {
        questionGroup: { ...this.questionGroup },
        dialogConfig: {
          title: 'Edit Question Group',
          operation: 'edit',
        },
      },
    });
  }

  openDeleteQuestionGroupDialog(): void {
    this.questionGroupDialog.open(DeleteQuestionGroupComponent, {
      minWidth: '20%',
      position: { top: '14%' },
      data: {
        questionGroup: { ...this.questionGroup }, // clone object
        dialogConfig: {
          title: 'Delete Question Group',
          content: 'Are you sure to delete the question group selected?',
        },
      },
    });
  }

}
