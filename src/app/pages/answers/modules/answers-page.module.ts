import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { AnswersPageRoutingModule } from './answers-page-routing.module';

import { SurveysModule } from '../../../features/surveys/surveys.module';
import { QuestionGroupsModule } from '../../../features/question-groups/question-groups.module';
import { UsersModule } from '../../../features/users/users.module';
import { AnswersModule } from '../../../features/answers/answers.module';

import { AnswersComponent } from '../answers.component';

@NgModule({
  declarations: [
    AnswersComponent
  ],
  imports: [
    CommonModule,
    AnswersPageRoutingModule,
    TranslateModule,
    SurveysModule,
    QuestionGroupsModule,
    UsersModule,
    AnswersModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AnswersPageModule {}
