import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { AnswersComponent } from './answers.component';


const PageRoutes: Routes = [
  {
    path: '',
    redirectTo: 'survey/:survey_id/view/:url_id/:answer_id',
    pathMatch: 'full',
  },
  {
    path: 'survey/:survey_id/view/:url_id/:answer_id',
    component: AnswersComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(PageRoutes)],
  exports: [RouterModule]
})
export class AnswersPageRoutingModule {}
