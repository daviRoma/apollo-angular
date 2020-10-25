import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { QuestionGroupLoadOneAction } from 'src/app/features/question-groups/store/question-group.actions';

import { ChoiceQuestionDialogComponent } from '../../dialogs/choice-question-dialog/choice-question-dialog.component';
import { DeleteQuestionDialogComponent } from 'src/app/features/questions/components/dialogs/delete-question-dialog/delete-question-dialog.component';

import { ChoiceQuestion } from 'src/app/models/question.model';
import {
  QuestionGroup,
  QuestionGroupRequest,
} from 'src/app/models/question-group.model';
import {
  DeleteDialogConf,
  QuestionDialogConf,
} from 'src/app/shared/config/dialog.conf';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-choice-question',
  templateUrl: './choice-question.component.html',
  styleUrls: ['./choice-question.component.scss'],
})
export class ChoiceQuestionComponent implements OnInit, OnDestroy {
  @Input() question: ChoiceQuestion;
  @Input() readonly: boolean;

  public editDialogConf: any;
  public deleteDilogConf: any;

  private subscription: Subscription;

  constructor(
    public questionDialog: MatDialog,
    private translate: TranslateService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.editDialogConf = { ...QuestionDialogConf };
    this.deleteDilogConf = { ...DeleteDialogConf };
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  editQuestion(): void {
    this.editDialogConf.data.question = { ...this.question };
    this.editDialogConf.data.type = this.question.type;
    this.editDialogConf.data.dialogConfig.title = this.translate.instant(
      'question.edit'
    );
    this.editDialogConf.data.dialogConfig.operation = 'edit';

    const dialogRef = this.questionDialog.open(
      ChoiceQuestionDialogComponent,
      this.editDialogConf
    );
    this.reload(dialogRef);
  }

  deleteQuestion(): void {
    this.deleteDilogConf.data.item = { ...this.question };
    this.deleteDilogConf.data.dialogConfig.title = this.translate.instant(
      'question.delete'
    );
    this.deleteDilogConf.data.dialogConfig.content = this.translate.instant(
      'question.deletemessage'
    );

    const dialogRef = this.questionDialog.open(
      DeleteQuestionDialogComponent,
      this.deleteDilogConf
    );
    this.reload(dialogRef);
  }

  private reload(dialogRef: any): void {
    this.subscription = dialogRef.afterClosed().subscribe((response) => {
      if (
        response.result === 'close_after_delete' ||
        response.result === 'close_after_submit'
      ) {
        this.store.dispatch(
          new QuestionGroupLoadOneAction({
            questionGroup: { id: this.question.questionGroup } as QuestionGroup,
            surveyId: this.question.survey,
          } as QuestionGroupRequest)
        );
      }
    });
  }
}
