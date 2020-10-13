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

import { QuestionGroupDialogConf, QuestionDialogConf, DeleteDialogConf } from 'src/app/shared/config/dialog.conf';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-question-group-detail',
  templateUrl: './question-group-detail.component.html',
  styleUrls: ['./question-group-detail.component.scss'],
})
export class QuestionGroupDetailComponent implements OnInit {
  @Input() questionGroup: QuestionGroup;
  @Input() readonly: boolean;

  public questionGroupDialogConfig: any;

  public isLoading: boolean;

  constructor(
    public questionGroupDialog: MatDialog,
    private translate: TranslateService,
    private store: Store<AppState>
  ) {

  }

  ngOnInit(): void {
    this.questionGroupDialogConfig = { ...QuestionGroupDialogConf };
  }

  openEditQuestionGroupModal(): void {
    this.questionGroupDialogConfig.data.questionGroup = { ...this.questionGroup };
    this.questionGroupDialogConfig.data.dialogConfig.title = this.translate.instant('group.edit');
    this.questionGroupDialogConfig.data.dialogConfig.operation = 'edit';

    this.questionGroupDialog.open(EditQuestionGroupComponent, this.questionGroupDialogConfig);
  }

  openDeleteQuestionGroupDialog(): void {
    const deleteDialogConfig = { ...DeleteDialogConf };
    deleteDialogConfig.data.dialogConfig.title = this.translate.instant('group.delete');
    deleteDialogConfig.data.dialogConfig.content = this.translate.instant('group.deletemessage');
    deleteDialogConfig.data.item = { ...this.questionGroup };

    this.questionGroupDialog.open(DeleteQuestionGroupComponent, deleteDialogConfig);
  }

  openChoiceQuestionDialog(choiceType: string): void {
    const dialogRef = this.questionGroupDialog.open(
      ChoiceQuestionDialogComponent,
      this.buildQuestionDialogConfig(
        `${this.translate.instant('common.new')} ${this.translate.instant('question.singlechoicequestion')}`,
         'new', choiceType
        )
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
      this.buildQuestionDialogConfig(
        `${this.translate.instant('common.new')} ${this.translate.instant('question.inputquestion')}`,
        'new', null
        )
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

  openMatrixQuestionDialog(choiceType: string): void {
    const dialogRef = this.questionGroupDialog.open(
      MatrixQuestionDialogComponent,
      this.buildQuestionDialogConfig(
        `${this.translate.instant('common.new')} ${this.translate.instant('question.matrixquestion')}`,
         'new', choiceType)
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
    questionDialogConfig.data.surveyId = this.questionGroup.survey;
    questionDialogConfig.data.questionGroupId = this.questionGroup.id;
    questionDialogConfig.data.question = null;
    questionDialogConfig.data.dialogConfig.title = title;
    questionDialogConfig.data.dialogConfig.operation = operation;
    questionDialogConfig.data.type = type;
    return questionDialogConfig;
  }

}
