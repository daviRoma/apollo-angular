import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';
import { OverviewComponent } from './overview/overview.component';

const PageRoutes: Routes = [
  {
    path: '',
    redirectTo: 'surveys/list',
    pathMatch: 'full',
  },
  {
    path: 'surveys',
    component: DashboardComponent,
    loadChildren: () => import(`../features/surveys/surveys.module`).then((m) => m.SurveysModule)
  },
  // {
  //   path: 'users',
  //   component: DashboardComponent,
  //   loadChildren: () => import(`../features/users/users.module`).then((m) => m.UsersModule)
  // },
  {
    path: 'detail/:survey_id',
    component: DetailComponent
    // loadChildren: () => import(`../features/surveys/surveys.module`).then((m) => m.SurveysModule)
  },
  {
    path: 'overview/:survey_id',
    component: OverviewComponent
    // loadChildren: () => import(`../features/surveys/surveys.module`).then((m) => m.SurveysModule)
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(PageRoutes)],
  exports: [RouterModule]
})
export class PageRoutingModule {}
