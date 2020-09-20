import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-question-dialog',
  templateUrl: './delete-question-dialog.component.html',
  styleUrls: ['./delete-question-dialog.component.scss'],
})
export class DeleteQuestionDialogComponent implements OnInit {

  public dialogConfig: any;
  public selectedQuestion: any;

  constructor(
    public dialogRef: MatDialogRef<DeleteQuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data.item) {
      this.selectedQuestion = this.data.item;
    }
    this.dialogConfig = this.data.dialogConfig;
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
      data: null,
    });
  }

  cancel(): void {
    this.closeDialog();
  }
}
