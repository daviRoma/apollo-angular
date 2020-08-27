import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgControl } from '@angular/forms';

import { SurveysRoutingModule } from './surveys-routing.module';

import { SurveyListComponent } from './components/survey-list/survey-list.component';
import { SurveyDetailComponent } from './components/survey-detail/survey-detail.component';
import { SurveyOverviewComponent } from './components/survey-overview/survey-overview.component';
import { EditSurveyComponent } from './components/modals/edit-survey/edit-survey.component';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    SurveyListComponent,
    SurveyDetailComponent,
    SurveyOverviewComponent,
    EditSurveyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SurveysRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SurveysModule {}
