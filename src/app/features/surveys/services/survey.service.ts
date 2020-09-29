import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';

import { AuthService } from 'src/app/core/auth/services/auth.service';
import { serverConfiguration } from 'src/app/shared/config/server.conf';

import { Survey, SurveyRequest, SurveyResponse } from 'src/app/models/survey.model';

import Utils from 'src/app/shared/utils';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {

  private BASE_URL = serverConfiguration.api;

  constructor(
    private authService: AuthService,
    private logger: NGXLogger,
    private httpClient: HttpClient
  ) {}

  /**
   * Get All surveys by user
   * @param request : SurveyRequest
   * @return Observable<SurveyResponse>
   */
  public getSurveys(request: SurveyRequest): Observable<SurveyResponse> {
    this.logger.debug('SurveyService', 'getSurveys', 'retrieving...');
    const url = `${this.BASE_URL}/surveys`;
    const options = {
      headers: this.authService.setHttpSecurityHeaders(),
      params: Utils.setHttpParams(request)
    };

    return this.httpClient.get<any>(url, options);
  }

  /**
   * Get survey by surveyId
   * @param surveyId : SurveyRequest
   * @return Observable<SurveyResponse>
   */
  public getSurvey(surveyId: number): Observable<SurveyResponse> {
    this.logger.debug('SurveyService', 'getSurvey', 'survey', surveyId);
    const url = `${this.BASE_URL}/surveys/${surveyId}`;
    return this.httpClient.get<SurveyResponse>(url, { headers: this.authService.setHttpSecurityHeaders() });
  }

  /**
   * Create new survey
   * @param survey : Survey
   * @return Observable<SurveyResponse>
   */
  public createSurvey(survey: Survey): Observable<SurveyResponse> {
    this.logger.debug('SurveyService', 'createSurvey', 'request', survey);
    const url = `${this.BASE_URL}/surveys`;
    return this.httpClient.post<SurveyResponse>(url, survey, { headers: this.authService.setHttpSecurityHeaders() });
  }

  /**
   * Update survey
   * @param survey : Survey
   * @return Observable<SurveyResponse>
   */
  public updateSurvey(survey: Survey): Observable<SurveyResponse> {
    this.logger.debug('SurveyService', 'updateSurvey', 'survey', survey);
    const url = `${this.BASE_URL}/surveys/${survey.id}`;
    return this.httpClient.put<SurveyResponse>(url, survey, { headers: this.authService.setHttpSecurityHeaders() });
  }

  /**
   * Delete survey by id
   * @param surveyId : string
   * @return Observable<SurveyResponse>
   */
  public deleteSurvey(surveyId: number): Observable<SurveyResponse> {
    this.logger.debug('SurveyService', 'deleteSurvey', 'surveyID', surveyId);
    const url = `${this.BASE_URL}/surveys/${surveyId}`;
    return this.httpClient.delete<SurveyResponse>(url, { headers: this.authService.setHttpSecurityHeaders() });
  }

}
