import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';
import { OverviewComponent } from './overview/overview.component';


import { SurveysModule } from '../features/surveys/surveys.module';
import { QuestionGroupsModule } from '../features/question-groups/question-groups.module';
import { UsersModule } from '../features/users/users.module';
import { AnswersModule } from '../features/answers/answers.module';


import { ProfileComponent } from './profile/profile.component';
import { AdministrationComponent } from './administration/administration.component';
import { UseroverviewComponent } from './useroverview/useroverview.component';
import { SurveyanswerComponent } from './surveyanswer/surveyanswer.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DashboardComponent,
    DetailComponent,
    OverviewComponent,
    ProfileComponent,
    AdministrationComponent,
    UseroverviewComponent,
    SurveyanswerComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    TranslateModule,
    SurveysModule,
    QuestionGroupsModule,
    UsersModule,
    AnswersModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PageModule {}
