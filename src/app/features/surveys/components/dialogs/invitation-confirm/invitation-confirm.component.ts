import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';
import { Survey } from 'src/app/models/survey.model';

@Component({
  selector: 'app-invitation-confirm',
  templateUrl: './invitation-confirm.component.html',
  styleUrls: ['./invitation-confirm.component.scss'],
})
export class InvitationConfirmComponent implements OnInit {
  public dialogConfig: any;
  public survey: Survey;
  public isError: boolean;

  constructor(
    public dialogRef: MatDialogRef<InvitationConfirmComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogConfig = this.data.dialogConfig;
    this.survey = { ...this.data.survey };
    this.isError = false;
  }

  ngOnInit(): void {}

  sendInvitationAndPublish(): void {
    // this.store.dispatch();
  }

  closeDialog(): void {
    this.dialogRef.close('close_cancel');
  }

  cancel(): void {
    this.closeDialog();
  }

}
