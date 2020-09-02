import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgControl } from '@angular/forms';

import { QuestionGroupBoxComponent } from './components/question-group-box/question-group-box.component'

@NgModule({
  declarations: [
    QuestionGroupBoxComponent
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
