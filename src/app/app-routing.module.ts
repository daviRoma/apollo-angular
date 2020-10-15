import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth/guard/auth.guard';

import { AuthBaseComponent } from './core/auth/auth-components/commons/auth-base/auth-base.component';
import { LayoutBaseComponent } from './layouts/layout-base/layout-base.component';
import { LayoutBaseAnswerComponent } from './layouts/layout-base-answer/layout-base-answer.component';
import { LayoutBaseErrorComponent } from './layouts/layout-base-error/layout-base-error.component';


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
  {
    path: 'users',
    component: LayoutBaseComponent,
    loadChildren: () =>
      import(`./pages/page.module`).then((m) => m.PageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'answers',
    component: LayoutBaseAnswerComponent,
    loadChildren: () => import(`./pages/answers/modules/answers-page.module`).then((m) => m.AnswersPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'answer',
    component: LayoutBaseAnswerComponent,
    loadChildren: () => import(`./pages/surveyanswer/modules/surveyanswer-page.module`).then((m) => m.SurveyAnswerPageModule)
  },
  {
    path: 'auth',
    component: AuthBaseComponent,
    loadChildren: () => import(`./core/auth/auth-components/auth-layouts.module`).then((m) => m.AuthLayoutsModule)
  },
  {
    path: 'errors',
    component: LayoutBaseErrorComponent,
    loadChildren: () => import(`./pages/errors/error-page.module`).then((m) => m.ErrorPageModule)
  },
  {
    path: '**',
    redirectTo: '/errors/404'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
