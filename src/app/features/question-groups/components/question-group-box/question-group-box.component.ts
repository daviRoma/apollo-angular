import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { AppState } from 'src/app/state/app.state';
import * as fromQuestionGroup from 'src/app/features/question-groups/store/question-group.selectors';

import { EditQuestionGroupComponent } from '../dialogs/edit-question-group/edit-question-group.component';

import { QuestionGroup } from 'src/app/models/question-group.model';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-question-group-box',
  templateUrl: './question-group-box.component.html',
  styleUrls: ['./question-group-box.component.scss'],
})
export class QuestionGroupBoxComponent implements OnInit, OnDestroy {
  @Input() questionGroups: QuestionGroup[];
  @Input() surveyId: number;
  @Input() readonly: boolean;

  private subscription: Subscription;
  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    public questionGroupDialog: MatDialog,
    private translate: TranslateService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {}

  openAddQuestionGroupModal(): void {
    const dialogRef = this.questionGroupDialog.open(
      EditQuestionGroupComponent,
      {
        width: '35%',
        position: { top: '6%' },
        data: {
          surveyId: this.surveyId,
          dialogConfig: {
            title: this.translate.instant('group.create'),
            operation: 'new',
          },
        },
      }
    );

    this.subscription = dialogRef.afterClosed().subscribe((response) => {
      if (response.result === 'close_after_submit') {
        this.store
          .select(fromQuestionGroup.selectQuestionGroupError)
          .pipe(takeUntil(this.destroy))
          .subscribe((error: any) => {
            if (error) console.error('Create Question Group');
          });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
