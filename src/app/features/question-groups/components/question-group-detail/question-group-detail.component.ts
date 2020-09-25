import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { EditQuestionGroupComponent } from 'src/app/features/question-groups/components/dialogs/edit-question-group/edit-question-group.component';
import { DeleteQuestionGroupComponent } from 'src/app/features/question-groups/components/dialogs/delete-question-group/delete-question-group.component';

import { InputQuestionDialogComponent } from 'src/app/features/questions/components/dialogs/input-question-dialog/input-question-dialog.component';
import { ChoiceQuestionComponent } from 'src/app/features/questions/components/question-components/choice-question/choice-question.component';
import { MatrixQuestionComponent } from 'src/app/features/questions/components/question-components/matrix-question/matrix-question.component';

import { AppState } from 'src/app/state/app.state';
import { QuestionGroup } from 'src/app/models/question-group.model';
import { QuestionLoadAction } from 'src/app/features/questions/store/actions/question.actions';
import { QuestionRequest } from 'src/app/models/question.model';

@Component({
  selector: 'app-question-group-detail',
  templateUrl: './question-group-detail.component.html',
  styleUrls: ['./question-group-detail.component.scss'],
})
export class QuestionGroupDetailComponent implements OnInit {
  @Input() questionGroup: QuestionGroup;

  constructor(
    public questionGroupDialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
  }

  openEditQuestionGroupModal(): void {
    this.questionGroupDialog.open(EditQuestionGroupComponent, {
      width: '35%',
      position: { top: '6%' },
      data: {
        questionGroup: { ...this.questionGroup },
        dialogConfig: {
          title: 'Edit Question Group',
          operation: 'edit',
        },
      },
    });
  }

  openDeleteQuestionGroupDialog(): void {
    this.questionGroupDialog.open(DeleteQuestionGroupComponent, {
      minWidth: '20%',
      position: { top: '14%' },
      data: {
        questionGroup: { ...this.questionGroup }, // clone object
        dialogConfig: {
          title: 'Delete Question Group',
          content: 'Are you sure to delete the question group selected?',
        },
      },
    });
  }

  openChoiceQuestionDialog(choiceType: string): void {
    this.questionGroupDialog.open(ChoiceQuestionComponent, {
      width: '30%',
      position: { top: '12%' },
      data: {
        questionGroup: { ...this.questionGroup },
        type: choiceType,
        dialogConfig: {
          title: 'New Choice Question',
          operation: 'new',
        },
      },
    });
  }

  openInputQuestionDialog(): void {
    const dialogRef = this.questionGroupDialog.open(
      InputQuestionDialogComponent,
      {
        width: '30%',
        position: { top: '12%' },
        data: {
          questionGroup: { ...this.questionGroup },
          dialogConfig: {
            title: 'New Input Question',
            operation: 'new',
          },
        },
      }
    );

    dialogRef.afterClosed().subscribe((response) => {
      if (response.result === 'close_after_new') {
        // Reload questions
      }
    });
  }

  openMatrixQuestionDialog(choiceType: string): void {
    this.questionGroupDialog.open(MatrixQuestionComponent, {
      width: '30%',
      position: { top: '12%' },
      data: {
        questionGroup: { ...this.questionGroup },
        type: choiceType,
        dialogConfig: {
          title: 'New Matrix Question',
          operation: 'new',
        },
      },
    });
  }

  private loadData(): void {
    // let request = new QuestionRequest();
    // // request.surveyId = this.questionGroup.survey
    // this.store.dispatch( new QuestionLoadAction() );

    // this.store
    //   .pipe(select(fromSurvey.selectEntity, { id: surveyId }))
    //   .subscribe((survey: Survey) => {
    //     if (survey) { this.survey = survey; }
    //     else {
    //       this.store.dispatch( new SurveyLoadAction({
    //         user_id: 1, //this.user.id,
    //       } as SurveyRequest));
    //     }
    //   });

    // this.store
    //   .pipe(select(fromQuestionGroup.selectEntitiesBySurvey, { id: surveyId }))
    //   .subscribe((response: QuestionGroup[]) => {
    //     this.survey = { ...this.survey, questionGroups: response };
    //     this.questionGroups = response;
    //   });
  }

}
