import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-survey',
  templateUrl: './delete-survey.component.html',
  styleUrls: ['./delete-survey.component.scss'],
})
export class DeleteSurveyComponent implements OnInit {
  public dialogConfig: any;
  public selectedSurvey: any;

  constructor(
    public dialogRef: MatDialogRef<DeleteSurveyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data.item) {
      this.selectedSurvey = JSON.parse(this.data.item);
    }
    this.dialogConfig = this.data.dialogConfig;
  }

  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   * Manage confirm click on delete window.
   */
  confirm(): void {
    this.dialogRef.close({
      result: 'close_after_delete',
      data: this.selectedSurvey,
    });
  }

  cancel(): void {
    this.closeDialog();
  }
}
