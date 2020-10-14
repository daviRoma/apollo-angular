import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';
import { User } from 'src/app/models/user.model';
import * as fromAuth from 'src/app/core/auth/store/auth.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public user: User;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.pipe(select(fromAuth.selectAuthUser)).subscribe((user: User) => {
      this.user = user;
    });
  }
}
