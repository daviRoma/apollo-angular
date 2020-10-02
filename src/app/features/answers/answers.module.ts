import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { InputQuestionAnswerComponent } from './components/answer-components/input-question-answer/input-question-answer.component';
import { MatrixQuestionAnswerComponent } from './components/answer-components/matrix-question-answer/matrix-question-answer.component';
import { ChoiceQuestionAnswerComponent } from './components/answer-components/choice-question-answer/choice-question-answer.component';
import { QuestionGroupAnswerBoxComponent} from './components/question-group-answer-box/question-group-answer-box.component';
import { QuestionGroupAnswerDetailComponent} from './components/question-group-answer-detail/question-group-answer-detail.component';
import { AnswerStatsComponent } from './components/answer-stats/answer-stats.component';


@NgModule({
  declarations: [
    InputQuestionAnswerComponent,
    MatrixQuestionAnswerComponent,
    ChoiceQuestionAnswerComponent,
    QuestionGroupAnswerBoxComponent,
    QuestionGroupAnswerDetailComponent,
    AnswerStatsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    QuestionGroupAnswerBoxComponent,
    QuestionGroupAnswerDetailComponent,
    AnswerStatsComponent
  ],
})
export class AnswersModule {}
