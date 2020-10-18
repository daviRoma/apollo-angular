import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { AppState } from 'src/app/state/app.state';
import * as fromQuestionGroup from 'src/app/features/question-groups/store/question-group.selectors';

import { EditQuestionGroupComponent } from '../dialogs/edit-question-group/edit-question-group.component';

import { QuestionGroup } from 'src/app/models/question-group.model';

@Component({
  selector: 'app-question-group-box',
  templateUrl: './question-group-box.component.html',
  styleUrls: ['./question-group-box.component.scss'],
})
export class QuestionGroupBoxComponent implements OnInit {

  @Input() questionGroups: QuestionGroup[];
  @Input() surveyId: number;
  @Input() readonly: boolean;

  constructor(
    public questionGroupDialog: MatDialog,
    private translate: TranslateService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
  }

  openAddQuestionGroupModal(): void {
    const dialogRef = this.questionGroupDialog.open(EditQuestionGroupComponent, {
      width: '35%',
      position: { top: '6%' },
      data: {
        surveyId: this.surveyId,
        dialogConfig: {
          title: this.translate.instant('group.create'),
          operation: 'new',
        },
      },
    });

    dialogRef.afterClosed().subscribe(
      response => {
        if (response.result === 'close_after_submit') {
          this.store
            .pipe(select(fromQuestionGroup.selectQuestionGroupError))
            .subscribe((error: any) => {
              if (error) console.error('Create Question Group');
            });
        }
      });
  }
}
