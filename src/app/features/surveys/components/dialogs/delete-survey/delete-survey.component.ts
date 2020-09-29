import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

import { Survey } from 'src/app/models/survey.model';
import { SurveyDeleteAction } from '../../../store/actions/survey.actions';

@Component({
  selector: 'app-delete-survey',
  templateUrl: './delete-survey.component.html',
  styleUrls: ['./delete-survey.component.scss'],
})
export class DeleteSurveyComponent implements OnInit {
  public dialogConfig: any;
  public survey: Survey;

  constructor(
    public dialogRef: MatDialogRef<DeleteSurveyComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data.item) {
      this.survey = this.data.item;
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
    this.store.dispatch(new SurveyDeleteAction(this.survey.id));

    this.dialogRef.close({
      result: 'close_after_delete',
      data: this.survey,
    });
  }

  cancel(): void {
    this.closeDialog();
  }
}
