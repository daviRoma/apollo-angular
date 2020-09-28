import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatrixQuestionDialogComponent } from '../../dialogs/matrix-question-dialog/matrix-question-dialog.component';
import { MatrixQuestion } from 'src/app/models/question.model';

@Component({
  selector: 'app-matrix-question',
  templateUrl: './matrix-question.component.html',
  styleUrls: ['./matrix-question.component.scss']
})
export class MatrixQuestionComponent implements OnInit {

  @Input() question: MatrixQuestion;

  constructor(public questionDialog: MatDialog) { }

  ngOnInit(): void {
  }

  editQuestion(): void {
    this.questionDialog.open(MatrixQuestionDialogComponent, {
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

  deleteQuestion(): void {}

}
