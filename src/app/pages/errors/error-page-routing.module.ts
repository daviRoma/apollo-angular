import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { NotFoundErrorComponent } from './not-found-error/not-found-error.component';
import { InternalServerErrorComponent } from './internal-server-error/internal-server-error.component';

const ErrorPageRoutes: Routes = [
  {
    path: '',
    redirectTo: '/404',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: NotFoundErrorComponent,
  },
  {
    path: '500',
    component: InternalServerErrorComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(ErrorPageRoutes)],
  exports: [RouterModule],
})
export class ErrorPageRoutingModule {}
