import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { SurveyListComponent } from 'src/app/features/surveys/components/survey-list/survey-list.component';
import { SurveyDetailComponent } from './components/survey-detail/survey-detail.component';
import { SurveyOverviewComponent } from './components/survey-overview/survey-overview.component';

const SurveyRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: SurveyListComponent,
  },
  {
    path: 'edit/:survey_id',
    component: SurveyDetailComponent,
  },
  {
    path: 'summary/:survey_id',
    component: SurveyOverviewComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(SurveyRoutes)],
  exports: [RouterModule],
})
export class SurveysRoutingModule {}
