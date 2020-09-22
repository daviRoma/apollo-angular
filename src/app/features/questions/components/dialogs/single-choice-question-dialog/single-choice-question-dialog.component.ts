import { Component, OnInit, Inject } from '@angular/core';
import { ChoiceQuestion } from 'src/app/models/question.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

import Utils from 'src/app/shared/utils';

@Component({
  selector: 'app-single-choice-question-dialog',
  templateUrl: './single-choice-question-dialog.component.html',
  styleUrls: ['./single-choice-question-dialog.component.scss']
})
export class SingleChoiceQuestionDialogComponent implements OnInit {

public dialogConfig: any;

  public choiceQuestion: ChoiceQuestion;
  public questionForm: FormGroup;

  public inputType: any[];

  constructor(
    public dialogRef: MatDialogRef<SingleChoiceQuestionDialogComponent>,
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
      choiceType: new FormControl('', [Validators.required]),
      options: [],
      otherChoice: [false]
    });

    // Edit case
    if (this.data.question) {
      this.choiceQuestion = { ...this.data.question };
      this.questionForm.patchValue(this.choiceQuestion);
    }
  }

  ngOnInit(): void {

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

  addOption(): void {}

  closeDialog(): void {
    this.dialogRef.close('close_cancel');
  }

  cancel(): void {
    this.closeDialog();
  }

}
