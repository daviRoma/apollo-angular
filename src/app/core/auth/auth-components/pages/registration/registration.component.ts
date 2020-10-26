import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

import { AppState } from 'src/app/state/app.state';
import * as fromAuth from 'src/app/core/auth/store/auth.selectors';

import { Registration } from 'src/app/core/auth/store/auth.actions';
import { RegistrationRequest } from 'src/app/models/user.model';

import Utils from 'src/app/shared/utils';
import { AuthState } from 'src/app/state/auth.state';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  public registrationForm: FormGroup;

  public invalidEmail: boolean;

  public success: boolean;

  public message: string;

  private subscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.registrationForm = this.formBuilder.group(
      {
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        username: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        passwordConfirm: [''],
      },
      { validators: this.checkPasswords }
    );
  }

  ngOnInit(): void {
    this.subscription = this.store
      .pipe(select(fromAuth.selectAuthState))
      .subscribe((state: AuthState) => {
        if (!state.loading) {
          if (state.message === 'registered') {
            this.success = true;
            setTimeout(() => {
              this.router.navigateByUrl('/auth/login');
            }, 2000);
          } else if (state.error) {
            this.message = state.message;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(event): void {
    event.preventDefault();

    if (!Utils.validateEmail(this.registrationForm.value.email)) {
      this.invalidEmail = true;
      return;
    }

    this.store.dispatch(
      new Registration({
        firstname: this.registrationForm.value.firstname,
        lastname: this.registrationForm.value.lastname,
        username: this.registrationForm.value.username,
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.password,
      } as RegistrationRequest)
    );

    // this.store
    //   .pipe(select(fromAuth.selectAuthLoading))
    //   .subscribe((loading: boolean) => {
    //     if (!loading) {
    //       this.store
    //         .pipe(select(fromAuth.selectAuthError))
    //         .subscribe()
    //     }
    //   });
  }

  private checkPasswords(group: FormGroup): any {
    // here we have the 'passwords' group
    let password = group.get('password').value;
    let passwordConfirm = group.get('passwordConfirm').value;

    return password === passwordConfirm ? null : { notSame: true };
  }

}
