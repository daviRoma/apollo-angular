import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from '../profile.component';

const ProfiePageRoutes: Routes = [
  {
    path: '',
    redirectTo: 'profile/edit',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    loadChildren: () => import(`../../../../features/users/users.module`).then((m) => m.UsersModule),
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(ProfiePageRoutes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
