import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import {
  SurveyLoadAction,
  SurveyUpdateAction,
  SurveyDeleteAction,
} from 'src/app/features/surveys/store/actions/survey.actions';

import { AppState } from 'src/app/state/app.state';
import * as fromSurvey from 'src/app/features/surveys/store/selectors/survey.selectors';

/* COMPONENTS */
import { EditSurveyComponent } from 'src/app/features/surveys/components/dialogs/edit-survey/edit-survey.component';
import { DeleteSurveyComponent } from '../dialogs/delete-survey/delete-survey.component';
import { InvitationPoolComponent } from 'src/app/features/surveys/components/dialogs/invitation-pool/invitation-pool.component';
import { PublishSurveyComponent } from 'src/app/features/surveys/components/dialogs/publish-survey/publish-survey.component';
import { InvitationConfirmComponent } from 'src/app/features/surveys/components/dialogs/invitation-confirm/invitation-confirm.component';

import { Survey } from 'src/app/models/survey.model';

import {
  SurveyDialogConf,
  DeleteDialogConf,
} from 'src/app/shared/config/dialog.conf';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.scss'],
})
export class SurveyDetailComponent implements OnInit, OnDestroy {
  @Input() survey: Survey;

  public deleteDialogRef: any;
  public editDialogRef: any;
  public publishDialogConf: any;

  private subscription: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private router: Router,
    private translate: TranslateService
  ) {
    this.editDialogRef = { ...SurveyDialogConf };
    this.deleteDialogRef = { ...DeleteDialogConf };
    this.publishDialogConf = { ...SurveyDialogConf };
  }

  ngOnInit(): void {}

  public openEditSurveyDialog(): void {
    this.editDialogRef.data.survey = { ...this.survey };
    this.editDialogRef.data.dialogConfig.title = this.translate.instant(
      'survey.edit'
    );
    this.editDialogRef.data.dialogConfig.operation = 'edit';
    const updateDialogRef = this.dialog.open(
      EditSurveyComponent,
      this.editDialogRef
    );

    this.subscription.add(
      updateDialogRef.afterClosed().subscribe((response) => {
        if (response.result === 'close_after_update') {
        }
      })
    );
  }

  public openDeleteDialog(): void {
    this.deleteDialogRef.data.item = { ...this.survey };
    this.deleteDialogRef.data.dialogConfig.title = this.translate.instant(
      'survey.delete'
    );
    this.deleteDialogRef.data.dialogConfig.content = this.translate.instant(
      'survey.deletemessage'
    );
    const dialogRef = this.dialog.open(
      DeleteSurveyComponent,
      this.deleteDialogRef
    );

    this.subscription.add(
      dialogRef.afterClosed().subscribe((response) => {
        if (response.result === 'close_after_delete') {
          this.router.navigate(['/dashboard']);
        }
      })
    );
  }

  public openPublishDialog(): void {
    this.publishDialogConf.data.survey = { ...this.survey };
    this.publishDialogConf.data.dialogConfig.title = this.translate.instant(
      'survey.publishtitle'
    );
    this.publishDialogConf.maxWidth = '30%';
    this.publishDialogConf.position.top = '8%';
    const publishDialogRef = this.dialog.open(
      PublishSurveyComponent,
      this.publishDialogConf
    );

    this.subscription.add(
      publishDialogRef.afterClosed().subscribe((response) => {
        if (response.result === 'close_send_invitation') {
          this.publishDialogConf.data.dialogConfig.title = this.translate.instant(
            'survey.invitationPoolTitle'
          );
          this.dialog.open(InvitationConfirmComponent, this.publishDialogConf);
        }
      })
    );
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  public openInvitationPoolDialog(): void {
    const invitationPoolDialogRef = this.dialog.open(InvitationPoolComponent, {
      minWidth: '30%',
      position: { top: '5%' },
      data: {
        survey: { ...this.survey },
        dialogConfig: {
          title: this.translate.instant('survey.setInvitationPool'),
        },
      },
    });

    invitationPoolDialogRef.afterClosed().subscribe((response) => {
      if (response.result === 'close_after_set_invitation') {
      }
    });
  }
}
