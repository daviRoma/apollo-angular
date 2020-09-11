import { Injectable } from '@angular/core';
import { serverConfiguration } from 'src/app/shared/server.conf';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { NGXLogger } from 'ngx-logger';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserResponse, UserRequest, User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private BASE_URL = serverConfiguration.api;

  constructor(
    private authService: AuthService,
    private logger: NGXLogger,
    private httpClient: HttpClient
  ) {}


/**
   * Get All users by user
   * @param request : UserRequest
   */
  public getUsers(request: UserRequest): Observable<UserResponse> {
    const url = `${this.BASE_URL}/users`;
    const options = {
      headers: this.authService.setHttpSecurityHeaders(),
      params: this.setHttpParams(request),
    };

    return this.httpClient.get<any>(url, options);
  }

  /**
   * Get user by userId
   * @param userId : UserRequest
   */
  public getUser(userId: string): Observable<UserResponse> {
    const url = `${this.BASE_URL}/users/${userId}`;
    return this.httpClient.get<UserResponse>(url, { headers: this.authService.setHttpSecurityHeaders() });
  }

  /**
   * Create new user
   * @param user : User
   */
  public createUser(user: User): Observable<UserResponse> {
    this.logger.debug('UserService', 'createUser');
    const url = `${this.BASE_URL}/users`;
    return this.httpClient.post<UserResponse>(url, user, { headers: this.authService.setHttpSecurityHeaders() });
  }

  /**
   * Update user
   * @param user : User
   */
  public updateUser(user: User): Observable<UserResponse> {
    this.logger.debug('UserService', 'updateUser', user.id);
    const url = `${this.BASE_URL}/users/${user.id}`;
    console.log("updating user with ", user);
    console.log(this.httpClient.put<UserResponse>(url, user, { headers: this.authService.setHttpSecurityHeaders() }));
    return this.httpClient.put<UserResponse>(url, user, { headers: this.authService.setHttpSecurityHeaders() });
  }

  /**
   * Delete user by id
   * @param userId : string
   */
  public deleteUser(userId: string): Observable<UserResponse> {
    const url = `${this.BASE_URL}/users/${userId}`;
    return this.httpClient.delete<UserResponse>(url, { headers: this.authService.setHttpSecurityHeaders() });
  }

  private setHttpParams(request: UserRequest): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(request).forEach((key) => {
      httpParams = httpParams.append(key, request[key]);
    });
    return httpParams;
  }

}