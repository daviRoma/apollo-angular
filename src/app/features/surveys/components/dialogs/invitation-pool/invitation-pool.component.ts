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
  public emails: any;
  public survey: Survey;
  public tagsInput: string;

  constructor(
    public dialogRef: MatDialogRef<InvitationPoolComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogConfig = this.data.dialogConfig;
    this.survey = { ...this.data.survey };
    this.emails = this.survey.invitationPool ? this.survey.invitationPool.emails : [];
    this.tagsInput = null;
  }

  ngOnInit(): void {}


  handleKeyUp(event: any): void {
    // without type info
    if (event.which === 44 || event.which === 13) {
      event.preventDefault();
      console.log(event.target.value);
      this.addTag(event.target.value.split(','));
    }

  }

  handleChange(event: any): void {
    this.addTag(event.target.value.split(','));
  }

  handleRemoveTag(event: any, index: number): void {
    this.emails.splice(index, 1);
  }

  sendInvitationPool(): void {
    if (!this.checkEmailPool()) {
      // Show error message
      return;
    }

    const payload = { ...this.survey };
    payload.invitationPool.emails = this.emails;

    this.dialogRef.close({
      result: 'close_after_send_invitation',
      data: payload,
    });
  }

  closeDialog(): void {
    this.dialogRef.close('close_cancel');
  }

  cancel(): void {
    this.closeDialog();
  }

  private addTag(data: any): void {
    if (data.length) {
      data.forEach(item => {
        if (item.trim().length && this.emails.find(email => email === item.trim()) === undefined) {
          this.emails.push(item);
        }
      });
      this.tagsInput = '';
    }
  }

  private checkEmailPool(): boolean {
    if (this.emails.length > 0) {
        if (this.emails.filter(this.validateEmail).length !== this.emails.length) {
          return false;
        }
        return true;
    }
    return false;
  }

  private validateEmail(email): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
