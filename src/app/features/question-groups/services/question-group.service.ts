import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { AuthService } from 'src/app/core/auth/services/auth.service';
import { serverConfiguration } from 'src/app/shared/server.conf';

import { QuestionGroup, QuestionGroupResponse, QuestionGroupRequest } from 'src/app/models/question-group.model';

import Utils from 'src/app/shared/utils';

@Injectable({
  providedIn: 'root',
})
export class QuestionGroupService {
  private BASE_URL = serverConfiguration.api;

  constructor(
    private authService: AuthService,
    private logger: NGXLogger,
    private httpClient: HttpClient
  ) {}

  /**
   * Get All question group by surveyId
   * @param surveyId : string
   */
  public getQuestionGroups(surveyId: string): Observable<QuestionGroupResponse> {
    this.logger.debug('QuestionGroupService', 'getQuestionGroups', 'retrieving...');
    const url = `${this.BASE_URL}/surveys/${surveyId}/question_groups?order=id&order_dir=asc`;
    const options = { headers: this.authService.setHttpSecurityHeaders() };

    return this.httpClient.get<QuestionGroupResponse>(url, options);
  }

  /**
   * Get question group by surveyId and questionGroupId
   * @param request : QuestionGroupRequest
   */
  public getQuestionGroup(request: QuestionGroupRequest): Observable<QuestionGroupResponse> {
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/question_groups/${request.questionGroup.id}`;
    return this.httpClient.get<QuestionGroupResponse>(url, { headers: this.authService.setHttpSecurityHeaders() });
  }

  /**
   * Create new question group
   * @param request : QuestionGroupRequest
   */
  public createQuestionGroup(request: QuestionGroupRequest): Observable<QuestionGroupResponse> {
    this.logger.debug('QuestionGroupService', 'createQuestionGroup', request);
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/question_groups`;
    return this.httpClient.post<QuestionGroupResponse>(url, request.questionGroup, { headers: this.authService.setHttpSecurityHeaders() });
  }

  /**
   * Update question group
   * @param request : QuestionGroup
   */
  public updateQuestionGroup(request: QuestionGroupRequest): Observable<QuestionGroupResponse> {
    this.logger.debug('QuestionGroupService', 'updateQuestionGroup', request);
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/question_groups/${request.questionGroup.id}`;
    return this.httpClient.put<QuestionGroupResponse>(url, request.questionGroup, { headers: this.authService.setHttpSecurityHeaders() });
  }

  /**
   * Delete question group by id
   * @param request : QuestionGroupRequest
   */
  public deleteQuestionGroup(request: QuestionGroupRequest): Observable<any> {
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/question_groups/${request.questionGroup.id}`;
    return this.httpClient.delete<any>(url, { headers: this.authService.setHttpSecurityHeaders() });
  }

}
