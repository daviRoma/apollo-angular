import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AppState } from 'src/app/state/app.state';
import { QuestionGroupNewAction, QuestionGroupUpdateAction } from 'src/app/features/question-groups/store/question-group.actions';

import { QuestionGroup } from 'src/app/models/question-group.model';

import Utils from 'src/app/shared/utils';

@Component({
  selector: 'app-edit-question-group',
  templateUrl: './edit-question-group.component.html',
  styleUrls: ['./edit-question-group.component.scss']
})
export class EditQuestionGroupComponent implements OnInit {

  public dialogConfig: any;
  public questionGroup: QuestionGroup;

  public questionGroupForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditQuestionGroupComponent>,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogConfig = this.data.dialogConfig;

    this.questionGroupForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['']
    });

    // Edit case
    if (this.data.questionGroup) {
      this.questionGroup = { ...this.data.questionGroup };
      this.questionGroupForm.patchValue(this.questionGroup);
    }
  }

  ngOnInit(): void {
  }

  onSubmit(event): void {
    event.preventDefault();

    const payload = Utils.deleteNullKey({ ...this.questionGroupForm.value });

    console.log('EditQuestionGroupComponent', 'Payload', payload);

    this.dialogConfig.operation === 'new' ?
      this.store.dispatch(new QuestionGroupNewAction(payload)) :
      this.store.dispatch(new QuestionGroupUpdateAction(payload));

    this.dialogRef.close({
      result: 'close_after_' + this.dialogConfig.operation,
      data: payload,
    });
  }

  closeDialog(): void {
    this.dialogRef.close('close_cancel');
  }

  cancel(): void {
    this.closeDialog();
  }

}
