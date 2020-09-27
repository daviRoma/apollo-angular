import { Component, OnInit, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';
import { ChoiceQuestion, ChoiceOption, QuestionRequest } from 'src/app/models/question.model';

import Utils from 'src/app/shared/utils';
import { ChoiceQuestionNewAction, ChoiceQuestionUpdateAction } from '../../../store/actions/choice-question.actions';


@Component({
  selector: 'app-choice-question-dialog',
  templateUrl: './choice-question-dialog.component.html',
  styleUrls: ['./choice-question-dialog.component.scss'],
})
export class ChoiceQuestionDialogComponent implements OnInit {
  public dialogConfig: any;

  public choiceQuestion: ChoiceQuestion;
  public questionForm: FormGroup;
  public isLastOptionError: boolean;

  constructor(
    public dialogRef: MatDialogRef<ChoiceQuestionDialogComponent>,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogConfig = this.data.dialogConfig;
    this.isLastOptionError = false;

    this.questionForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(12)]],
      other: [false],
      options: [[], Validators.required]
    });

    // Edit case
    if (this.data.question) {
      this.choiceQuestion = { ...this.data.question };
      this.questionForm.patchValue(this.choiceQuestion);
    } else {
      this.choiceQuestion = {
        options: [{id: 1, value: null}],
        type: this.data.type
      } as ChoiceQuestion;
    }
  }

  ngOnInit(): void {}

  onSubmit(event): void {
    event.preventDefault();

    // Form validation
    if (!this.isFieldValid()) return;

    const payload = Utils.deleteNullKey({ ...this.questionForm.value });

    console.log('InputQuestionDialogComponent', 'Payload', payload);

    this.dialogConfig.operation === 'new'
      ? this.store.dispatch(
          new ChoiceQuestionNewAction({
            question: { ...payload, type: this.choiceQuestion.type, options: this.choiceQuestion.options },
            questionGroupId: this.data.questionGroupId,
            surveyId: this.data.surveyId
          } as QuestionRequest)
        )
      : this.store.dispatch(
          new ChoiceQuestionUpdateAction({
            question: { ...payload, id: this.choiceQuestion.id },
            questionGroupId: this.choiceQuestion.questionGroup,
            surveyId: this.choiceQuestion.survey
          } as QuestionRequest)
        );
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

  addOption(): void {
    this.choiceQuestion.options.push(
      {
        id: this.choiceQuestion.options[this.choiceQuestion.options.length - 1].id + 1,
        value: null
      } as ChoiceOption
    );
    this.isLastOptionError = false;
  }

  deleteOption(option: ChoiceOption): void {
    if (this.choiceQuestion.options.length === 1) {
      this.isLastOptionError = true;
      return;
    }
    this.choiceQuestion.options.splice(this.choiceQuestion.options.indexOf(option), 1);
    this.isLastOptionError = false;
  }

  advancedOptionChange(event): void {
    console.log('AAA', event);
  }

  closeDialog(): void {
    this.dialogRef.close('close_cancel');
  }

  cancel(): void {
    this.closeDialog();
  }

}
