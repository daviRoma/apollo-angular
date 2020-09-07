import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { TestComponent } from './components/test/test.component';

const UsersRoutes: Routes = [
  {
    path: '',
    redirectTo: 'edit',
    pathMatch: 'full',
  },
  {
    path: 'edit',
    component: TestComponent,
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
