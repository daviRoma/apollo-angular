import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';
import { selectAuthState } from 'src/app/core/auth/store/auth.selectors';
import { Registration } from 'src/app/core/auth/store/auth.actions';
import { RegistrationRequest } from 'src/app/models/user.model';

import Utils from 'src/app/shared/utils';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public registrationForm: FormGroup;

  public invalidEmail: boolean;

  getState: Observable<any>;
  errorMessage: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
      this.getState = this.store.select(selectAuthState);

      this.registrationForm = this.formBuilder.group({
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        username: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required]],
        password: ['', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        passwordConfirm: ['']
      }, { validators: this.checkPasswords });
  }

  ngOnInit(): void {
    console.log('[RegistrationComponent]::OnInit');
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit(event): void {
    event.preventDefault();

    if (!Utils.validateEmail(this.registrationForm.value.email)) {
      this.invalidEmail = true;
      return;
    }

    this.store.dispatch(new Registration({
      firstname: this.registrationForm.value.firstname,
      lastname: this.registrationForm.value.lastname,
      username: this.registrationForm.value.username,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password
    } as RegistrationRequest));
  }

  private checkPasswords(group: FormGroup): any { // here we have the 'passwords' group
    let password = group.get('password').value;
    let passwordConfirm = group.get('passwordConfirm').value;

    return password === passwordConfirm ? null : { notSame: true };
  }

}
