import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';

import * as fromSurveyAnswer from 'src/app/features/answers/store/selectors/survey-answer.selectors';
import { SurveyAnswer } from 'src/app/models/survey-answer.model';

@Component({
  selector: 'app-answer-stats',
  templateUrl: './answer-stats.component.html',
  styleUrls: ['./answer-stats.component.scss']
})
export class AnswerStatsComponent implements OnInit {

  public surveyAnswer: SurveyAnswer;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.pipe(
      select(fromSurveyAnswer.selectEntityBySurvey))
      .subscribe((response: SurveyAnswer) => {
        console.log('AnswerStatsComponent', 'surveyAnswer', response);
        this.surveyAnswer = { ...response};
      });
  }

}
