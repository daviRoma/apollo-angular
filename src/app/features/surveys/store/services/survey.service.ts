import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

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
    const url = `${this.BASE_URL}/surveys/list`;
    return this.httpClient.post<SurveyResponse>(url, request);
  }

  /**
   * Get survey by surveyId
   * @param surveyId : SurveyRequest
   */
  public getSurvey(surveyId: string): Observable<SurveyResponse> {
    const url = `${this.BASE_URL}/surveys/id/${surveyId}`;
    return this.httpClient.get<SurveyResponse>(url);
  }

  /**
   * Delete survey by id
   * @param surveyId : string
   */
  public deleteSurvey(surveyId: string): Observable<SurveyResponse> {
    const url = `${this.BASE_URL}/surveys/delete/${surveyId}`;
    return this.httpClient.get<SurveyResponse>(url);
  }

}
