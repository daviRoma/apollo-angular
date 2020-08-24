import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveysRoutingModule } from './surveys-routing.module';

import { SurveyListComponent } from './components/survey-list/survey-list.component';
import { SurveyDetailComponent } from './components/survey-detail/survey-detail.component';
import { SurveyOverviewComponent } from './components/survey-overview/survey-overview.component';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    SurveyListComponent,
    SurveyDetailComponent,
    SurveyOverviewComponent
  ],
  imports: [
    CommonModule,
    SurveysRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SurveysModule {}
