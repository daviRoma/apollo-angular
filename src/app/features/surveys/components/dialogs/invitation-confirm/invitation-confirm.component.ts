import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';
import * as fromSurvey from 'src/app/features/surveys/store/selectors/survey.selectors';

import { SurveyPublishAction } from '../../../store/actions/survey.actions';

import { Survey } from 'src/app/models/survey.model';
import { Paths } from 'src/app/shared/config/path.conf';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-invitation-confirm',
  templateUrl: './invitation-confirm.component.html',
  styleUrls: ['./invitation-confirm.component.scss'],
})
export class InvitationConfirmComponent implements OnInit, OnDestroy {
  public dialogConfig: any;
  public survey: Survey;

  public publicLink: string;
  public isError: boolean;
  private subscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<InvitationConfirmComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.publicLink = Paths.surveyAnswer.publicLink;
    this.dialogConfig = this.data.dialogConfig;
    this.survey = { ...this.data.survey };
    this.isError = false;
  }

  ngOnInit(): void {
    this.subscription = this.store
      .select(fromSurvey.selectEntity, { id: this.survey.id })
      .subscribe((survey: Survey) => {
        if (survey) {
          this.survey = { ...survey };
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  sendInvitationAndPublish(): void {
    if (
      this.survey.invitationPool &&
      this.survey.invitationPool.emails.length
    ) {
      this.store.dispatch(
        new SurveyPublishAction({
          id: this.survey.id,
          url: `${Paths.surveyAnswer.publicLink}/${this.survey.id}/${this.survey.urlId}`,
        })
      );
      this.dialogRef.close({ result: 'close_after_invitation_confirm ' });
    } else {
      this.isError = true;
    }
  }

  closeDialog(): void {
    this.dialogRef.close({ result: 'close_cancel' });
  }

  cancel(): void {
    this.closeDialog();
  }
}
