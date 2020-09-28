import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { QuestionGroupLoadOneAction } from 'src/app/features/question-groups/store/question-group.actions';

import { ChoiceQuestionDialogComponent } from '../../dialogs/choice-question-dialog/choice-question-dialog.component';
import { DeleteQuestionDialogComponent } from 'src/app/features/questions/components/dialogs/delete-question-dialog/delete-question-dialog.component';

import { ChoiceQuestion } from 'src/app/models/question.model';
import { QuestionGroup, QuestionGroupRequest } from 'src/app/models/question-group.model';
import { DeleteDialogConf, QuestionDialogConf } from 'src/app/shared/dialog.conf';

@Component({
  selector: 'app-choice-question',
  templateUrl: './choice-question.component.html',
  styleUrls: ['./choice-question.component.scss'],
})
export class ChoiceQuestionComponent implements OnInit {
  @Input() question: ChoiceQuestion;
  @Input() readonly: boolean;

  constructor(
    public questionDialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    QuestionDialogConf.data.question = { ...this.question };
    QuestionDialogConf.data.type = this.question.type;
    QuestionDialogConf.data.dialogConfig.title = 'Edit Choice Question';
    QuestionDialogConf.data.dialogConfig.operation = 'edit';

    DeleteDialogConf.data.item = { ...this.question };
    DeleteDialogConf.data.dialogConfig.title = 'Delete Question';
    DeleteDialogConf.data.dialogConfig.content = 'Are you sure to delete this question?';
  }

  editQuestion(): void {
    const dialogRef = this.questionDialog.open(ChoiceQuestionDialogComponent, QuestionDialogConf);
    this.reload(dialogRef);
  }

  deleteQuestion(): void {
    const dialogRef = this.questionDialog.open(DeleteQuestionDialogComponent, DeleteDialogConf);
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
