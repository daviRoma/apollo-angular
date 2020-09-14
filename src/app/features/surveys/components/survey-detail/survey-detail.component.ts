import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Store, select } from '@ngrx/store';
import { SurveyLoadAction, SurveyUpdateAction, SurveyDeleteAction } from 'src/app/features/surveys/store/actions/survey.actions';

/* COMPONENTS */
import { EditSurveyComponent } from 'src/app/features/surveys/components/dialogs/edit-survey/edit-survey.component';
import { DeleteSurveyComponent } from '../dialogs/delete-survey/delete-survey.component';
import { InvitationPoolComponent } from 'src/app/features/surveys/components/dialogs/invitation-pool/invitation-pool.component';
import { PublishSurveyComponent } from 'src/app/features/surveys/components/dialogs/publish-survey/publish-survey.component';
import { InvitationConfirmComponent } from 'src/app/features/surveys/components/dialogs/invitation-confirm/invitation-confirm.component';

import { AppState } from 'src/app/state/app.state';
import { Survey } from 'src/app/models/survey.model';
import * as fromSurvey from 'src/app/features/surveys/store/selectors/survey.selectors';

@Component({
  selector: 'app-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.scss']
})
export class SurveyDetailComponent implements OnInit {

  @Input() survey: Survey;

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
    private store: Store<AppState>) { }

  ngOnInit(): void {
    console.log('survey', this.survey);
    // this.store
    // .pipe(select(fromSurvey.selectEntity, { id: 1 }))
    // .subscribe((survey: Survey) => {
    //   console.log('Survey', survey);
    // });

    // this.store.pipe(
    //   select(selectEntitiesByID, { ids: arrayOfIDs })
    // );
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

  public openUpdateSurveyModal(): void {
    const updateDialogRef = this.dialog.open(EditSurveyComponent, {
      minWidth: '20%',
      width: '45%',
      position: { top: '3%' },
      data: {
        survey: { ...this.survey }, // clone object
        dialogConfig: {
          title: 'Edit Survey'
        }
      }
    });

    updateDialogRef.afterClosed().subscribe((response) => {
      if (response.result.message === 'close_after_update') {
      }
    });
  }

  public openPublishModal(): void {
    this.dialogProperties.data.survey = { ...this.survey };
    this.dialogProperties.data.dialogConfig.title = 'Publish Survey';

    const publishDialogRef = this.dialog.open(PublishSurveyComponent, this.dialogProperties);

    publishDialogRef.afterClosed().subscribe((response) => {
      if (response === 'close_send_invitation') {
        this.dialogProperties.data.dialogConfig.title = 'Send invitations and publish';
        this.dialog.open(InvitationConfirmComponent, this.dialogProperties);
      }
    });
  }

  public openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteSurveyComponent, {
      minWidth: '20%',
      position: { top: '14%' },
      data: {
        survey: {...this.survey}, // clone object
        dialogConfig: {
          title: 'Delete Survey',
          content: 'Are you sure to delete the survey?'
        }
      }
    });

    dialogRef.afterClosed().subscribe(
      response => {
        if (response.result === 'close_after_delete') {
          // Delete action
          this.store.dispatch(new SurveyDeleteAction(this.survey.id));
        }
      });
  }

  public openInvitationPoolDialog(): void {}
}
