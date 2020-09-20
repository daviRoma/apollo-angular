import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';
import { InputQuestion } from 'src/app/models/question.model';

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

  public inputType: any[];

  constructor(
    public dialogRef: MatDialogRef<InputQuestionDialogComponent>,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogConfig = this.data.dialogConfig;

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
      this.questionForm.patchValue(this.inputQuestion);
    }
  }

  ngOnInit(): void {
    this.inputType = [
      { value: 'TEXTAREA', label: 'TEXTAREA' },
      { value: 'TEXT', label: 'TEXT' },
      { value: 'DATE', label: 'DATE' },
      { value: 'NUMBER', label: 'NUMBER' },
    ];
  }

  onSubmit(event): void {
    event.preventDefault();

    // Form validation
    if (!this.isFieldValid()) return;

    const payload = Utils.deleteNullKey({ ...this.questionForm.value });

    console.log('InputQuestionDialogComponent', 'Payload', payload);

    this.dialogRef.close({
      result: 'close_after_' + this.dialogConfig.operation,
      data: payload,
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

  closeDialog(): void {
    this.dialogRef.close('close_cancel');
  }

  cancel(): void {
    this.closeDialog();
  }
}
