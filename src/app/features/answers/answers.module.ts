import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { InputQuestionAnswerComponent } from './components/answer-components/input-question-answer/input-question-answer.component';
import { MatrixQuestionAnswerComponent } from './components/answer-components/matrix-question-answer/matrix-question-answer.component';
import { ChoiceQuestionAnswerComponent } from './components/answer-components/choice-question-answer/choice-question-answer.component';
import { QuestionGroupAnswerBoxComponent} from './components/question-group-answer-box/question-group-answer-box.component';
import { QuestionGroupAnswerDetailComponent} from './components/question-group-answer-detail/question-group-answer-detail.component';
import { AnswerStatsComponent } from './components/answer-stats/answer-stats.component';
import { ChoiceAnswerStatsComponent } from './components/answer-stats-components/choice-answer-stats/choice-answer-stats.component';
import { InputAnswerStatsComponent } from './components/answer-stats-components/input-answer-stats/input-answer-stats.component';
import { MatrixAnswerStatsComponent } from './components/answer-stats-components/matrix-answer-stats/matrix-answer-stats.component';
import { AnswerListComponent } from './components/answer-list/answer-list.component';
import { SurveyPrivateComponent } from './components/survey-private/survey-private.component';
import { SurveyNotActiveComponent } from './components/survey-not-active/survey-not-active.component';
import { SurveySubmittedComponent } from './components/survey-submitted/survey-submitted.component';
import { SurveyAlreadyAnsweredComponent } from './components/survey-already-answered/survey-already-answered.component';


@NgModule({
  declarations: [
    InputQuestionAnswerComponent,
    MatrixQuestionAnswerComponent,
    ChoiceQuestionAnswerComponent,
    QuestionGroupAnswerBoxComponent,
    QuestionGroupAnswerDetailComponent,
    AnswerStatsComponent,
    ChoiceAnswerStatsComponent,
    InputAnswerStatsComponent,
    MatrixAnswerStatsComponent,
    AnswerListComponent,
    SurveyPrivateComponent,
    SurveyNotActiveComponent,
    SurveySubmittedComponent,
    SurveyAlreadyAnsweredComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    QuestionGroupAnswerBoxComponent,
    QuestionGroupAnswerDetailComponent,
    AnswerStatsComponent,
    AnswerListComponent,
    SurveyNotActiveComponent,
    SurveyPrivateComponent
  ],
})
export class AnswersModule {}
