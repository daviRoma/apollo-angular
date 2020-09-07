import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store, select } from '@ngrx/store';


import { AppState } from 'src/app/state/app.state';
import { User } from 'src/app/models/user.model';
import * as fromAuth from 'src/app/core/auth/store/auth.selectors';

import { UserUpdateAction } from 'src/app/features/users/store/actions/user.actions';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent implements OnInit {

  public user: User;
  public editProfileForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.editProfileForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.store.pipe(select(fromAuth.selectAuthUser)).subscribe((user: User) => {
      this.user = user;
      console.log(user);
    });
  }

  onSubmit(event): void {
    event.preventDefault();
    console.log('ProfileComponent', 'OnSubmit', this.editProfileForm.value);

    let payload = {...this.editProfileForm.value, id: this.user.id} as User;
    
    this.store.dispatch(new UserUpdateAction(payload));
  }
}