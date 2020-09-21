import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { AuthService } from 'src/app/core/auth/services/auth.service';
import { serverConfiguration } from 'src/app/shared/server.conf';

import { QuestionRequest, QuestionResponse } from 'src/app/models/question.model';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

private BASE_URL = serverConfiguration.api;

  constructor(
    private authService: AuthService,
    private logger: NGXLogger,
    private httpClient: HttpClient
  ) {}

  /**
   * Get All questions by survey and group
   * @param request : QuestionRequest
   */
  public getQuestions(request: QuestionRequest): Observable<QuestionResponse> {
    this.logger.debug('QuestionService', 'getQuestions', 'retrieving...');
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/question_groups/${request.questionGroupId}/questions`;
    const options = { headers: this.authService.setHttpSecurityHeaders() };

    return this.httpClient.get<QuestionResponse>(url, options);
  }

  /**
   * Get All questions by survey, group and question
   * @param request : QuestionRequest
   */
  public getInputQuestions(request: QuestionRequest): Observable<QuestionResponse> {
    this.logger.debug('QuestionService', 'getInputQuestions', 'retrieving...');
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/question_groups/${request.questionGroupId}/input_questions/${request.question.id}`;
    const options = { headers: this.authService.setHttpSecurityHeaders() };

    return this.httpClient.get<QuestionResponse>(url, options);
  }

  /**
   * Create new input question
   * @param request : QuestionRequest
   */
  public createInputQuestion(request: QuestionRequest): Observable<QuestionResponse> {
    this.logger.debug('QuestionService', 'createInputQuestion', request);
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/question_groups/${request.questionGroupId}/input_questions`;
    return this.httpClient.post<QuestionResponse>(url, request.question, { headers: this.authService.setHttpSecurityHeaders() });
  }

  /**
   * Update input question
   * @param request : QuestionRequest
   */
  public updateInputQuestion(request: QuestionRequest): Observable<QuestionResponse> {
    this.logger.debug('QuestionService', 'updateInputQuestion', request);
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/question_groups/${request.questionGroupId}/input_questions/${request.question.id}`;
    return this.httpClient.put<QuestionResponse>(url, request.question, { headers: this.authService.setHttpSecurityHeaders() });
  }

  /**
   * Delete input question by id
   * @param request : QuestionRequest
   */
  public deleteInputQuestion(request: QuestionRequest): Observable<any> {
    this.logger.debug('QuestionService', 'deleteInputQuestion', request);
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/question_groups/${request.questionGroupId}/input_questions/${request.question.id}`;
    return this.httpClient.delete<any>(url, { headers: this.authService.setHttpSecurityHeaders() });
  }

}
