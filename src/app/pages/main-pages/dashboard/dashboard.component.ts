import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { AppState } from '../../../state/app.state';

import { EditSurveyComponent } from 'src/app/features/surveys/components/dialogs/edit-survey/edit-survey.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(
    public newSurveyDialog: MatDialog, 
    private translate: TranslateService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void { }

  public openNewSurveyModal(): void {
    const dialogRef = this.newSurveyDialog.open(EditSurveyComponent, {
      width: '45%',
      position: { top: '3%' },
      data: {
        dialogConfig: {
          title: this.translate.instant('survey.newSurvey'),
          operation: 'new'
        }
      }
    });

    dialogRef.afterClosed().subscribe(
      (response) => {
        if (response.result === 'close_after_new') {
        }
      });
  }
}
