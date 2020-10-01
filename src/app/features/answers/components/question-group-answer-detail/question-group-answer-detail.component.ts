import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DeleteQuestionGroupComponent } from 'src/app/features/question-groups/components/dialogs/delete-question-group/delete-question-group.component';
import { EditQuestionGroupComponent } from 'src/app/features/question-groups/components/dialogs/edit-question-group/edit-question-group.component';
import { QuestionGroupLoadOneAction } from 'src/app/features/question-groups/store/question-group.actions';
import { ChoiceQuestionDialogComponent } from 'src/app/features/questions/components/dialogs/choice-question-dialog/choice-question-dialog.component';
import { InputQuestionDialogComponent } from 'src/app/features/questions/components/dialogs/input-question-dialog/input-question-dialog.component';
import { MatrixQuestionDialogComponent } from 'src/app/features/questions/components/dialogs/matrix-question-dialog/matrix-question-dialog.component';
import { QuestionGroup, QuestionGroupRequest } from 'src/app/models/question-group.model';
import { QuestionDialogConf, QuestionGroupDialogConf, DeleteDialogConf } from 'src/app/shared/config/dialog.conf';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-question-group-answer-detail',
  templateUrl: './question-group-answer-detail.component.html',
  styleUrls: ['./question-group-answer-detail.component.scss']
})
export class QuestionGroupAnswerDetailComponent implements OnInit {

  @Input() questionGroup: QuestionGroup;

  @Output() choiceQuestionChange = new EventEmitter();

  public isLoading: boolean;

  constructor(
    private store: Store<AppState>
  ) {

  }

  ngOnInit(): void {

  }

  test(event): void{
    console.log(event);
  }


}
