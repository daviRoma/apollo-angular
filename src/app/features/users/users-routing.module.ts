import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { EditUserComponent } from './components/edituser/edituser.component';
import { UserListComponent } from './components/userlist/userlist.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

const UsersRoutes: Routes = [
  {
    path: 'profile',
    redirectTo: 'edit',
    pathMatch: 'full',
  },
  {
    path: 'edit',
    component: EditUserComponent,
  },
  {
    path: 'list',
    component: UserListComponent,
  },
  {
    path: 'detail:user_id',
    component: UserDetailComponent,
  },
  // {
  //   path: 'edit/:survey_id',
  //   component: SurveyDetailComponent,
  // },
  // {
  //   path: 'summary/:survey_id',
  //   component: SurveyOverviewComponent
  // }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(UsersRoutes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
