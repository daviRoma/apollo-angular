import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { SurveyLoadAction, SurveyUpdateAction, SurveyDeleteAction } from 'src/app/features/surveys/store/actions/survey.actions';

import { AppState } from 'src/app/state/app.state';
import * as fromSurvey from 'src/app/features/surveys/store/selectors/survey.selectors';

/* COMPONENTS */
import { EditSurveyComponent } from 'src/app/features/surveys/components/dialogs/edit-survey/edit-survey.component';
import { DeleteSurveyComponent } from '../dialogs/delete-survey/delete-survey.component';
import { InvitationPoolComponent } from 'src/app/features/surveys/components/dialogs/invitation-pool/invitation-pool.component';
import { PublishSurveyComponent } from 'src/app/features/surveys/components/dialogs/publish-survey/publish-survey.component';
import { InvitationConfirmComponent } from 'src/app/features/surveys/components/dialogs/invitation-confirm/invitation-confirm.component';

import { Survey } from 'src/app/models/survey.model';

import { SurveyDialogConf, DeleteDialogConf } from 'src/app/shared/config/dialog.conf';

@Component({
  selector: 'app-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.scss']
})
export class SurveyDetailComponent implements OnInit {

  @Input() survey: Survey;

  public deleteDialogRef: any;
  public editDialogRef: any;
  public publishDialogConf: any;

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private router: Router,
  ) {
    this.editDialogRef = { ...SurveyDialogConf };
    this.deleteDialogRef = { ...DeleteDialogConf };
    this.publishDialogConf = { ...SurveyDialogConf };
  }

  ngOnInit(): void {
  }

  public openEditSurveyDialog(): void {
    this.editDialogRef.data.survey = { ...this.survey };
    this.editDialogRef.data.dialogConfig.title = 'Edit Survey';
    const updateDialogRef = this.dialog.open(EditSurveyComponent, this.editDialogRef);

    updateDialogRef.afterClosed().subscribe((response) => {
      if (response.result === 'close_after_update') {}
    });
  }

  public openDeleteDialog(): void {
    this.deleteDialogRef.data.item = { ...this.survey };
    this.deleteDialogRef.data.dialogConfig.title = 'Delete Survey';
    this.deleteDialogRef.data.dialogConfig.content = 'Are you sure to delete the survey?';
    const dialogRef = this.dialog.open(DeleteSurveyComponent, this.deleteDialogRef);

    dialogRef.afterClosed().subscribe(
      response => {
        if (response.result === 'close_after_delete') {
          this.router.navigate(['dashboard/surveys/list']);
        }
      });
  }

  public openPublishDialog(): void {
    this.publishDialogConf.data.dialogConfig.title = 'Publish Survey';
    this.publishDialogConf.minWidth = '40%';
    this.publishDialogConf.position.top = '8%';
    const publishDialogRef = this.dialog.open(PublishSurveyComponent, this.publishDialogConf);

    publishDialogRef.afterClosed().subscribe((response) => {
      if (response.result === 'close_send_invitation') {
        this.publishDialogConf.data.dialogConfig.title = 'Send invitations and publish';
        this.dialog.open(InvitationConfirmComponent, this.publishDialogConf);
      }
    });
  }

  public openInvitationPoolDialog(): void {
    const invitationPoolDialogRef = this.dialog.open(InvitationPoolComponent, {
      minWidth: '45%',
      position: { top: '5%' },
      data: {
        survey: {...this.survey },
        dialogConfig: {
          title: 'Set Invitation Pool'
        },
      },
    });

    invitationPoolDialogRef.afterClosed().subscribe((response) => {
      if (response.result === 'close_after_set_invitation') {
      }
    });
  }

}
