import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';
import { OverviewComponent } from './overview/overview.component';
import { ProfileComponent } from './profile/profile.component';
import { AdministrationComponent } from './administration/administration.component';
import { UseroverviewComponent } from './useroverview/useroverview.component';
import { SurveyanswerComponent } from './surveyanswer/surveyanswer.component';


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
  {
    path: 'detail/:survey_id',
    component: DetailComponent
  },
  {
    path: 'overview/:survey_id',
    component: OverviewComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    loadChildren: () => import(`../features/users/users.module`).then((m) => m.UsersModule)
  },
  {
    path: 'administration',
    component: AdministrationComponent,
    loadChildren: () => import(`../features/users/users.module`).then((m) => m.UsersModule)
  },
  {
    path: 'useroverview/:user_id',
    component: UseroverviewComponent,
  },
  {
    path: 'surveyanswer/:survey_id/:url_id',
    component: SurveyanswerComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(PageRoutes)],
  exports: [RouterModule]
})
export class PageRoutingModule {}
