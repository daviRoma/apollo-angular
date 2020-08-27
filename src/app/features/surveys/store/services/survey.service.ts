import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { AuthService } from 'src/app/core/auth/services/auth.service';
import { serverConfiguration } from 'src/app/shared/server.conf';

import { Survey, SurveyRequest, SurveyResponse } from 'src/app/models/survey.model';

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
   */
  public getSurveys(request: SurveyRequest): Observable<SurveyResponse> {
    const url = `${this.BASE_URL}/survey`;
    const options = {
      headers: this.authService.setHttpSecurityHeaders(),
      params: this.setHttpParams(request),
    };

    return this.httpClient.get<any>(url, options);
  }

  /**
   * Get survey by surveyId
   * @param surveyId : SurveyRequest
   */
  public getSurvey(surveyId: string): Observable<SurveyResponse> {
    const url = `${this.BASE_URL}/survey/${surveyId}`;
    return this.httpClient.get<SurveyResponse>(url);
  }

  /**
   * Create new survey
   * @param survey : Survey
   */
  public createSurvey(survey: Survey): Observable<SurveyResponse> {
    const url = `${this.BASE_URL}/survey`;
    return this.httpClient.post<SurveyResponse>(url, survey, { headers: this.authService.setHttpSecurityHeaders() });
  }

  /**
   * Delete survey by id
   * @param surveyId : string
   */
  public deleteSurvey(surveyId: string): Observable<SurveyResponse> {
    const url = `${this.BASE_URL}/surveys/delete/${surveyId}`;
    return this.httpClient.get<SurveyResponse>(url);
  }

  private setHttpParams(request: SurveyRequest): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(request).forEach((key) => {
      httpParams = httpParams.append(key, request[key]);
    });
    return httpParams;
  }

}
