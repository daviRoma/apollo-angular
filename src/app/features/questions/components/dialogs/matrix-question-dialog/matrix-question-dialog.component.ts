import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as fromQuestionGroup from 'src/app/features/question-groups/store/question-group.selectors';
import {
  MatrixQuestionNewAction,
  MatrixQuestionUpdateAction,
} from '../../../store/actions/matrix-question.actions';

import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

import {
  ChoiceQuestion,
  MatrixQuestion,
  QuestionRequest,
} from 'src/app/models/question.model';
import { QuestionGroup } from 'src/app/models/question-group.model';
import { Icon } from 'src/app/models/icon.model';

import Utils from 'src/app/shared/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-matrix-question-dialog',
  templateUrl: './matrix-question-dialog.component.html',
  styleUrls: ['./matrix-question-dialog.component.scss'],
})
export class MatrixQuestionDialogComponent implements OnInit {
  public dialogConfig: any;

  public matrixQuestion: MatrixQuestion;
  public questionForm: FormGroup;
  public choiceQuestion: ChoiceQuestion;

  public iconFile: Icon;

  public isMinOptionsLengthError: boolean;
  public isMinElementsLengthError: boolean;

  constructor(
    public dialogRef: MatDialogRef<MatrixQuestionDialogComponent>,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogConfig = this.data.dialogConfig;
    this.iconFile = new Icon();

    this.questionForm = this.formBuilder.group({
      title: ['', Validators.required],
      mandatory: [false],
      type: ['', Validators.required],
    });

    // Edit case
    if (this.data.question) {
      this.matrixQuestion = { ...this.data.question } as MatrixQuestion;
    } else {
      this.matrixQuestion = {
        options: [],
        elements: [],
        type: this.data.type,
        questionGroup: this.data.questionGroupId,
        mandatory: false,
      } as MatrixQuestion;
    }

    this.questionForm.patchValue(this.matrixQuestion);
  }

  ngOnInit(): void {
    // Calculate question position
    if (
      this.matrixQuestion.position == null ||
      this.matrixQuestion.position === undefined
    ) {
      this.store
        .pipe(
          select(fromQuestionGroup.selectEntity, {
            id: this.matrixQuestion.questionGroup,
          })
        )
        .subscribe((response: QuestionGroup) => {
          this.matrixQuestion.position = response.questions.length + 1;
        });
    }
  }

  onSubmit(event): void {
    event.preventDefault();

    // Form validation
    if (!this.isFieldValid()) return;

    const payload = Utils.deleteNullKey({
      ...this.questionForm.value,
      icon: this.matrixQuestion.icon,
    });

    if (this.iconFile.data) {
      payload.icon = this.iconFile;
    } else {
      delete payload.icon;
    }

    this.dialogConfig.operation === 'new'
      ? this.store.dispatch(
          new MatrixQuestionNewAction({
            question: {
              ...payload,
              options: this.matrixQuestion.options.map((op) => op.value),
              elements: this.matrixQuestion.elements.map((el) => el.title),
              position: this.matrixQuestion.position,
              mandatory: this.matrixQuestion.mandatory,
            },
            questionGroupId: this.data.questionGroupId,
            surveyId: this.data.surveyId,
          } as QuestionRequest)
        )
      : this.store.dispatch(
          new MatrixQuestionUpdateAction({
            question: {
              ...payload,
              id: this.matrixQuestion.id,
              options: this.matrixQuestion.options.map((op) => op.value),
              elements: this.matrixQuestion.elements.map((el) => el.title),
              mandatory: this.matrixQuestion.mandatory,
            },
            questionGroupId: this.matrixQuestion.questionGroup,
            surveyId: this.matrixQuestion.survey,
          } as QuestionRequest)
        );

    this.dialogRef.close({
      result: 'close_after_submit',
      data: this.matrixQuestion.questionGroup,
    });
  }

  isFieldValid(): boolean {
    let watcher = true;

    Object.keys(this.questionForm.value).forEach((key) => {
      if (!this.questionForm.get(key).valid) {
        watcher = false;
        return;
      }
    });

    // Check options length
    if (this.matrixQuestion.options.length < 2) {
      this.isMinOptionsLengthError = true;
      watcher = false;
    } else if (
      this.matrixQuestion.options.find((op) => op == null) !== undefined
    ) {
      this.isMinOptionsLengthError = true;
      watcher = false;
    }

    // Check Elements length
    if (this.matrixQuestion.elements.length < 2) {
      this.isMinElementsLengthError = true;
      watcher = false;
    } else if (
      this.matrixQuestion.options.find((el) => el == null) !== undefined
    ) {
      this.isMinElementsLengthError = true;
      watcher = false;
    }

    return watcher;
  }

  addOption(): void {
    this.matrixQuestion.options = [
      ...this.matrixQuestion.options,
      { value: '' },
    ];
  }

  addElement(): void {
    this.matrixQuestion.elements = [
      ...this.matrixQuestion.elements,
      { title: '' },
    ];
  }

  deleteOption(index: number): void {
    const options = [...this.matrixQuestion.options];
    options.splice(index, 1);
    this.matrixQuestion.options = [...options];
  }

  deleteElement(index: number): void {
    const elements = [...this.matrixQuestion.elements];
    elements.splice(index, 1);
    this.matrixQuestion.elements = [...elements];
  }

  onOptionChange(event: any, index: number): void {
    const options = [...this.matrixQuestion.options];
    options[index] = { value: event.target.value };
    this.matrixQuestion.options = [...options];
  }

  onElementChange(event: any, index: number): void {
    const elements = [...this.matrixQuestion.elements];
    elements[index] = { title: event.target.value };
    this.matrixQuestion.elements = [...elements];
  }

  advancedOptionChange(event): void {
    if (event.name === 'file') {
      this.iconFile.name = event.value.file.name;
      this.iconFile.data = event.value.base64;
    } else {
      this.matrixQuestion.mandatory = event.value;
    }
  }

  closeDialog(): void {
    this.dialogRef.close('close_cancel');
  }

  cancel(): void {
    this.closeDialog();
  }
}
