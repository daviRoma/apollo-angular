import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import $ from 'node_modules/jquery';

import { AppState } from 'src/app/state/app.state';

import { selectSurveyState } from 'src/app/features/surveys/store/selectors/survey.selectors';
import {
  SurveyNewAction,
  SurveyUpdateAction,
} from 'src/app/features/surveys/store/actions/survey.actions';

import { Survey } from 'src/app/models/survey.model';

@Component({
  selector: 'app-publish-survey',
  templateUrl: './publish-survey.component.html',
  styleUrls: ['./publish-survey.component.scss'],
})
export class PublishSurveyComponent implements OnInit {
  public dialogConfig: any;
  public survey: Survey;

  public result: any;
  public isLoading: boolean;
  private currentState: Observable<any>;

  constructor(
    public dialogRef: MatDialogRef<PublishSurveyComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.currentState = this.store.select(selectSurveyState);
    this.dialogConfig = this.data.dialogConfig;

    // Edit case
    if (this.data.survey) {
      this.survey = { ...this.data.survey };
    }
    this.result = {};
    this.isLoading = false;
  }

  ngOnInit(): void {}

  copyToClipboard(event: any): void {
    event.preventDefault();
    let copyText = $('#urlId');
    copyText.select();
    document.execCommand('copy');
  }

  handleSubmit(): void {
    if (this.survey.secret && !this.survey.active) {
      this.dialogRef.close('close_send_invitation');
    } else {
      this.survey.active = !this.survey.active;
      this.store.dispatch(new SurveyUpdateAction(this.survey));
    }
  }


  closeDialog(): void {
    this.dialogRef.close('close_cancel');
  }

  cancel(): void {
    this.closeDialog();
  }

}
