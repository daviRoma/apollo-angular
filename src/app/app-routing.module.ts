import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth/guard/auth.guard';

import { AuthBaseComponent } from './core/auth/auth-components/commons/auth-base/auth-base.component';
import { LayoutBaseComponent } from './layouts/layout-base/layout-base.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: LayoutBaseComponent,
    loadChildren: () =>
      import(`./features/pages/page.module`).then((m) => m.PageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'surveys',
    component: LayoutBaseComponent,
    loadChildren: () =>
      import(`./features/pages/page.module`).then((m) => m.PageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    component: AuthBaseComponent,
    loadChildren: () =>
      import(`./core/auth/auth-components/auth-layouts.module`).then(
        (m) => m.AuthLayoutsModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
