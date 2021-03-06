import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';

import { EditUserComponent } from './components/edituser/edituser.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './components/userlist/userlist.component';
import { SurveysRoutingModule } from '../surveys/surveys-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { QuestionGroupsModule } from '../question-groups/question-groups.module';
import { DeleteUserComponent } from './components/dialogs/delete-user/delete-user.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [EditUserComponent, UserListComponent, DeleteUserComponent],
  imports: [
    UsersRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SurveysRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    QuestionGroupsModule,
    TranslateModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports:[EditUserComponent]
})
export class UsersModule {}
