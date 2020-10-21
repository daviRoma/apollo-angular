import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';

import * as fromSurveyAnswer from 'src/app/features/answers/store/selectors/survey-answer.selectors';

import { Survey } from 'src/app/models/survey.model';

import { Paths } from 'src/app/shared/config/path.conf';

@Component({
  selector: 'app-survey-overview',
  templateUrl: './survey-overview.component.html',
  styleUrls: ['./survey-overview.component.scss']
})
export class SurveyOverviewComponent implements OnInit {

  @Input() survey: Survey;

  public totSurveyAnswers: number;
  public publicLink: string;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.publicLink = `${Paths.surveyAnswer.page}/${this.survey.id}/${this.survey.urlId}`;
    this.store
      .pipe(select(fromSurveyAnswer.selectSurveyAnswerTotal))
      .subscribe((total) => (this.totSurveyAnswers = total));
  }

}
