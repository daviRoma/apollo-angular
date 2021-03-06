import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';
import { selectAuthState } from 'src/app/core/auth/store/auth.selectors';

import { LogIn } from '../../../store/auth.actions';
import { Observable, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public loginResult: { error: boolean; errorMessage: string };

  private getAuthState: Observable<any>;
  private subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private store: Store<AppState>
  ) {
    this.loginResult = { error: false, errorMessage: null };
    this.getAuthState = this.store.select(selectAuthState);

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.subscription = this.getAuthState.subscribe((state) => {
      this.loginResult.error = state.error;
      this.loginResult.errorMessage = this.translate.instant(
        'error.session.loginerror'
      );
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(event): void {
    event.preventDefault();
    const payload = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.store.dispatch(new LogIn(payload));
  }
}
