import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { InputQuestionComponent } from './components/question-components/input-question/input-question.component';
import { MatrixQuestionComponent } from './components/question-components/matrix-question/matrix-question.component';
import { MultiChoiceQuestionComponent } from './components/question-components/multi-choice-question/multi-choice-question.component';
import { SelectionChoiceQuestionComponent } from './components/question-components/selection-choice-question/selection-choice-question.component';
import { SingleChoiceQuestionComponent } from './components/question-components/single-choice-question/single-choice-question.component';

import { InputQuestionDialogComponent } from './components/dialogs/input-question-dialog/input-question-dialog.component';
import { MatrixQuestionDialogComponent } from './components/dialogs/matrix-question-dialog/matrix-question-dialog.component';
import { MultiChoiceQuestionDialogComponent } from './components/dialogs/multi-choice-question-dialog/multi-choice-question-dialog.component';
import { SelectionQuestionDialogComponent } from './components/dialogs/selection-question-dialog/selection-question-dialog.component';
import { SingleChoiceQuestionDialogComponent } from './components/dialogs/single-choice-question-dialog/single-choice-question-dialog.component';
import { AdvancedComponent } from './components/advanced/advanced.component';

@NgModule({
  declarations: [
    InputQuestionComponent,
    MatrixQuestionComponent,
    MultiChoiceQuestionComponent,
    SelectionChoiceQuestionComponent,
    SingleChoiceQuestionComponent,

    InputQuestionDialogComponent,
    MatrixQuestionDialogComponent,
    MultiChoiceQuestionDialogComponent,
    SelectionQuestionDialogComponent,
    SingleChoiceQuestionDialogComponent,
    AdvancedComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    InputQuestionDialogComponent,
    MatrixQuestionDialogComponent,
    MultiChoiceQuestionDialogComponent,
    SelectionQuestionDialogComponent,
    SingleChoiceQuestionDialogComponent
  ],
})
export class QuestionsModule {}
