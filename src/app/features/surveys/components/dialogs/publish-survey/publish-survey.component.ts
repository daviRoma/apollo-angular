import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import $ from 'node_modules/jquery';

import { AppState } from 'src/app/state/app.state';
import * as fromSurvey from 'src/app/features/surveys/store/selectors/survey.selectors';

import {
  SurveyUpdateAction,
  SurveyPublishAction,
} from 'src/app/features/surveys/store/actions/survey.actions';

import { Survey } from 'src/app/models/survey.model';

import { Paths } from 'src/app/shared/config/path.conf';
import Utils from 'src/app/shared/utils';

@Component({
  selector: 'app-publish-survey',
  templateUrl: './publish-survey.component.html',
  styleUrls: ['./publish-survey.component.scss'],
})
export class PublishSurveyComponent implements OnInit {
  public dialogConfig: any;
  public survey: Survey;

  public publicLink: string;

  public isError: any;
  public isLoading: boolean;

  constructor(
    public dialogRef: MatDialogRef<PublishSurveyComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogConfig = this.data.dialogConfig;
    this.publicLink = Paths.surveyAnswer.publicLink;

    // Edit case
    if (this.data.survey) {
      this.survey = { ...this.data.survey };
      this.isLoading = false;
    }

  }

  ngOnInit(): void {
    this.store
      .select(fromSurvey.selectEntity, { id: this.survey.id })
      .subscribe((survey: Survey) => {
        if (survey) {
          this.survey = { ...survey };
          this.isLoading = false;
        }
      });
  }

  copyToClipboard(event: any): void {
    event.preventDefault();
    const copyText = $('#urlId');
    copyText.select();
    document.execCommand('copy');
  }

  handleSubmit(): void {
    if (!this.hasQuestions()) {
      this.isError = true;
      return;
    }
    if (this.survey.secret && !this.survey.active) {
      this.dialogRef.close({ result: 'close_send_invitation' });
    } else {
      if (this.survey.active) {
        const payload = Utils.deleteNullKey({ ...this.survey });
        this.store.dispatch(new SurveyUpdateAction({ ...payload, active: false }));
      } else {
        this.store.dispatch(new SurveyPublishAction({ id: this.survey.id, url: Paths.surveyAnswer.publicLink }));
      }
    }
  }

  hasQuestions(): boolean {
    if (this.survey.questionGroups && this.survey.questionGroups.length) {
      return !(this.survey.questionGroups.find( group => (group.questions == null)) !== undefined);
    }
    return false;
  }

  closeDialog(): void {
    this.dialogRef.close('close_cancel');
  }

  cancel(): void {
    this.closeDialog();
  }

}
