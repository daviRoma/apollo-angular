import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';

import { AuthService } from 'src/app/core/auth/services/auth.service';
import { serverConfiguration } from 'src/app/shared/config/server.conf';

import { InvitationPoolRequest, InvitationPool } from 'src/app/models/invitation-pool.model';

@Injectable({
  providedIn: 'root',
})
export class InvitationPoolService {
  private BASE_URL = serverConfiguration.api;

  constructor(
    private authService: AuthService,
    private logger: NGXLogger,
    private httpClient: HttpClient
  ) {}

  /**
   * Get invitation pool by surveyId
   * @param request : InvitationPoolRequest
   * @return Observable<InvitationPool>
   */
  public getInvitationPool(request: InvitationPoolRequest): Observable<InvitationPool> {
    this.logger.debug('InvitationPoolService', 'getInvitationPool', 'retrieving...', request);
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/invitation_pools/${request.invitationPool.id}`;
    return this.httpClient.get<InvitationPool>(url, { headers: this.authService.setHttpSecurityHeaders() });
  }

  /**
   * Create invitation pool
   * @param request : InvitationPoolRequest
   * @return Observable<any>
   */
  public createInvitationPool(request: InvitationPoolRequest): Observable<any> {
    this.logger.debug('InvitationPoolService', 'createInvitationPool', request);
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/invitation_pools`;
    return this.httpClient.post<any>(url, request.invitationPool, { headers: this.authService.setHttpSecurityHeaders() });
  }

  /**
   * Update invitation pool
   * @param request : InvitationPoolRequest
   * @return Observable<any>
   */
  public updateInvitationPool(request: InvitationPoolRequest): Observable<any> {
    this.logger.debug('InvitationPoolService', 'updateInvitationPool', request);
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/invitation_pools/${request.invitationPool.id}`;
    return this.httpClient.put<any>(url, request.invitationPool, { headers: this.authService.setHttpSecurityHeaders() });
  }

  /**
   * Delete invitation pool
   * @param request : InvitaitonPoolRequest
   * @return Observable<any>
   */
  public deleteInvitationPool(request: InvitationPoolRequest): Observable<any> {
    this.logger.debug('InvitationPoolService', 'deleteInvitationPool', request.invitationPool);
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/invitation_pools/${request.invitationPool.id}`;
    return this.httpClient.delete<any>(url, { headers: this.authService.setHttpSecurityHeaders() });
  }
}
