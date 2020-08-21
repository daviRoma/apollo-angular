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
      import(`./pages/page.module`).then((m) => m.PageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'survey',
    component: LayoutBaseComponent,
    loadChildren: () =>
      import(`./pages/page.module`).then((m) => m.PageModule),
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'overview',
  //   component: LayoutBaseComponent,
  //   loadChildren: () =>
  //     import(`./pages/page.module`).then((m) => m.PageModule),
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'auth',
    component: AuthBaseComponent,
    loadChildren: () =>
      import(`./core/auth/auth-components/auth-layouts.module`).then((m) => m.AuthLayoutsModule)
  },
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
