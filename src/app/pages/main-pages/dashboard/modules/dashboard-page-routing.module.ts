import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '../dashboard.component';

const DashboardPageRoutes: Routes = [
  {
    path: '',
    redirectTo: 'surveys/list',
    pathMatch: 'full',
  },
  {
    path: 'surveys',
    component: DashboardComponent,
    loadChildren: () => import(`../../../../features/surveys/surveys.module`).then((m) => m.SurveysModule),
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(DashboardPageRoutes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
