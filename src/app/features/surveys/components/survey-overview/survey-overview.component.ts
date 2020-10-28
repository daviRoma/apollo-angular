import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';

import * as fromSurveyAnswer from 'src/app/features/answers/store/selectors/survey-answer.selectors';

import { Survey } from 'src/app/models/survey.model';

import { Paths } from 'src/app/shared/config/path.conf';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-survey-overview',
  templateUrl: './survey-overview.component.html',
  styleUrls: ['./survey-overview.component.scss'],
})
export class SurveyOverviewComponent implements OnInit, OnDestroy {
  @Input() survey: Survey;

  public totSurveyAnswers: number;
  public publicLink: string;

  private subscription: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.publicLink = `${Paths.surveyAnswer.page}/${this.survey.id}/${this.survey.urlId}`;
    this.subscription = this.store
      .select(fromSurveyAnswer.selectSurveyAnswerTotal)
      .subscribe((total) => (this.totSurveyAnswers = total));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
