import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { AppState } from 'src/app/state/app.state';

import { InvitationPool } from 'src/app/models/invitation-pool.model';
import { SurveyAnswer } from 'src/app/models/survey-answer.model';

@Component({
  selector: 'app-secret-survey-login',
  templateUrl: './secret-survey-login.component.html',
  styleUrls: ['./secret-survey-login.component.scss']
})

export class SecretSurveyLoginComponent implements OnInit {

  public dialogConfig: any;

  private surveyAnswers: SurveyAnswer[];
  private invitationPool: InvitationPool;

  public email: string;
  public code: string;

  public errorValue: string;

  constructor(
    public dialogRef: MatDialogRef<SecretSurveyLoginComponent>,
    private translate: TranslateService,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogConfig = this.data.dialogConfig;

    if (this.data.invitationPool) {
      this.invitationPool = { ...this.data.invitationPool };
    }
    if (this.data.surveyAnswers) {
      this.surveyAnswers = this.data.surveyAnswers;
    }
  }

  ngOnInit(): void { }

  closeDialog(): void {
    this.dialogRef.close('close_cancel');
  }

  /**
   * Manage confirm click on delete window.
   */
  confirm(): void {
    if (this.invitationPool.emails.find(item => item === this.email)) {

      if (this.surveyAnswers.find(answer => answer.email === this.email)) {

        this.errorValue = this.translate.instant('survey.alreadyanswered');

      } else {

        if (this.invitationPool.password === this.code) {

          this.dialogRef.close({
            result: 'abilitated',
            email: this.email,
            password: this.code,
          });

        } else {
          this.errorValue = this.translate.instant('error.invalidCode');
        }

      }
    } else {
      this.errorValue = this.translate.instant('survey.notactive');
    }

  }

  cancel(): void {
    this.closeDialog();
  }
}
