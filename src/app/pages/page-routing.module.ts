import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AdministrationComponent } from './administration/administration.component';
import { UseroverviewComponent } from './useroverview/useroverview.component';


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
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(PageRoutes)],
  exports: [RouterModule]
})
export class PageRoutingModule {}
