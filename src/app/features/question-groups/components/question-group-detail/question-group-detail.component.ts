import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';

import { EditQuestionGroupComponent } from 'src/app/features/question-groups/components/dialogs/edit-question-group/edit-question-group.component';
import { DeleteQuestionGroupComponent } from 'src/app/features/question-groups/components/dialogs/delete-question-group/delete-question-group.component';
import { InputQuestionDialogComponent } from 'src/app/features/questions/components/dialogs/input-question-dialog/input-question-dialog.component';
import { ChoiceQuestionDialogComponent } from 'src/app/features/questions/components/dialogs/choice-question-dialog/choice-question-dialog.component';
import { MatrixQuestionDialogComponent } from 'src/app/features/questions/components/dialogs/matrix-question-dialog/matrix-question-dialog.component';

import { QuestionGroup, QuestionGroupRequest } from 'src/app/models/question-group.model';
import { QuestionGroupLoadAction, QuestionGroupLoadOneAction } from '../../store/question-group.actions';

import { QuestionGroupDialogConf, QuestionDialogConf, DeleteDialogConf } from 'src/app/shared/dialog.conf';

@Component({
  selector: 'app-question-group-detail',
  templateUrl: './question-group-detail.component.html',
  styleUrls: ['./question-group-detail.component.scss'],
})
export class QuestionGroupDetailComponent implements OnInit {
  @Input() questionGroup: QuestionGroup;

  public isLoading: boolean;

  constructor(
    public questionGroupDialog: MatDialog,
    private store: Store<AppState>
  ) {

  }

  ngOnInit(): void {
    console.log('QuestionGroupDetail', this.questionGroup);
    QuestionDialogConf.data.questionGroupId = this.questionGroup.id;
    QuestionDialogConf.data.surveyId = this.questionGroup.survey;
    QuestionGroupDialogConf.data.questionGroup = { ...this.questionGroup };
  }

  openEditQuestionGroupModal(): void {
    const questionGroupDialogConfig = { ...QuestionGroupDialogConf };
    questionGroupDialogConfig.data.dialogConfig.title = 'Edit Question Group';
    questionGroupDialogConfig.data.dialogConfig.operation = 'edit';

    this.questionGroupDialog.open(EditQuestionGroupComponent, questionGroupDialogConfig);
  }

  openDeleteQuestionGroupDialog(): void {
    DeleteDialogConf.data.dialogConfig.title = 'Delete Question Group';
    DeleteDialogConf.data.dialogConfig.content = 'Are you sure to delete the question group selected?';
    DeleteDialogConf.data.item = { ...this.questionGroup };

    this.questionGroupDialog.open(DeleteQuestionGroupComponent, DeleteDialogConf);
  }

  openChoiceQuestionDialog(choiceType: string): void {
    const dialogRef = this.questionGroupDialog.open(
      ChoiceQuestionDialogComponent,
      this.buildQuestionDialogConfig('New Choice Question', 'new', choiceType)
    );

    dialogRef.afterClosed().subscribe(
      response => {
        if (response.result === 'close_after_submit') {
          this.store.dispatch(new QuestionGroupLoadOneAction(
            {
              questionGroup: this.questionGroup,
              surveyId: this.questionGroup.survey
            } as QuestionGroupRequest
          ));
        }
      });
  }

  openInputQuestionDialog(): void {
    const dialogRef = this.questionGroupDialog.open(
      InputQuestionDialogComponent,
      this.buildQuestionDialogConfig('New Input Question', 'new', null));

    dialogRef.afterClosed().subscribe(
      response => {
        if (response.result === 'close_after_submit') {
          this.store.dispatch(new QuestionGroupLoadOneAction(
            {
              questionGroup: this.questionGroup,
              surveyId: this.questionGroup.survey
            } as QuestionGroupRequest
          ));
        }
      });
  }

  openMatrixQuestionDialog(choiceType: string): void {
    const dialogRef = this.questionGroupDialog.open(
      MatrixQuestionDialogComponent,
      this.buildQuestionDialogConfig('New Matrix Question', 'new', choiceType)
    );

    dialogRef.afterClosed().subscribe(
      response => {
        if (response.result === 'close_after_submit') {
          this.store.dispatch(new QuestionGroupLoadOneAction(
            {
              questionGroup: this.questionGroup,
              surveyId: this.questionGroup.survey
            } as QuestionGroupRequest
          ));
        }
      });
  }

  private buildQuestionDialogConfig(title: string, operation: string, type: string): any {
    const questionDialogConfig = { ...QuestionDialogConf };
    questionDialogConfig.data.dialogConfig.title = title;
    questionDialogConfig.data.dialogConfig.operation = operation;
    questionDialogConfig.data.type = type;
    return questionDialogConfig;
  }

}
