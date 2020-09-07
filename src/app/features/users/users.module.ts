import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';


import { TestComponent } from './components/test/test.component';

@NgModule({
  declarations: [TestComponent],
  imports: [
    UsersRoutingModule,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports:[TestComponent]
})
export class UsersModule {}
