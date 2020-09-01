import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Store, select } from '@ngrx/store';
import { SurveyLoadAction, SurveyUpdateAction, SurveyDeleteAction } from 'src/app/features/surveys/store/actions/survey.actions';

/* COMPONENTS */
import { EditSurveyComponent } from 'src/app/features/surveys/components/modals/edit-survey/edit-survey.component';
import { DeleteSurveyComponent } from '../dialogs/delete-survey/delete-survey.component';

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

  constructor(
    public modal: MatDialog,
    public dialog: MatDialog,
    private store: Store<AppState>) { }

  ngOnInit(): void {
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
    // this.store.dispatch(new InvitationPoolUpdateAction(survey.id));
  }

  public openUpdateSurveyModal(): void {
    const updateDialogRef = this.modal.open(EditSurveyComponent, {
      minWidth: '20%',
      position: { top: '14%' },
      data: {
        survey: {...this.survey}, // clone object
      }
    });

    updateDialogRef.afterClosed().subscribe((response) => {
      if (response.result.message === 'close_after_update') {
        this.store.dispatch(new SurveyUpdateAction(response.result.survey));
      }
    });
  }

  public openPublishModal(): void {}

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
