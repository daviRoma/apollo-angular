import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { UserUpdateAction } from '../../store/actions/user.actions';
import * as fromAuth from 'src/app/core/auth/store/auth.selectors';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss'],
})
export class EditUserComponent implements OnInit {
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
      email: ['', [Validators.required]],
      newpassword: [''],
      passwordconfirm: [''],
      oldpassword: [''],
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

    let payload = { ...this.editProfileForm.value, id: this.user.id } as User;

    this.store.dispatch(new UserUpdateAction(payload));
  }
}
