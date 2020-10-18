import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { DashboardPageRoutingModule } from './dashboard-page-routing.module';

import { SurveysModule } from '../../../../features/surveys/surveys.module';

import { DashboardComponent } from '../dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardPageRoutingModule,
    TranslateModule,
    SurveysModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardPageModule {}
