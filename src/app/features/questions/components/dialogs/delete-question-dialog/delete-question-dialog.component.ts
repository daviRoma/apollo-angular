import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';

import { InputQuestionDeleteAction } from 'src/app/features/questions/store/actions/input-question.actions';
import { ChoiceQuestionDeleteAction } from 'src/app/features/questions/store/actions/choice-question.actions';
import { MatrixQuestionDeleteAction } from 'src/app/features/questions/store/actions/matrix-question.actions';

import { QuestionRequest, ChoiceQuestion, InputQuestion, MatrixQuestion } from 'src/app/models/question.model';

@Component({
  selector: 'app-delete-question-dialog',
  templateUrl: './delete-question-dialog.component.html',
  styleUrls: ['./delete-question-dialog.component.scss'],
})
export class DeleteQuestionDialogComponent implements OnInit {

  public dialogConfig: any;
  public question: ChoiceQuestion | InputQuestion | MatrixQuestion;

  constructor(
    public dialogRef: MatDialogRef<DeleteQuestionDialogComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogConfig = this.data.dialogConfig;

    if (this.data.item) {
      this.question = { ...this.data.item };
    }
  }

  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close('close_cancel');
  }

  /**
   * Manage confirm click on delete window.
   */
  confirm(): void {
    const request = {
      question: { ...this.question },
      questionGroupId: this.question.questionGroup,
      surveyId: this.question.survey
    } as QuestionRequest;

    switch (this.question.questionType) {
      case 'App\\InputQuestion':
        this.store.dispatch(new InputQuestionDeleteAction(request));
        break;
      case 'App\\MultiQuestion':
        this.store.dispatch(new ChoiceQuestionDeleteAction(request));
        break;
      case 'App\\MatrixQuestion':
        this.store.dispatch(new MatrixQuestionDeleteAction(request));
        break;
      default: break;
    }

    this.dialogRef.close({
      result: 'close_after_delete',
      data: this.question.id,
    });
  }

  cancel(): void {
    this.closeDialog();
  }
}
