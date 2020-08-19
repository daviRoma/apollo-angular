import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { serverConfiguration } from 'src/app/shared/server.conf';

import * as moment from 'moment';

import { User } from 'src/app/models/user.model';


@Injectable()
export class AuthService {

  private BASE_URL = serverConfiguration.api;

  constructor(
    private router: Router,
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {}


  /**
   * Login the given user:
   *
   * @param username username
   * @param password password
   */
  public doLogin(
    email: string,
    password: string,
    redirectUrl: string
  ): Observable<User> {
    const url = `${this.BASE_URL}/auth/login`;
    return this.http.post<User>(url, { email, password });
  }

  public signUp(username: string, email: string,  password: string): Observable<User> {
    const url = `${this.BASE_URL}/auth/register`;
    return this.http.post<User>(url, { username, email, password });
  }

  public logout(): void {
    // this.router.navigate(['/auth/login']);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  public isLoggedOut(): void {
    // TO DO: check when the user is logged out
  }

  public hasValidToken(): boolean {
    return !this.jwtHelper.isTokenExpired(localStorage.getItem('token'));
  }

  public getExpiration(): any {
    const expiration = localStorage.getItem('expires_in');
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
