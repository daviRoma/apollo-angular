import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgControl } from '@angular/forms';

import { SurveysRoutingModule } from './surveys-routing.module';
import { QuestionGroupsModule } from 'src/app/features/question-groups/question-groups.module';

import { SurveyListComponent } from './components/survey-list/survey-list.component';
import { SurveyDetailComponent } from './components/survey-detail/survey-detail.component';
import { SurveyOverviewComponent } from './components/survey-overview/survey-overview.component';
import { EditSurveyComponent } from './components/dialogs/edit-survey/edit-survey.component';
import { InvitationPoolComponent } from 'src/app/features/surveys/components/dialogs/invitation-pool/invitation-pool.component';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    SurveyListComponent,
    SurveyDetailComponent,
    SurveyOverviewComponent,
    EditSurveyComponent,
    InvitationPoolComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SurveysRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    QuestionGroupsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [SurveyDetailComponent],
})
export class SurveysModule {}
