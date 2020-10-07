import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-close-survey-answer',
  templateUrl: './close-survey-answer.component.html',
  styleUrls: ['./close-survey-answer.component.scss']
})
export class CloseSurveyAnswerComponent implements OnInit {

  public dialogConfig: any;

  public title: string;
  public description: string;

  constructor(
    public dialogRef: MatDialogRef<CloseSurveyAnswerComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogConfig = this.data.dialogConfig;

    if (this.data.invitationPool) {
      this.title = this.data.title;
    }
    if (this.data.surveyAnswers) {
      this.description = this.data.content;
    }

    console.log("title", this.title);
    console.log("description", this.description);
  }

  ngOnInit(): void { }

  /**
   * Manage confirm click on delete window.
   */
}

