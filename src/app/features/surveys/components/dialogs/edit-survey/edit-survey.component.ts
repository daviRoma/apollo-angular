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
import { IconData, Icon } from 'src/app/models/icon.model';

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

  constructor(
    public dialogRef: MatDialogRef<EditSurveyComponent>,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.iconData = new IconData();
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

  }

  onSubmit(event): void {
    event.preventDefault();

    // Remove null attributes
    const payload = Utils.deleteNullKey({ ...this.surveyForm.value }) as Survey;

    console.log('EditSurveyComponent', 'Payload', payload);

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

  closeDialog(): void {
    this.dialogRef.close({ result: 'close_cancel' });
  }

  cancel(): void {
    this.closeDialog();
  }

  onFileChange(event): void {
    console.log('File Change Event', event);

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
