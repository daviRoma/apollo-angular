import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { AdministrationPageRoutingModule } from './administration-page-routing.module';

import { SurveysModule } from '../../../features/surveys/surveys.module';

import { AdministrationComponent } from './administration/administration.component';
import { UseroverviewComponent } from './useroverview/useroverview.component';

@NgModule({
  declarations: [
    AdministrationComponent,
    UseroverviewComponent
  ],
  imports: [
    CommonModule,
    AdministrationPageRoutingModule,
    TranslateModule,
    SurveysModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdministrationPageModule {}
