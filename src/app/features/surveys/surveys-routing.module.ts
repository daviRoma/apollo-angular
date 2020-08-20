import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { SurveyListComponent } from 'src/app/features/surveys/components/survey-list/survey-list.component';

const SurveyRoutes: Routes = [
  {
    path: '',
    redirectTo: 'survey-list',
    pathMatch: 'full',
  },
  {
    path: 'survey-list',
    component: SurveyListComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(SurveyRoutes)],
  exports: [RouterModule],
})
export class SurveysRoutingModule {}
