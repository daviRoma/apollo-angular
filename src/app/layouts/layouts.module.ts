import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { LayoutsRoutes } from './layouts.routing';

import { SidebarComponent } from './sidebar/sidebar.component';
import { MainbarComponent } from './mainbar/mainbar.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutBaseComponent } from './layout-base/layout-base.component';
import { LayoutBaseAnswerComponent } from './layout-base-answer/layout-base-answer.component';
import { LayoutBaseErrorComponent } from './layout-base-error/layout-base-error.component';


@NgModule({
  declarations: [
    LayoutBaseComponent,
    LayoutBaseAnswerComponent,
    LayoutBaseErrorComponent,
    SidebarComponent,
    MainbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild(LayoutsRoutes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutsModule { }
