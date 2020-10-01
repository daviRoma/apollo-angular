import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';
import { QuestionLoadAction } from 'src/app/features/questions/store/actions/question.actions';

import * as fromQuestion from 'src/app/features/questions/store/selectors/question.selectors';

import { Survey } from 'src/app/models/survey.model';
import { QuestionGroup } from 'src/app/models/question-group.model';
import { QuestionRequest, Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-survey-overview',
  templateUrl: './survey-overview.component.html',
  styleUrls: ['./survey-overview.component.scss']
})
export class SurveyOverviewComponent implements OnInit {

  @Input() survey: Survey;

  public questionGroupId: number;
  public questions: Question[];

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store
      .pipe(select(fromQuestion.selectEntitiesByGroup, { id: this.questionGroupId }))
      .subscribe((response: Question[]) => {
        if (response) {
          console.log('Questions', response);
          this.questions = { ...response };
        }
      });

  }

  onQuestionGroupChange(event): void {
    this.questionGroupId = event.target.value;
    // Get questions
    this.store.dispatch(new QuestionLoadAction({
      surveyId: this.survey.id,
      questionGroupId: this.questionGroupId
    } as QuestionRequest));
  }

}
