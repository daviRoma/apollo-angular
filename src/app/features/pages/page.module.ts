import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SurveyDetailComponent } from './survey-detail/survey-detail.component';
import { SurveyOverviewComponent } from './survey-overview/survey-overview.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SurveyDetailComponent,
    SurveyOverviewComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PageModule {}
