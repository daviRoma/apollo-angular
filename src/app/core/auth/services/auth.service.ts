import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import * as moment from 'moment';

import { User } from 'src/app/models/user.model';


@Injectable()
export class AuthService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  private BASE_URL = 'http://localhost:4200';

  /**
   * Login the given user:
   *
   * @param username username
   * @param password password
   */
  public doLogin(
    username: string,
    password: string,
    redirectUrl: string
  ): Observable<User> {
    // this.http
    //   .post<User>('/api/login', { username, password })
    //   .subscribe(
    //     (result) => {
    //       this.userSessionService.setSession(result);
    //       this.router.navigate([redirectUrl]);
    //     },
    //     (error) => {
    //       console.error(error);
    //     },
    //     () => console.log('Login complete!')
    //   )
    //   .unsubscribe();
    const url = `${this.BASE_URL}/login`;
    return this.http.post<User>(url, { username, password });
  }

  public signUp(username: string, email: string,  password: string): Observable<User> {
    const url = `${this.BASE_URL}/register`;
    return this.http.post<User>(url, { username, email, password });
  }

  public logout(): void {
    // this.router.navigate(['/auth/login']);
  }

  public isAuthenticated(redirectUrl: string): boolean {
    return true;
    // return moment().isBefore(this.getExpiration());
  }

  public isLoggedOut(): void {
    // TO DO: check when the user is logged out
  }

  public getExpiration(): any {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  private getToken(): string {
    return localStorage.getItem('id_token');
  }

  private getCurrentUser(): Observable<object> {
    const obs: Observable<object> = new Observable((observer) => {});
    // TO DO: get the current user from user session
    return obs;
  }

  /**
   * Tranform a given email to username
   * @param email user email
   */
  private toUsername(email): string {
    // tslint:disable-next-line: curly
    if (!email) return '';

    return email.replace('@', '-at-');
  }
}
