import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DeleteQuestionDialogComponent } from 'src/app/features/questions/components/dialogs/delete-question-dialog/delete-question-dialog.component';
import { InvitationPool } from 'src/app/models/invitation-pool.model';
import { SurveyAnswer } from 'src/app/models/survey-answer.model';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-secret-survey-login',
  templateUrl: './secret-survey-login.component.html',
  styleUrls: ['./secret-survey-login.component.scss']
})

export class SecretSurveyLoginComponent implements OnInit {

  public dialogConfig: any;

  private surveyAnswers: SurveyAnswer[];
  private invitationPool: InvitationPool;

  public errorValue: string;

  constructor(
    public dialogRef: MatDialogRef<SecretSurveyLoginComponent>,
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

    let email = (<HTMLInputElement>document.getElementById('email')).value;
    let code = (<HTMLInputElement>document.getElementById('code')).value;
    if (this.invitationPool.emails.find(item => item === email)) {

      console.log("ANSSS", this.surveyAnswers);
      console.log("ECCOMI", this.surveyAnswers.find(answer => answer.email === email));

      if (this.surveyAnswers.find(answer => answer.email === email)) {

        this.errorValue = "This user have already answered";

      } else {

        if(this.invitationPool.password === code){

          this.dialogRef.close({
            result: "abilitated",
            email: email,
            password: code,
          });

        }else{
          this.errorValue = "Wrong code";
        }

      }
    }
    else {
      this.errorValue = "This user is not abilitated";
    }

  }

  cancel(): void {
    this.closeDialog();
  }
}
