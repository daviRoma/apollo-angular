import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';
import { SurveyNewAction, SurveyUpdateAction } from '../../../store/actions/survey.actions';

import { Survey, SurveyRequest } from 'src/app/models/survey.model';
import { IconData, Icon } from 'src/app/models/icon.model';

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
  public file: File;
  public iconData: IconData;

  public isFileError: boolean;
  public dateError: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditSurveyComponent>,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.iconData = new IconData();
    this.dialogConfig = this.data.dialogConfig;

    this.surveyForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      description: [''],
      secret: [false],
      startDate: [],
      endDate: [],
      icon: [],
    });

    // Edit case
    if (this.data.survey) {
      this.survey = {...this.data.survey};
      this.surveyForm.patchValue(this.survey);
    }
  }

  ngOnInit(): void {

  }

  onSubmit(event): void {
    event.preventDefault();

    // Form validation
    if (!this.isFieldsValid()) return;

    // Remove null attributes
    const payload = Utils.deleteNullKey({ ...this.surveyForm.value }) as Survey;

    if (this.iconData.base64) {
      payload.icon = { name: this.iconData.file.name, data: this.iconData.base64 } as Icon;
    } else {
      delete payload.icon;
    }

    this.dialogConfig.operation === 'new' ?
      this.store.dispatch(new SurveyNewAction(payload)) :
      this.store.dispatch(new SurveyUpdateAction({ ...payload, id: this.survey.id }));

    this.dialogRef.close({
      result: 'close_after_' + this.dialogConfig.operation,
      data: payload,
    });
  }

  isFieldsValid(): boolean {
    let watcher = true;
    const today = Utils.getCurrentFormattedDate();

    if (!this.surveyForm.get('name').valid) {
      watcher = false;
    }

    if (
      (this.surveyForm.get('startDate').value && this.surveyForm.get('endDate').value)
      && this.surveyForm.get('startDate').value >= this.surveyForm.get('endDate').value
    ) {
      watcher = false;
      this.dateError = true;
    } else if (this.surveyForm.get('startDate').value && this.surveyForm.get('startDate').value <= today) {
      watcher = false;
      this.dateError = true;
    } else if (this.surveyForm.get('endDate').value && this.surveyForm.get('endDate').value) {
      watcher = false;
      this.dateError = true;
    }

    return watcher;
  }

  closeDialog(): void {
    this.dialogRef.close({ result: 'close_cancel' });
  }

  cancel(): void {
    this.closeDialog();
  }

  onFileChange(event): void {
    if (this.fileValidation(event.target.files[0])) {
      this.file = event.target.files[0];
      this.iconData.file = this.file;
      this.fileEncoding(this.file);

      this.isFileError = false;
    } else {
      this.isFileError = true;
    }
  }

  fileValidation(file: File): boolean {
    if (file.size <= 5000000 && (file.type.includes('png') || file.type.includes('jpg') || file.type.includes('jpeg'))) return true;
    return false;
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
    this.iconData.base64 = btoa(binaryString);
  }

}
