import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';
import { selectSurveyState } from '../../../store/selectors/survey.selectors';
import { SurveyNewAction, SurveyUpdateAction } from '../../../store/actions/survey.actions';

import { Survey } from 'src/app/models/survey.model';

import Utils from 'src/app/shared/utils';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.scss'],
})
export class EditSurveyComponent implements OnInit {
  public dialogConfig: any;
  public survey: Survey;

  public surveyForm: FormGroup;

  private currentState: Observable<any>;

  constructor(
    public dialogRef: MatDialogRef<EditSurveyComponent>,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.currentState = this.store.select(selectSurveyState);
    this.dialogConfig = this.data.dialogConfig;

    this.surveyForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      secret: [false],
      start_date: [],
      end_date: [],
      icon: []
    });

    // Edit case
    if (this.data.survey) {
      this.survey = {...this.data.survey};
      this.surveyForm.patchValue(this.survey);
    }
  }

  ngOnInit(): void {
    this.currentState.subscribe((state) => {

    });
  }

  onSubmit(event): void {
    event.preventDefault();

    // Remove null attributes
    const payload = Utils.deleteNullKey({ ...this.surveyForm.value });

    console.log('EditSurveyComponent', 'Payload', payload);

    this.dialogConfig.operation === 'new' ?
      this.store.dispatch(new SurveyNewAction(payload)) :
      this.store.dispatch(new SurveyUpdateAction({ ...payload, id: this.survey.id }));

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
