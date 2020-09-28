import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { InputQuestionDialogComponent } from '../../dialogs/input-question-dialog/input-question-dialog.component';
import { InputQuestion } from 'src/app/models/question.model';

@Component({
  selector: 'app-input-question',
  templateUrl: './input-question.component.html',
  styleUrls: ['./input-question.component.scss']
})
export class InputQuestionComponent implements OnInit {

  @Input() question: InputQuestion;

  constructor(public questionDialog: MatDialog) { }

  ngOnInit(): void {}

  editQuestion(): void {
    this.questionDialog.open(InputQuestionDialogComponent, {
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

  deleteQuestion(): void {

  }

}
