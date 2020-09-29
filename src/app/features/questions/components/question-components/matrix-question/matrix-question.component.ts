import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { QuestionGroupLoadOneAction } from 'src/app/features/question-groups/store/question-group.actions';

import { MatrixQuestionDialogComponent } from '../../dialogs/matrix-question-dialog/matrix-question-dialog.component';
import { DeleteQuestionDialogComponent } from 'src/app/features/questions/components/dialogs/delete-question-dialog/delete-question-dialog.component';

import { MatrixQuestion } from 'src/app/models/question.model';
import { QuestionGroup, QuestionGroupRequest } from 'src/app/models/question-group.model';
import { DeleteDialogConf, QuestionDialogConf } from 'src/app/shared/config/dialog.conf';

@Component({
  selector: 'app-matrix-question',
  templateUrl: './matrix-question.component.html',
  styleUrls: ['./matrix-question.component.scss']
})
export class MatrixQuestionComponent implements OnInit {

  @Input() question: MatrixQuestion;
  @Input() readonly: boolean;

  public editDialogConf: any;
  public deleteDilogConf: any;

  constructor(
    public questionDialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.editDialogConf = { ...QuestionDialogConf };
    this.editDialogConf.data.question = { ...this.question };
    this.editDialogConf.data.type = this.question.type;
    this.editDialogConf.data.dialogConfig.title = 'Edit Matrix Question';
    this.editDialogConf.data.dialogConfig.operation = 'edit';

    this.deleteDilogConf = { ...DeleteDialogConf };
    this.deleteDilogConf.data.item = { ...this.question };
    this.deleteDilogConf.data.dialogConfig.title = 'Delete Question';
    this.deleteDilogConf.data.dialogConfig.content = 'Are you sure to delete this question?';
  }

  editQuestion(): void {
    const dialogRef = this.questionDialog.open(MatrixQuestionDialogComponent, this.editDialogConf);
    this.reload(dialogRef);
  }

  deleteQuestion(): void {
    const dialogRef = this.questionDialog.open(DeleteQuestionDialogComponent, this.deleteDilogConf);
    this.reload(dialogRef);
  }

  private reload(dialogRef: any): void {
    dialogRef.afterClosed().subscribe(
      response => {
        if (response.result === 'close_after_delete') {
          this.store.dispatch(new QuestionGroupLoadOneAction(
            {
              questionGroup: { id: this.question.questionGroup } as QuestionGroup,
              surveyId: this.question.survey
            } as QuestionGroupRequest
          ));
        }
      }
    );
  }

}
