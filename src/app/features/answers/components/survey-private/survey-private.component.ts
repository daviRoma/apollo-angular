import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { QuestionGroupLoadAction } from 'src/app/features/question-groups/store/question-group.actions';
import { SurveyLoadAction } from 'src/app/features/surveys/store/actions/survey.actions';
import { Survey, SurveyRequest } from 'src/app/models/survey.model';
import { AppState } from 'src/app/state/app.state';
import { SurveyAnswerLoadAction } from '../../store/actions/survey-answer.actions';
import * as fromSurveyAnswer from 'src/app/features/answers/store/selectors/survey-answer.selectors';
import { Answer, AnswerRequest, AnswersWrapper } from 'src/app/models/answer.model';
import { AnswerLoadAction } from '../../store/actions/answer.actions';
import { QuestionAnswer, SurveyAnswer, SurveyAnswerRequest } from 'src/app/models/survey-answer.model';


@Component({
  selector: 'app-survey-private',
  templateUrl: './survey-private.component.html',
  styleUrls: ['./survey-private.component.scss']
})
export class SurveyPrivateComponent implements OnInit {

  @Input() surveyId: number
  @Output() unlock = new EventEmitter();

  private surveyAnswer: SurveyAnswer[];

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {

    this.loadData(this.surveyId);
  }

  ngOnInit(): void {

    console.log("Survey ID", this.surveyId);

  }

  private loadData(surveyId: number): void {
    this.store.pipe(
      select(fromSurveyAnswer.selectAllSurveyAnswer))
      .subscribe((response: any) => {
        console.log('SurveyPrivate', 'SurveyAnswer', response);
        // this.surveyAnswer = [ ...response ];
    });
  }

}
