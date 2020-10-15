import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { SurveyanswerComponent } from '../surveyanswer.component';

const SurveyAnswerPageRoutes: Routes = [
  {
    path: '',
    redirectTo: 'surveyanswer/:survey_id/:url_id',
    pathMatch: 'full',
  },
  {
    path: 'surveyanswer/:survey_id/:url_id',
    component: SurveyanswerComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(SurveyAnswerPageRoutes)],
  exports: [RouterModule]
})
export class SurveyAnswerPageRoutingModule {}
