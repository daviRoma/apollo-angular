import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Survey } from 'src/app/models/survey.model';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-invitation-pool',
  templateUrl: './invitation-pool.component.html',
  styleUrls: ['./invitation-pool.component.scss'],
})
export class InvitationPoolComponent implements OnInit {

  public dialogConfig: any;
  public survey: Survey;

  constructor(
    public dialogRef: MatDialogRef<InvitationPoolComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  sendInvitationPool(): void {

  }

  closeDialog(): void {
    this.dialogRef.close('close_cancel');
  }

  cancel(): void {
    this.closeDialog();
  }
}
