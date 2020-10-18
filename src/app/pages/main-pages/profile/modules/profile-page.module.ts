import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { ProfilePageRoutingModule } from './profile-page-routing.module';

import { SurveysModule } from '../../../../features/surveys/surveys.module';

import { ProfileComponent } from '../profile.component';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfilePageRoutingModule,
    TranslateModule,
    SurveysModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfilePageModule {}
