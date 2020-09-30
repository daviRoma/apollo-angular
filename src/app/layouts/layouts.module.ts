import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutsRoutes } from './layouts.routing';

import { SidebarComponent } from './sidebar/sidebar.component';
import { MainbarComponent } from './mainbar/mainbar.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutBaseComponent } from './layout-base/layout-base.component';
import { LayoutBaseAnswerComponent } from './layout-base-answer/layout-base-answer.component';


@NgModule({
  declarations: [
    LayoutBaseComponent,
    SidebarComponent,
    MainbarComponent,
    FooterComponent,
    LayoutBaseAnswerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LayoutsRoutes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutsModule { }
