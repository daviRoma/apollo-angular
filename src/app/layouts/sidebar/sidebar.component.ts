import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';

import { AppState } from 'src/app/state/app.state';
import * as fromAuth from 'src/app/core/auth/store/auth.selectors';

import { LogOut, LoadSessionUser } from 'src/app/core/auth/store/auth.actions';

import { EditSurveyComponent } from 'src/app/features/surveys/components/dialogs/edit-survey/edit-survey.component';

import { User } from 'src/app/models/user.model';
import { TranslateService } from '@ngx-translate/core';
import { Role } from 'src/app/models/auth.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  public user: User;
  public role: Role;

  public currentLang: string;

  public isLoading: boolean;

  constructor (
    public newSurveyDialog: MatDialog,
    private translate: TranslateService,
    private store: Store<AppState>
  ) {
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadSessionUser());

    this.store
      .pipe(select(fromAuth.selectAuthUser))
      .subscribe((user: User) => {
        // tslint:disable-next-line: curly
        if (user) {
          this.user = user;
          this.isLoading = false;
        }
      });

    this.store
      .pipe(select(fromAuth.selectAuthRole))
      .subscribe((role: Role) => {
        if (role) this.role = role;
      });

    this.currentLang = this.translate.currentLang;
  }

  openNewSurveyModal(): void {
    const dialogRef = this.newSurveyDialog.open(EditSurveyComponent, {
      width: '45%',
      position: { top: '3%' },
      data: {
        dialogConfig: {
          title: 'New Survey',
          operation: 'new'
        }
      }
    });
  }

  useLanguage(language: string): void {
    this.translate.use(language);
    this.currentLang = this.translate.currentLang;
  }

  logoutUser(): void {
    this.store.dispatch(new LogOut());
  }

}
