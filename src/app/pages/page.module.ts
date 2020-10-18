import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { SurveysModule } from '../features/surveys/surveys.module';
import { QuestionGroupsModule } from '../features/question-groups/question-groups.module';
import { UsersModule } from '../features/users/users.module';
import { AnswersModule } from '../features/answers/answers.module';

import { AnswersPageModule } from './answers/modules/answers-page.module';
import { SurveyAnswerPageModule } from './surveyanswer/modules/surveyanswer-page.module';
import { DashboardPageModule } from './main-pages/dashboard/modules/dashboard-page.module';
import { AdministrationPageModule } from './main-pages/admin/administration-page.module';
import { ProfilePageModule } from './main-pages/profile/modules/profile-page.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PageRoutingModule,
    TranslateModule,
    SurveysModule,
    QuestionGroupsModule,
    UsersModule,
    AnswersModule,
    AnswersPageModule,
    SurveyAnswerPageModule,
    DashboardPageModule,
    AdministrationPageModule,
    ProfilePageModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PageModule {}
