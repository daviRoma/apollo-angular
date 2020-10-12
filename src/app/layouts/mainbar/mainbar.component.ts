import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { LoadSessionUser, LogOut } from 'src/app/core/auth/store/auth.actions';
import { AppState } from 'src/app/state/app.state';
import * as fromAuth from 'src/app/core/auth/store/auth.selectors';

import { User } from 'src/app/models/user.model';
import { Role } from 'src/app/models/auth.model';

@Component({
  selector: 'app-mainbar',
  templateUrl: './mainbar.component.html',
  styleUrls: ['./mainbar.component.scss']
})
export class MainbarComponent implements OnInit {

public user: User;
  public role: Role;

  public currentLang: string;

  public isLoading: boolean;

  constructor (
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

  useLanguage(language: string): void {
    this.translate.use(language);
    this.currentLang = this.translate.currentLang;
  }

  logoutUser(): void {
    this.store.dispatch(new LogOut());
  }

}
