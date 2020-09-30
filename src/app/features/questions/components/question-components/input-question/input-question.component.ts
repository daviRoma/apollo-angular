import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Store } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';
import { QuestionGroupLoadOneAction } from 'src/app/features/question-groups/store/question-group.actions';

import { InputQuestionDialogComponent } from '../../dialogs/input-question-dialog/input-question-dialog.component';
import { DeleteQuestionDialogComponent } from 'src/app/features/questions/components/dialogs/delete-question-dialog/delete-question-dialog.component';

import { InputQuestion } from 'src/app/models/question.model';
import { QuestionGroup, QuestionGroupRequest } from 'src/app/models/question-group.model';
import { DeleteDialogConf, QuestionDialogConf } from 'src/app/shared/config/dialog.conf';

@Component({
  selector: 'app-input-question',
  templateUrl: './input-question.component.html',
  styleUrls: ['./input-question.component.scss']
})
export class InputQuestionComponent implements OnInit {

  @Input() question: InputQuestion;
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
    this.editDialogConf.data.dialogConfig.title = 'Edit Input Question';
    this.editDialogConf.data.dialogConfig.operation = 'edit';

    this.deleteDilogConf = { ...DeleteDialogConf };
    this.deleteDilogConf.data.item = { ...this.question };
    this.deleteDilogConf.data.dialogConfig.title = 'Delete Question';
    this.deleteDilogConf.data.dialogConfig.content = 'Are you sure to delete this question?';
  }

  editQuestion(): void {
    const dialogRef = this.questionDialog.open(InputQuestionDialogComponent, this.editDialogConf);
    this.reload(dialogRef);
  }

  deleteQuestion(): void {
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
