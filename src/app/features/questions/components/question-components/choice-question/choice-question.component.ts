import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ChoiceQuestion } from 'src/app/models/question.model';
import { ChoiceQuestionDialogComponent } from '../../dialogs/choice-question-dialog/choice-question-dialog.component';
import { QuestionGroup } from 'src/app/models/question-group.model';

@Component({
  selector: 'app-choice-question',
  templateUrl: './choice-question.component.html',
  styleUrls: ['./choice-question.component.scss'],
})
export class ChoiceQuestionComponent implements OnInit {
  @Input() question: ChoiceQuestion;

  constructor(public questionDialog: MatDialog) {}

  ngOnInit(): void {
    console.log(this.question);
  }

  editQuestion(): void {
    this.questionDialog.open(ChoiceQuestionDialogComponent, {
      minWidth: '35%',
      maxWidth: '42%',
      position: { top: '6%' },
      data: {
        question: { ...this.question },
        type: this.question.type,
        dialogConfig: {
          title: 'Edit Question',
          operation: 'edit',
        },
      },
    });
  }

  deleteQuestion(): void {}
}
