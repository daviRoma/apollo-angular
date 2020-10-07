import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { QuestionGroupLoadAction } from 'src/app/features/question-groups/store/question-group.actions';
import { SurveyLoadAction } from 'src/app/features/surveys/store/actions/survey.actions';
import { Survey, SurveyRequest } from 'src/app/models/survey.model';
import { AppState } from 'src/app/state/app.state';
import { SurveyAnswerLoadAction } from '../../store/actions/survey-answer.actions';
import * as fromSurveyAnswer from 'src/app/features/answers/store/selectors/survey-answer.selectors';
import { Answer, AnswerRequest, AnswersWrapper } from 'src/app/models/answer.model';
import { AnswerLoadAction } from '../../store/actions/answer.actions';
import { QuestionAnswer, SurveyAnswer, SurveyAnswerRequest } from 'src/app/models/survey-answer.model';
import { EmailValidator } from '@angular/forms';
import { AccesSecretSurveyDialogConf } from 'src/app/shared/config/dialog.conf';
import { MatDialog } from '@angular/material/dialog';
import { SecretSurveyLoginComponent } from '../dialogs/secret-survey-login/secret-survey-login.component';


@Component({
  selector: 'app-survey-private',
  templateUrl: './survey-private.component.html',
  styleUrls: ['./survey-private.component.scss']
})
export class SurveyPrivateComponent implements OnInit {

  @Input() survey: Survey
  @Output() unlock = new EventEmitter();

  private ALREADY_ANSWERED = "already_answered";
  private USER_ABILITATED = "user_abilitated";
  private USER_NOT_ABILITATED = "user_not_abilitated";
  private WRONG_CODE = "wrong_code";

  public surveyAnswers: SurveyAnswer[] = [];


  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    public accessSecretSurveyDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {

    this.store.dispatch(new SurveyAnswerLoadAction({ surveyId: this.survey.id, params: { order: "email", order_dir: "asc" } } as SurveyAnswerRequest));

    this.store.pipe(
      select(fromSurveyAnswer.selectEntityBySurvey, { id: this.survey.id }))
      .subscribe((response: SurveyAnswer[]) => {
        console.log(response);
        if (response) {
          this.surveyAnswers = [...response];
        }
      });
  }

  openAccessSecretDialog(): void {
    const accessDialogConfig = { ...AccesSecretSurveyDialogConf };
    accessDialogConfig.data.dialogConfig.title = 'Enter the Secret Survey';
    accessDialogConfig.data.dialogConfig.content = 'Are you sure to delete the question group selected?';
    accessDialogConfig.data.invitationPool = { ...this.survey.invitationPool };
    console.log("PRIMA", this.surveyAnswers);
    accessDialogConfig.data.surveyAnswers = this.surveyAnswers;

    let dialogRef = this.accessSecretSurveyDialog.open(SecretSurveyLoginComponent, accessDialogConfig);

    dialogRef.afterClosed().subscribe(res => {
      // received data from confirm-component

     if(res.result === "abilitated"){

      console.log("abilitated");

        let userUnlock= {
          unlock: true,
          email: res.email,
          password: res.password
        };

        this.unlock.emit(userUnlock);

     }

    });
  }

}
