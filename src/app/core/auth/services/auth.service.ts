import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  public doLogin(email: string, password: string): Observable<User> {
    const url = `${this.BASE_URL}/auth/login`;
    return this.http.post<User>(url, { email, password });
  }

  public signUp(
    username: string,
    email: string,
    password: string
  ): Observable<User> {
    const url = `${this.BASE_URL}/users`;
    return this.http.post<User>(url, { username, email, password });
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  public getCurrentUser(): Observable<User> {
    if (this.isAuthenticated) {
      const url = `${this.BASE_URL}/users/${localStorage.getItem('user_id')}`;
      return this.http.get<User>(url, {
        headers: this.setHttpSecurityHeaders(),
      });
    }
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  public isLoggedOut(): void {
    localStorage.setItem('token', null);
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

  public setHttpSecurityHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.getToken(),
    });
  }

  public setStorage(data: any): void {
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('expires_in', data.expires_in);
    localStorage.setItem('user_id', data.user.id);
  }

  private getToken(): string {
    return localStorage.getItem('token');
  }
}
