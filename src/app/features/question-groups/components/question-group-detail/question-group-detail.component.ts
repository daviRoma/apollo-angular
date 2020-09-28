import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';

import { EditQuestionGroupComponent } from 'src/app/features/question-groups/components/dialogs/edit-question-group/edit-question-group.component';
import { DeleteQuestionGroupComponent } from 'src/app/features/question-groups/components/dialogs/delete-question-group/delete-question-group.component';
import { InputQuestionDialogComponent } from 'src/app/features/questions/components/dialogs/input-question-dialog/input-question-dialog.component';
import { ChoiceQuestionDialogComponent } from 'src/app/features/questions/components/dialogs/choice-question-dialog/choice-question-dialog.component';
import { MatrixQuestionDialogComponent } from 'src/app/features/questions/components/dialogs/matrix-question-dialog/matrix-question-dialog.component';

import { QuestionGroup } from 'src/app/models/question-group.model';


@Component({
  selector: 'app-question-group-detail',
  templateUrl: './question-group-detail.component.html',
  styleUrls: ['./question-group-detail.component.scss'],
})
export class QuestionGroupDetailComponent implements OnInit {
  @Input() questionGroup: QuestionGroup;

  constructor(
    public questionGroupDialog: MatDialog,
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    console.log('QuestionGroupDetail', this.questionGroup);
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

  openChoiceQuestionDialog(choiceType: string): void {
    this.questionGroupDialog.open(ChoiceQuestionDialogComponent, {
      minWidth: '35%',
      maxWidth: '42%',
      position: { top: '6%' },
      data: {
        questionGroupId: this.questionGroup.id,
        surveyId: this.questionGroup.survey,
        type: choiceType,
        dialogConfig: {
          title: 'New Choice Question',
          operation: 'new',
        },
      },
    });
  }

  openInputQuestionDialog(): void {
    this.questionGroupDialog.open(InputQuestionDialogComponent, {
      minWidth: '35%',
      maxWidth: '42%',
      position: { top: '6%' },
      data: {
        questionGroupId: this.questionGroup.id,
        surveyId: this.questionGroup.survey,
        dialogConfig: {
          title: 'New Input Question',
          operation: 'new',
        },
      },
    });
  }

  openMatrixQuestionDialog(choiceType: string): void {
    this.questionGroupDialog.open(MatrixQuestionDialogComponent, {
      minWidth: '35%',
      maxWidth: '42%',
      position: { top: '6%' },
      data: {
        questionGroupId: this.questionGroup.id,
        surveyId: this.questionGroup.survey,
        type: choiceType,
        dialogConfig: {
          title: 'New Matrix Question',
          operation: 'new',
        },
      },
    });
  }

}
