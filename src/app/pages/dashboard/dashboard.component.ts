import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';

import { EditSurveyComponent } from 'src/app/features/surveys/components/dialogs/edit-survey/edit-survey.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(
    public newSurveyDialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {}

  public openNewSurveyModal(): void {
    const dialogRef = this.newSurveyDialog.open(EditSurveyComponent, {
      width: '45%',
      position: { top: '3%' },
      data: {
        dialogConfig: {
          title: 'New Survey',
          operation: 'new'
        }
      }
    });

    dialogRef.afterClosed().subscribe(
      (response) => {
        if (response.result === 'close_after_new') {
          // New action
          // this.store.dispatch(new SurveyNewAction(response.data));
        }
    });
  }
}
