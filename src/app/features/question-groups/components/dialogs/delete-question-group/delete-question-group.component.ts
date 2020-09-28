import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';
import { QuestionGroup, QuestionGroupRequest } from 'src/app/models/question-group.model';
import { QuestionGroupDeleteAction } from '../../../store/question-group.actions';

@Component({
  selector: 'app-delete-question-group',
  templateUrl: './delete-question-group.component.html',
  styleUrls: ['./delete-question-group.component.scss'],
})
export class DeleteQuestionGroupComponent implements OnInit {
  public dialogConfig: any;
  public questionGroup: QuestionGroup;

  constructor(
    public dialogRef: MatDialogRef<DeleteQuestionGroupComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogConfig = this.data.dialogConfig;

    if (this.data.item) {
      this.questionGroup = this.data.item;
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
    this.store.dispatch(new QuestionGroupDeleteAction(
      {
        surveyId: this.questionGroup.survey,
        questionGroup: { ...this.questionGroup }
      } as QuestionGroupRequest
    ));

    this.dialogRef.close({ result: 'close_after_delete' });
  }

  cancel(): void {
    this.closeDialog();
  }

}
