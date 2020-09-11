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
      width: '45%',
      position: { top: '4%' },
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
      width: '45%',
      position: { top: '4%' },
      data: {
        dialogConfig: {
          title: 'Edit Question Group',
          operation: 'edit'
        }
      }
    });
  }

  openDeleteQuestionGroupDialog(): void {
    this.questionGroupDialog.open(DeleteQuestionGroupComponent, {
      width: '20%',
      position: { top: '7%' },
      data: {
        dialogConfig: {
          title: 'Delete Question Group'
        }
      }
    });
  }

}
