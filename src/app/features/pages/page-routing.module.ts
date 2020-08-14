import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SurveyDetailComponent } from './survey-detail/survey-detail.component';
import { SurveyOverviewComponent } from './survey-overview/survey-overview.component';

const PageRoutes: Routes = [
  {
    path: '',
    redirectTo: 'survey-list',
    pathMatch: 'full'
  },
  {
    path: 'survey-list',
    component: DashboardComponent
  },
  {
    path: 'survey-detail/:survey_id',
    component: SurveyDetailComponent
  },
  {
    path: 'survey-overview/:survey_id',
    component: SurveyOverviewComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(PageRoutes)],
  exports: [RouterModule]
})
export class PageRoutingModule {}
