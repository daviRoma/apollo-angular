import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { InputQuestionAnswerComponent } from './answer-components/input-question-answer/input-question-answer.component';
import { MatrixQuestionAnswerComponent } from './answer-components/matrix-question-answer/matrix-question-answer.component';
import { ChoiceQuestionAnswerComponent } from './answer-components/choice-question-answer/choice-question-answer.component';
import { QuestionGroupAnswerBoxComponent} from './question-group-answer-box/question-group-answer-box.component';


@NgModule({
  declarations: [
    InputQuestionAnswerComponent,
    MatrixQuestionAnswerComponent,
    ChoiceQuestionAnswerComponent,
    QuestionGroupAnswerBoxComponent,
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
    QuestionGroupAnswerBoxComponent
  ],
})
export class AnswersModule {}
