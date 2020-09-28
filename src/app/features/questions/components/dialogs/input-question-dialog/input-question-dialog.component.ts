import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import * as fromQuestionGroup from 'src/app/features/question-groups/store/question-group.selectors';

import { AppState } from 'src/app/state/app.state';
import { InputQuestionNewAction, InputQuestionUpdateAction } from '../../../store/actions/input-question.actions';

import { InputQuestion, QuestionRequest } from 'src/app/models/question.model';
import { QuestionGroup } from 'src/app/models/question-group.model';
import { Icon } from 'src/app/models/icon.model';

import Utils from 'src/app/shared/utils';

@Component({
  selector: 'app-input-question-dialog',
  templateUrl: './input-question-dialog.component.html',
  styleUrls: ['./input-question-dialog.component.scss'],
})
export class InputQuestionDialogComponent implements OnInit {
  public dialogConfig: any;

  public inputQuestion: InputQuestion;
  public questionForm: FormGroup;

  public base64textString: string;

  public inputType: any[];

  constructor(
    public dialogRef: MatDialogRef<InputQuestionDialogComponent>,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogConfig = this.data.dialogConfig;
    this.inputQuestion = new InputQuestion();

    this.questionForm = this.formBuilder.group({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(12),
      ]),
      type: new FormControl('', [Validators.required]),
    });

    // Edit case
    if (this.data.question) {
      this.inputQuestion = { ...this.data.question };
    } else {
      this.inputQuestion.questionGroup = this.data.questionGroupId;
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
          console.log(response);
          this.inputQuestion.position = response.questions.length + 1;
        });
    }
  }

  onSubmit(event): void {
    event.preventDefault();

    // Form validation
    if (!this.isFieldValid()) return;

    const payload = Utils.deleteNullKey({ ...this.questionForm.value });

    console.log('InputQuestionDialogComponent', 'Payload', payload);

    this.dialogConfig.operation === 'new'
      ? this.store.dispatch(
          new InputQuestionNewAction({
            question: {
              ...payload,
              position: this.inputQuestion.position,
              mandatory: this.inputQuestion.mandatory,
              icon: this.inputQuestion.icon,
            },
            questionGroupId: this.data.questionGroupId,
            surveyId: this.data.surveyId,
          } as QuestionRequest)
        )
      : this.store.dispatch(
          new InputQuestionUpdateAction({
            question: { ...payload, id: this.inputQuestion.id },
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
      this.fileEncoding(event.value);
      this.inputQuestion.icon = {
        name: event.value.name,
        data: this.base64textString,
      } as Icon;
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

  private fileEncoding(file: File): void {
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleBase64Encoding.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  private handleBase64Encoding(event): void {
    const binaryString = event.target.result;
    this.base64textString = btoa(binaryString);
  }
}
