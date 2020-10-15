import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { AuthService } from 'src/app/core/auth/services/auth.service';
import { serverConfiguration } from 'src/app/shared/config/server.conf';

import { Answer, AnswerRequest, AnswerResponse, AnswersWrapper } from 'src/app/models/answer.model';
import Utils from 'src/app/shared/utils';
import { SurveyAnswerRequest, SurveyAnswerRespone } from 'src/app/models/survey-answer.model';


@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  private BASE_URL = serverConfiguration.api;

  constructor(
    private authService: AuthService,
    private logger: NGXLogger,
    private httpClient: HttpClient
  ) {}

  /**
   * Get All answers by survey
   * @param request : AnswerRequest
   */
  public getAnswers(request: AnswerRequest | SurveyAnswerRequest): Observable<AnswerResponse> {
    this.logger.debug('AnswerService', 'getAnswers', 'retrieving...');
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/answers`;
    const options = {
      headers: this.authService.setHttpSecurityHeaders(),
      params: Utils.setHttpParams(request.params),
    };
    return this.httpClient.get<AnswerResponse>(url, options);
  }

  /**
   * Get single answer by answer id
   * @param request : AnswerRequest
   */
  public getAnswer(request: AnswerRequest | SurveyAnswerRequest): Observable<AnswerResponse> {
    this.logger.debug('AnswerService', 'getAnswer', 'retrieving...');
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/answers/${request.id}`;
    const options = { headers: this.authService.setHttpSecurityHeaders() };

    return this.httpClient.get<AnswerResponse>(url, options);
  }

  /**
   * Create new answer
   * @param answers : Answers list
   */
  public createAnswers(request: AnswerRequest): Observable<AnswerResponse> {
    this.logger.debug('AnswerService', 'createAnswers', request);
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/answers/`;

    return this.httpClient.post<AnswerResponse>(url, request, {
      headers: this.authService.setHttpSecurityHeaders(),
    });
  }
}
