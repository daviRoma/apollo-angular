import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';

import * as fromQuestionGroup from 'src/app/features/question-groups/store/question-group.selectors';

import { AppState } from 'src/app/state/app.state';
import {
  InputQuestionNewAction,
  InputQuestionUpdateAction,
} from '../../../store/actions/input-question.actions';

import { InputQuestion, QuestionRequest } from 'src/app/models/question.model';
import { QuestionGroup } from 'src/app/models/question-group.model';
import { Icon } from 'src/app/models/icon.model';

import Utils from 'src/app/shared/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-input-question-dialog',
  templateUrl: './input-question-dialog.component.html',
  styleUrls: ['./input-question-dialog.component.scss'],
})
export class InputQuestionDialogComponent implements OnInit {
  public dialogConfig: any;

  public inputQuestion: InputQuestion;
  public questionForm: FormGroup;

  public iconFile: Icon;
  public inputType: any[];

  private subscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<InputQuestionDialogComponent>,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogConfig = this.data.dialogConfig;
    this.iconFile = new Icon();

    this.questionForm = this.formBuilder.group({
      title: new FormControl('',  Validators.required),
      type: new FormControl('', [Validators.required]),
    });

    // Edit case
    if (this.data.question) {
      this.inputQuestion = { ...this.data.question } as InputQuestion;
    } else {
      this.inputQuestion = {
        mandatory: false,
        questionGroup: this.data.questionGroupId,
      } as InputQuestion;
    }

    this.questionForm.patchValue(this.inputQuestion);
  }

  ngOnInit(): void {
    this.inputType = [
      { value: 'TEXTAREA', label: 'TEXTAREA' },
      { value: 'TEXT', label: 'TEXT' },
      { value: 'DATE', label: 'DATE' },
      { value: 'NUMBER', label: 'NUMBER' },
    ];

    // Calculate question position
    if (
      this.inputQuestion.position == null ||
      this.inputQuestion.position === undefined
    ) {
      this.store
        .pipe(
          select(fromQuestionGroup.selectEntity, {
            id: this.inputQuestion.questionGroup,
          })
        )
        .subscribe((response: QuestionGroup) => {
          this.inputQuestion.position = response.questions.length + 1;
        });
    }
  }

  onSubmit(event): void {
    event.preventDefault();

    // Form validation
    if (!this.isFieldValid()) return;

    const payload = Utils.deleteNullKey({
      ...this.questionForm.value,
      icon: this.inputQuestion.icon,
    });

    if (this.iconFile.data) {
      payload.icon = this.iconFile;
    } else {
      delete payload.icon;
    }

    this.dialogConfig.operation === 'new'
      ? this.store.dispatch(
          new InputQuestionNewAction({
            question: {
              ...payload,
              position: this.inputQuestion.position,
              mandatory: this.inputQuestion.mandatory,
            },
            questionGroupId: this.data.questionGroupId,
            surveyId: this.data.surveyId,
          } as QuestionRequest)
        )
      : this.store.dispatch(
          new InputQuestionUpdateAction({
            question: {
              ...payload,
              id: this.inputQuestion.id,
              mandatory: this.inputQuestion.mandatory,
            },
            questionGroupId: this.inputQuestion.questionGroup,
            surveyId: this.inputQuestion.survey,
          } as QuestionRequest)
        );

    this.dialogRef.close({
      result: 'close_after_submit',
      data: this.inputQuestion.questionGroup,
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
    return watcher;
  }

  advancedOptionChange(event): void {
    if (event.name === 'file') {
      this.iconFile.name = event.value.file.name;
      this.iconFile.data = event.value.base64;
    } else {
      this.inputQuestion.mandatory = event.value;
    }
  }

  closeDialog(): void {
    this.dialogRef.close('close_cancel');
  }

  cancel(): void {
    this.closeDialog();
  }
}
