import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { SurveyPageRoutingModule } from './survey-page-routing.module';

import { SurveysModule } from '../../features/surveys/surveys.module';
import { QuestionGroupsModule } from '../../features/question-groups/question-groups.module';
import { UsersModule } from '../../features/users/users.module';
import { AnswersModule } from '../../features/answers/answers.module';

import { OverviewComponent } from './overview/overview.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    OverviewComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    SurveyPageRoutingModule,
    TranslateModule,
    SurveysModule,
    QuestionGroupsModule,
    UsersModule,
    AnswersModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SurveyPageModule {}
