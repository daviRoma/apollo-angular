import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/state/app.state';
import * as fromAuth from 'src/app/core/auth/store/auth.selectors';

import { LogOut, LogIn, LoadSessionUser } from 'src/app/core/auth/store/auth.actions';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  public user: User;

  constructor (
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(select(fromAuth.selectAuthUser))
      .subscribe((user: User) => {
        // tslint:disable-next-line: curly
        if (!user) this.store.dispatch(new LoadSessionUser());
        else this.user = user;
      });
  }

  public logoutUser(): void {
    this.store.dispatch(new LogOut());
  }

}
