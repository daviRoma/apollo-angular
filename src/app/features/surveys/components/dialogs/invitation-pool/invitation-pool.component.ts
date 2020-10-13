import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Survey } from 'src/app/models/survey.model';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { InvitationPoolUpdateAction, InvitationPoolNewAction } from '../../../store/actions/invitation-pool.actions';

import { InvitationPool, InvitationPoolRequest } from 'src/app/models/invitation-pool.model';

import Utils from 'src/app/shared/utils';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-invitation-pool',
  templateUrl: './invitation-pool.component.html',
  styleUrls: ['./invitation-pool.component.scss'],
})
export class InvitationPoolComponent implements OnInit {
  public survey: Survey;

  public dialogConfig: any;

  public emails: string[];
  public tagsInput: string;

  public isError: boolean;
  public errorMessage: string;

  constructor(
    public dialogRef: MatDialogRef<InvitationPoolComponent>,
    private transalte: TranslateService,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogConfig = this.data.dialogConfig;
    this.survey = { ...this.data.survey };
    this.emails = this.survey.invitationPool ? [...this.survey.invitationPool.emails] : [];
    this.tagsInput = null;
  }

  ngOnInit(): void {}


  handleKeyUp(event: any): void {
    // without type info
    if (event.which === 44 || event.which === 13) {
      event.preventDefault();
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
      this.isError = true;
      return;
    }

    // If invitation pool already exist
    if (this.survey.invitationPool) {

      const payload = Utils.deleteNullKey({ ...this.survey.invitationPool });
      payload.emails = this.emails;

      this.store.dispatch(new InvitationPoolUpdateAction({ surveyId: this.survey.id, invitationPool: payload }));
    } else {
      const payload = {
        password: Utils.makeRandom(20),
        emails: this.emails
      } as InvitationPool;

      this.store.dispatch(
        new InvitationPoolNewAction(
          { surveyId: this.survey.id, invitationPool: payload } as InvitationPoolRequest
        )
      );
    }

    this.dialogRef.close({
      result: 'close_after_set_invitation',
      data: null,
    });
  }

  closeDialog(): void {
    this.dialogRef.close({ result: 'close_cancel'});
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
      if (this.emails.filter(Utils.validateEmail).length !== this.emails.length) {
        this.errorMessage = this.transalte.instant('error.invalidEmail');
        return false;
      }
      this.isError = false;
      return true;
    }

    this.errorMessage = this.transalte.instant('error.noemailaddress');
    return false;
  }

}
