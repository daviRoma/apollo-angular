import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DeleteQuestionGroupComponent } from 'src/app/features/question-groups/components/dialogs/delete-question-group/delete-question-group.component';
import { EditQuestionGroupComponent } from 'src/app/features/question-groups/components/dialogs/edit-question-group/edit-question-group.component';
import { QuestionGroupLoadOneAction } from 'src/app/features/question-groups/store/question-group.actions';
import { ChoiceQuestionDialogComponent } from 'src/app/features/questions/components/dialogs/choice-question-dialog/choice-question-dialog.component';
import { InputQuestionDialogComponent } from 'src/app/features/questions/components/dialogs/input-question-dialog/input-question-dialog.component';
import { MatrixQuestionDialogComponent } from 'src/app/features/questions/components/dialogs/matrix-question-dialog/matrix-question-dialog.component';
import { Answer, AnswersWrapper } from 'src/app/models/answer.model';
import {
  QuestionGroup,
  QuestionGroupRequest,
} from 'src/app/models/question-group.model';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-question-group-answer-detail',
  templateUrl: './question-group-answer-detail.component.html',
  styleUrls: ['./question-group-answer-detail.component.scss'],
})
export class QuestionGroupAnswerDetailComponent implements OnInit {
  @Input() questionGroup: QuestionGroup;

  @Output() answerChange = new EventEmitter();

  private answerGroup: AnswersWrapper;

  public isLoading: boolean;

  constructor(private store: Store<AppState>) {
    this.answerGroup = new AnswersWrapper();
    this.answerGroup.answers = [];
  }

  ngOnInit(): void {
    console.log(this.questionGroup);
  }

  updateWrapper(event): void {
    let result = this.answerGroup.answers.find(
      (item) =>
        item.questionId == event.questionId &&
        item.questionType == event.questionType
    );

    if (result) {
      result = event;
    } else {
      this.answerGroup.answers.push(event);
    }
    this.answerChange.emit(this.answerGroup);
  }
}
