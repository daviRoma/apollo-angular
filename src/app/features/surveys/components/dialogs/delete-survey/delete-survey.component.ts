import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppState } from 'src/app/state/app.state';

import * as fromSurvey from 'src/app/features/surveys/store/selectors/survey.selectors';

import { SurveyDeleteAction } from '../../../store/actions/survey.actions';

import { Survey } from 'src/app/models/survey.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-delete-survey',
  templateUrl: './delete-survey.component.html',
  styleUrls: ['./delete-survey.component.scss'],
})
export class DeleteSurveyComponent implements OnInit, OnDestroy {
  public dialogConfig: any;
  public survey: Survey;

  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    public dialogRef: MatDialogRef<DeleteSurveyComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data.item) {
      this.survey = this.data.item;
    }
    this.dialogConfig = this.data.dialogConfig;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  closeDialog(): void {
    this.dialogRef.close('close_cancel');
  }

  /**
   * Manage confirm click on delete window.
   */
  confirm(): void {
    this.store.dispatch(new SurveyDeleteAction(this.survey.id));
    this.store
      .select(fromSurvey.selectSurveyLoading)
      .pipe(takeUntil(this.destroy))
      .subscribe((loading: boolean) => {
        if (!loading) {
          this.dialogRef.close({result: 'close_after_delete' });
        }
      });
  }

  cancel(): void {
    this.closeDialog();
  }
}
