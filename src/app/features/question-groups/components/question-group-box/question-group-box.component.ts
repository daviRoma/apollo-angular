import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { QuestionGroup } from 'src/app/models/question-group.model';

import { EditQuestionGroupComponent } from 'src/app/features/question-groups/components/dialogs/edit-question-group/edit-question-group.component';
import { DeleteQuestionGroupComponent } from 'src/app/features/question-groups/components/dialogs/delete-question-group/delete-question-group.component';

import { InputQuestionDialogComponent } from 'src/app/features/questions/components/dialogs/input-question-dialog/input-question-dialog.component';

@Component({
  selector: 'app-question-group-box',
  templateUrl: './question-group-box.component.html',
  styleUrls: ['./question-group-box.component.scss']
})
export class QuestionGroupBoxComponent implements OnInit {

  @Input() questionGroups: QuestionGroup[];

  constructor(public questionGroupDialog: MatDialog) {
  }

  ngOnInit(): void {
    console.log('Question Groups', this.questionGroups);
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

  openEditQuestionGroupModal(questionGroup: QuestionGroup): void {
    this.questionGroupDialog.open(EditQuestionGroupComponent, {
      width: '35%',
      position: { top: '6%' },
      data: {
        questionGroup: { ...questionGroup },
        dialogConfig: {
          title: 'Edit Question Group',
          operation: 'edit',
        },
      },
    });
  }

  openDeleteQuestionGroupDialog(questionGroup: QuestionGroup): void {
    this.questionGroupDialog.open(DeleteQuestionGroupComponent, {
      minWidth: '20%',
      position: { top: '14%' },
      data: {
        questionGroup: { ...questionGroup }, // clone object
        dialogConfig: {
          title: 'Delete Question Group',
          content: 'Are you sure to delete the question group selected?',
        },
      },
    });
  }

  openSingleChoiceQuestionDialog(): void {

  }

  openMultiChoiceQuestionDialog(): void {

  }

  openSelectionQuestionDialog(): void {

  }

  openInputQuestionDialog(): void {
    const dialogRef = this.questionGroupDialog.open(InputQuestionDialogComponent, {
      width: '30%',
      position: { top: '12%' },
      data: {
        dialogConfig: {
          title: 'New Input Question',
          operation: 'new'
        },
      },
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response.result === 'close_after_new') {
        // Reload questions
      }
    });
  }

  openSingleMatrixQuestionDialog(): void {

  }

  openMultiMatrixQuestionDialog(): void {

  }

}
