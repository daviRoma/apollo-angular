import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';
import { AuthState, initialAuthState } from 'src/app/state/auth.state';
import { selectAuthState } from 'src/app/core/auth/store/auth.selectors';

import { LogIn } from '../../../store/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  getState: Observable<any>;
  isAuthenticated: false;
  user = null;
  error = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.getState = this.store.select(selectAuthState);

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.error = state.error;
    });
  }

  onSubmit(event): void {
    event.preventDefault();
    console.log('LoginComponent', 'OnSubmit', this.loginForm.value);
    const payload = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.store.dispatch(new LogIn(payload));
  }
}
