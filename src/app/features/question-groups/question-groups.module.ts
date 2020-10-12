import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuestionsModule } from 'src/app/features/questions/questions.module';
import { QuestionGroupBoxComponent } from './components/question-group-box/question-group-box.component';
import { EditQuestionGroupComponent } from './components/dialogs/edit-question-group/edit-question-group.component';
import { DeleteQuestionGroupComponent } from './components/dialogs/delete-question-group/delete-question-group.component';
import { QuestionGroupDetailComponent } from './components/question-group-detail/question-group-detail.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    QuestionGroupBoxComponent,
    EditQuestionGroupComponent,
    DeleteQuestionGroupComponent,
    QuestionGroupDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    QuestionsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [QuestionGroupBoxComponent]
})
export class QuestionGroupsModule {}
