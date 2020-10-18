import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { ErrorPageRoutingModule } from './error-page-routing.module';

import { NotFoundErrorComponent } from './not-found-error/not-found-error.component';
import { InternalServerErrorComponent } from './internal-server-error/internal-server-error.component';

@NgModule({
  declarations: [
    NotFoundErrorComponent,
    InternalServerErrorComponent
  ],
  imports: [
    CommonModule,
    ErrorPageRoutingModule,
    TranslateModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ErrorPageModule {}
