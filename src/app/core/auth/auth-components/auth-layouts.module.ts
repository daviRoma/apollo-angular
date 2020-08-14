import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule, NgControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core'; // Import the TranslateModule

import { AuthLayoutsRoutingModule } from 'src/app/core/auth/auth-components/auth-layouts-routing.module';

import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { AuthBaseComponent } from './commons/auth-base/auth-base.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    AuthLayoutsRoutingModule
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AuthBaseComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthLayoutsModule {}
