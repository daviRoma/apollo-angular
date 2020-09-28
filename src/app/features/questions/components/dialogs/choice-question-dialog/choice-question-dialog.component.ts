import { Component, OnInit, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store, select } from '@ngrx/store';

import * as fromQuestionGroup from 'src/app/features/question-groups/store/question-group.selectors';
import { ChoiceQuestionNewAction, ChoiceQuestionUpdateAction } from '../../../store/actions/choice-question.actions';

import { AppState } from 'src/app/state/app.state';

import { ChoiceQuestion, QuestionRequest } from 'src/app/models/question.model';
import { QuestionGroup } from 'src/app/models/question-group.model';
import { Icon } from 'src/app/models/icon.model';

import Utils from 'src/app/shared/utils';

@Component({
  selector: 'app-choice-question-dialog',
  templateUrl: './choice-question-dialog.component.html',
  styleUrls: ['./choice-question-dialog.component.scss'],
})
export class ChoiceQuestionDialogComponent implements OnInit {
  public dialogConfig: any;

  public choiceQuestion: ChoiceQuestion;
  public questionForm: FormGroup;

  public base64textString: string;

  public isLastOptionError: boolean;
  public isMinOptionLengthError: boolean;

  constructor(
    public dialogRef: MatDialogRef<ChoiceQuestionDialogComponent>,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogConfig = this.data.dialogConfig;
    this.choiceQuestion = new ChoiceQuestion();
    this.isLastOptionError = false;

    this.questionForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(12)]],
      other: [false],
      mandatory: [false],
      type: ['', Validators.required],
    });

    // Edit case
    if (this.data.question) {
      this.choiceQuestion = { ...this.data.question };
    } else {
      this.choiceQuestion = {
        options: [''],
        type: this.data.type,
        questionGroup: this.data.questionGroupId
      } as ChoiceQuestion;
    }

    this.questionForm.patchValue(this.choiceQuestion);
  }

  ngOnInit(): void {
    // Calculate question position
    if (this.choiceQuestion.position == null || this.choiceQuestion.position === undefined) {
      this.store
        .pipe(select(fromQuestionGroup.selectEntity, { id: this.choiceQuestion.questionGroup }))
        .subscribe((response: QuestionGroup) => {
          this.choiceQuestion.position = response.questions.length + 1;
        });
    }
  }

  onSubmit(event): void {
    event.preventDefault();

    // Form validation
    if (!this.isFieldsValid()) return;

    const payload = Utils.deleteNullKey({ ...this.questionForm.value });
    console.log('InputQuestionDialogComponent', 'Payload', payload);

    this.dialogConfig.operation === 'new'
      ? this.store.dispatch(
          new ChoiceQuestionNewAction({
            question: {
              ...payload,
              options: this.choiceQuestion.options,
              position: this.choiceQuestion.position,
              mandatory: this.choiceQuestion.mandatory,
              icon: this.choiceQuestion.icon
            },
            questionGroupId: this.data.questionGroupId,
            surveyId: this.data.surveyId,
          } as QuestionRequest)
        )
      : this.store.dispatch(
          new ChoiceQuestionUpdateAction({
            question: { ...payload, id: this.choiceQuestion.id },
            questionGroupId: this.choiceQuestion.questionGroup,
            surveyId: this.choiceQuestion.survey,
          } as QuestionRequest)
        );
    this.dialogRef.close({
      result: 'close_after_' + this.dialogConfig.operation,
      data: payload,
    });
  }

  isFieldsValid(): boolean {
    let watcher = true;

    Object.keys(this.questionForm.value).forEach((key) => {
      if (!this.questionForm.get(key).valid) {
        watcher = false;
        return;
      }
    });

    if (this.choiceQuestion.options.length < 2) {
      this.isMinOptionLengthError = true;
      watcher = false;
    } else if (this.choiceQuestion.options.find( (op) => op == null) !== undefined) {
      this.isMinOptionLengthError = true;
      watcher = false;
    }

    return watcher;
  }

  addOption(): void {
    this.choiceQuestion.options.push('');
    this.isLastOptionError = false;
  }

  deleteOption(option: string): void {
    if (this.choiceQuestion.options.length === 1) {
      this.isLastOptionError = true;
      return;
    }
    this.choiceQuestion.options.splice(
      this.choiceQuestion.options.indexOf(option),
      1
    );
    this.isLastOptionError = false;
  }

  onOptionChange(event: any, index: number): void {
    this.choiceQuestion.options[index] = event.target.value;
  }

  advancedOptionChange(event): void {
    if (event.name === 'file') {
      this.fileEncoding(event.value);
      this.choiceQuestion.icon = {
        name: event.value.name,
        data: this.base64textString,
      } as Icon;
    } else {
      this.choiceQuestion.mandatory = event.value;
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
