import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-question-group',
  templateUrl: './delete-question-group.component.html',
  styleUrls: ['./delete-question-group.component.scss'],
})
export class DeleteQuestionGroupComponent implements OnInit {
  public dialogConfig: any;
  public selectedQuestionGroup: any;

  constructor(
    public dialogRef: MatDialogRef<DeleteQuestionGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogConfig = this.data.dialogConfig;
    if (this.data.questionGroup) {
      this.selectedQuestionGroup = this.data.questionGroup;
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
    this.dialogRef.close({
      result: 'close_after_delete',
      data: this.selectedQuestionGroup,
    });
  }

  cancel(): void {
    this.closeDialog();
  }

}
