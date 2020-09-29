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

  public dialogProperties: any = {
      minWidth: '20%',
      width: '40%',
      position: { top: '8%' },
      data: {
        survey: null,
        dialogConfig: { title: '' },
      },
    };

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private router: Router,
  ) {
    this.editDialogRef = { ...SurveyDialogConf };
    this.deleteDialogRef = { ...DeleteDialogConf };
  }

  ngOnInit(): void {
    this.editDialogRef.data.survey = { ...this.survey };
    this.editDialogRef.data.dialogConfig.title = 'Edit Survey';
    this.deleteDialogRef.data.item = { ...this.survey };
    this.deleteDialogRef.data.dialogConfig.title = 'Delete Survey';
    this.deleteDialogRef.data.dialogConfig.content = 'Are you sure to delete the survey?';
  }

  public openInvitationPoolModal(): void {
    const invitationPoolDialogRef = this.dialog.open(InvitationPoolComponent, {
      width: '45%',
      position: { top: '5%' },
      data: {
        dialogConfig: {
          title: 'Set Invitation Pool'
        },
      },
    });

    invitationPoolDialogRef.afterClosed().subscribe((response) => {
      if (response.result.message === 'close_after_close') {}
    });
  }

  public openEditSurveyModal(): void {
    const updateDialogRef = this.dialog.open(EditSurveyComponent, this.editDialogRef);

    updateDialogRef.afterClosed().subscribe((response) => {
      if (response.result.message === 'close_after_update') {
      }
    });
  }

  public openPublishModal(): void {
    const publishDialogRef = this.dialog.open(PublishSurveyComponent, this.dialogProperties);

    publishDialogRef.afterClosed().subscribe((response) => {
      if (response === 'close_send_invitation') {
        this.dialogProperties.data.dialogConfig.title = 'Send invitations and publish';
        this.dialog.open(InvitationConfirmComponent, this.dialogProperties);
      }
    });
  }

  public openDeleteDialog(): void {

    const dialogRef = this.dialog.open(DeleteSurveyComponent, this.deleteDialogRef);

    dialogRef.afterClosed().subscribe(
      response => {
        if (response.result === 'close_after_delete') {
          this.router.navigate(['dashboard/surveys/list']);
        }
      });
  }

  public openInvitationPoolDialog(): void {}
}
