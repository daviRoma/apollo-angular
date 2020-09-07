import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';
import { OverviewComponent } from './overview/overview.component';


import { SurveysModule } from '../features/surveys/surveys.module';
import { QuestionGroupsModule } from '../features/question-groups/question-groups.module';
import { UsersModule } from '../features/users/users.module';

import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    DetailComponent,
    OverviewComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    SurveysModule,
    QuestionGroupsModule,
    FormsModule,
    ReactiveFormsModule,
    UsersModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PageModule {}
