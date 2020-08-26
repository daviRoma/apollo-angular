import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Survey } from 'src/app/models/survey.model';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.scss'],
})
export class EditSurveyComponent implements OnInit {

  public dialogConfig: any;
  public survey: Survey;

  constructor(
    public dialogRef: MatDialogRef<EditSurveyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data.item) {
      this.survey = JSON.parse(this.data.item);
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
      result: 'close_after_' + this.dialogConfig.operation,
      data: this.survey,
    });
  }

  cancel(): void {
    this.closeDialog();
  }
}
