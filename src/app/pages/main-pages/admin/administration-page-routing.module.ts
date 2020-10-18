import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { AdministrationComponent } from './administration/administration.component';
import { UseroverviewComponent } from './useroverview/useroverview.component';

const AdministrationPageRoutes: Routes = [
  {
    path: '',
    redirectTo: 'administration/list',
    pathMatch: 'full',
  },
  {
    path: 'administration',
    component: AdministrationComponent,
    loadChildren: () => import(`../../../features/users/users.module`).then((m) => m.UsersModule),
  },
  {
    path: 'useroverview/:user_id',
    component: UseroverviewComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(AdministrationPageRoutes)],
  exports: [RouterModule],
})
export class AdministrationPageRoutingModule {}
