import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';
import { OverviewComponent } from './overview/overview.component';

const PageRoutes: Routes = [
  {
    path: '',
    redirectTo: 'survey-list',
    pathMatch: 'full',
  },
  {
    path: 'survey-list',
    component: DashboardComponent,
    loadChildren: () => import(`../features/surveys/surveys.module`).then((m) => m.SurveysModule)
  },
  // {
  //   path: 'user-list',
  //   component: DashboardComponent,
  //   loadChildren: () => import(`../features/users/users.module`).then((m) => m.UsersModule)
  // },
  {
    path: 'survey-detail/:survey_id',
    component: DetailComponent,
    loadChildren: () => import(`../features/surveys/surveys.module`).then((m) => m.SurveysModule)
  },
  {
    path: 'survey-overview/:survey_id',
    component: OverviewComponent,
    loadChildren: () => import(`../features/surveys/surveys.module`).then((m) => m.SurveysModule)
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(PageRoutes)],
  exports: [RouterModule]
})
export class PageRoutingModule {}
