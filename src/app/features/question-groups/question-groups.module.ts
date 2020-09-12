import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuestionGroupBoxComponent } from './components/question-group-box/question-group-box.component';
import { EditQuestionGroupComponent } from './components/dialogs/edit-question-group/edit-question-group.component';
import { DeleteQuestionGroupComponent } from './components/dialogs/delete-question-group/delete-question-group.component';

@NgModule({
  declarations: [
    QuestionGroupBoxComponent,
    EditQuestionGroupComponent,
    DeleteQuestionGroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [QuestionGroupBoxComponent]
})
export class QuestionGroupsModule {}
