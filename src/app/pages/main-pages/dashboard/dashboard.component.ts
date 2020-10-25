import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { AppState } from '../../../state/app.state';

import { EditSurveyComponent } from 'src/app/features/surveys/components/dialogs/edit-survey/edit-survey.component';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  constructor(
    public newSurveyDialog: MatDialog,
    private translate: TranslateService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  public openNewSurveyModal(): void {
    const dialogRef = this.newSurveyDialog.open(EditSurveyComponent, {
      width: '45%',
      position: { top: '3%' },
      data: {
        dialogConfig: {
          title: this.translate.instant('survey.newSurvey'),
          operation: 'new',
        },
      },
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((response) => {
        if (response.result === 'close_after_new') {
        }
      })
    );
  }
}
