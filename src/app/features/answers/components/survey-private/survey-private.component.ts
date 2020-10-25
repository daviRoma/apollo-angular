import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import * as fromSurveyAnswer from 'src/app/features/answers/store/selectors/survey-answer.selectors';
import {
  SurveyAnswer,
  SurveyAnswerRequest,
} from 'src/app/models/survey-answer.model';
import { Survey } from 'src/app/models/survey.model';
import { AccesSecretSurveyDialogConf } from 'src/app/shared/config/dialog.conf';
import { AppState } from 'src/app/state/app.state';
import { SurveyAnswerLoadAction } from '../../store/actions/survey-answer.actions';
import { SecretSurveyLoginComponent } from '../dialogs/secret-survey-login/secret-survey-login.component';

@Component({
  selector: 'app-survey-private',
  templateUrl: './survey-private.component.html',
  styleUrls: ['./survey-private.component.scss'],
})
export class SurveyPrivateComponent implements OnInit, OnDestroy {
  @Input() survey: Survey;
  @Output() unlock = new EventEmitter();

  private ALREADY_ANSWERED = 'already_answered';
  private USER_ABILITATED = 'user_abilitated';
  private USER_NOT_ABILITATED = 'user_not_abilitated';
  private WRONG_CODE = 'wrong_code';

  public surveyAnswers: SurveyAnswer[] = [];

  private unlockSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    public accessSecretSurveyDialog: MatDialog,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    if (this.unlockSubscription) {
      this.unlockSubscription.unsubscribe();
    }
  }

  private loadData(): void {
    this.store.dispatch(
      new SurveyAnswerLoadAction({
        surveyId: this.survey.id,
        params: { order: 'email', order_dir: 'asc' },
      } as SurveyAnswerRequest)
    );

    this.store
      .pipe(
        select(fromSurveyAnswer.selectEntityBySurvey, { id: this.survey.id })
      )
      .subscribe((response: SurveyAnswer[]) => {
        if (response) {
          this.surveyAnswers = [...response];
        }
      });
  }

  openAccessSecretDialog(): void {
    const accessDialogConfig = { ...AccesSecretSurveyDialogConf };
    accessDialogConfig.data.dialogConfig.title = this.translate.instant(
      'survey.enterSecret'
    );
    accessDialogConfig.data.invitationPool = { ...this.survey.invitationPool };
    accessDialogConfig.data.surveyAnswers = this.surveyAnswers;

    let dialogRef = this.accessSecretSurveyDialog.open(
      SecretSurveyLoginComponent,
      accessDialogConfig
    );

    this.unlockSubscription = dialogRef.afterClosed().subscribe((res) => {
      // received data from confirm-component

      if (res.result === 'abilitated') {
        let userUnlock = {
          unlock: true,
          email: res.email,
          password: res.password,
        };

        this.unlock.emit(userUnlock);
      }
    });
  }
}
