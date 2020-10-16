import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { DetailComponent } from './detail/detail.component';
import { OverviewComponent } from './overview/overview.component';

const SurveyPageRoutes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
  {
    path: 'overview/:survey_id',
    component: OverviewComponent,
  },
  {
    path: 'detail/:survey_id',
    component: DetailComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(SurveyPageRoutes)],
  exports: [RouterModule],
})
export class SurveyPageRoutingModule {}
