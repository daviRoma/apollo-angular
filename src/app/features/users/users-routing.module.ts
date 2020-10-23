import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { EditUserComponent } from './components/edituser/edituser.component';
import { UserListComponent } from './components/userlist/userlist.component';

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
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(UsersRoutes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
