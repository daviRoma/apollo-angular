import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { LoadSessionUser, LogOut } from 'src/app/core/auth/store/auth.actions';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/state/app.state';
import * as fromAuth from 'src/app/core/auth/store/auth.selectors';
import { Auth, Role } from 'src/app/models/auth.model';

@Component({
  selector: 'app-mainbar',
  templateUrl: './mainbar.component.html',
  styleUrls: ['./mainbar.component.scss']
})
export class MainbarComponent implements OnInit {

  public role: Role;
  public user: User;
  public currentLang: string;
  constructor(private translate: TranslateService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store
      .pipe(select(fromAuth.selectAuthUser))
      .subscribe((user: User) => {
        // tslint:disable-next-line: curly
        if (!user) this.store.dispatch(new LoadSessionUser());
        else this.user = user;
      });

    this.store
      .pipe(select(fromAuth.selectAuthRole))
      .subscribe((role: Role) => {
       this.role = role;
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
