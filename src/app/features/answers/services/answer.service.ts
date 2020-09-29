import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { AuthService } from 'src/app/core/auth/services/auth.service';
import { serverConfiguration } from 'src/app/shared/server.conf';

import { AnswerRequest, AnswerResponse } from 'src/app/models/answer.model';


@Injectable({
  providedIn: 'root'
})
export class AnswerService {

private BASE_URL = serverConfiguration.api;

  constructor(
    private authService: AuthService,
    private logger: NGXLogger,
    private httpClient: HttpClient
  ) {}

  /**
   * Get All questions by survey and group
   * @param request : AnswerRequest
   */
  public getAnswers(request: AnswerRequest): Observable<AnswerResponse> {
    this.logger.debug('AnswerService', 'getAnswers', 'retrieving...');
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/question_groups/${request.questionGroupId}/questions`;
    const options = { headers: this.authService.setHttpSecurityHeaders() };

    return this.httpClient.get<AnswerResponse>(url, options);
  }

  /**
   * Get All questions by survey, group and question
   * @param request : AnswerRequest
   */
  public getInputQuestionsAnswers(request: AnswerRequest): Observable<AnswerResponse> {
    this.logger.debug('QuestionService', 'getInputQuestionsAnswers', 'retrieving...');
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/question_groups/${request.questionGroupId}/input_questions/${request.question.id}`;
    const options = { headers: this.authService.setHttpSecurityHeaders() };

    return this.httpClient.get<AnswerResponse>(url, options);
  }

  /**
   * Get All Choice questions by survey, group and question
   * @param request : AnswerRequest
   */
  public getChoiceQuestionsAnswers(request: AnswerRequest): Observable<AnswerResponse> {
    this.logger.debug('QuestionService', 'getChoiceQuestionsAnswers', 'retrieving...');
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/question_groups/${request.questionGroupId}/multi_questions/${request.question.id}`;
    const options = { headers: this.authService.setHttpSecurityHeaders() };

    return this.httpClient.get<AnswerResponse>(url, options);
  }

  /**
   * Get All Matrix questions by survey, group and question
   * @param request : AnswerRequest
   */
  public getMatrixQuestionsAnswers(request: AnswerRequest): Observable<AnswerResponse> {
    this.logger.debug('QuestionService', 'getMatrixQuestionsAnswers', 'retrieving...');
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/question_groups/${request.questionGroupId}/matrix_questions/${request.question.id}`;
    const options = { headers: this.authService.setHttpSecurityHeaders() };

    return this.httpClient.get<AnswerResponse>(url, options);
  }

  /**
   * Create new input question
   * @param request : AnswerRequest
   */
  public createInputQuestionAnswer(request: AnswerRequest): Observable<AnswerResponse> {
    this.logger.debug('QuestionService', 'createInputQuestionAnswers', request);
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/question_groups/${request.questionGroupId}/input_questions`;
    return this.httpClient.post<AnswerResponse>(url, request.question, { headers: this.authService.setHttpSecurityHeaders() });
  }

  /**
   * Create new choice question
   * @param request : AnswerRequest
   */
  public createChoiceQuestionAnswer(request: AnswerRequest): Observable<AnswerResponse> {
    this.logger.debug('QuestionService', 'createChoiceQuestionAnswers', request);
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/question_groups/${request.questionGroupId}/multi_questions`;
    return this.httpClient.post<AnswerResponse>(url, request.question, { headers: this.authService.setHttpSecurityHeaders() });
  }

  /**
   * Create new matrix question
   * @param request : AnswerRequest
   */
  public createMatrixQuestionAnswer(request: AnswerRequest): Observable<AnswerResponse> {
    this.logger.debug('QuestionService', 'createMatrixQuestionAnswers', request);
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/question_groups/${request.questionGroupId}/matrix_questions`;
    return this.httpClient.post<AnswerResponse>(url, request.question, { headers: this.authService.setHttpSecurityHeaders() });
  }

  /**
   * Update input question
   * @param request : AnswerRequest
   */
  public updateInputQuestionAnswer(request: AnswerRequest): Observable<AnswerResponse> {
    this.logger.debug('QuestionService', 'updateInputQuestionAnswers', request);
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/question_groups/${request.questionGroupId}/input_questions/${request.question.id}`;
    return this.httpClient.put<AnswerResponse>(url, request.question, { headers: this.authService.setHttpSecurityHeaders() });
  }

  /**
   * Update choice question
   * @param request : AnswerRequest
   */
  public updateChoiceQuestionAnswer(request: AnswerRequest): Observable<AnswerResponse> {
    this.logger.debug('QuestionService', 'updateChoiceQuestionAnswers', request);
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/question_groups/${request.questionGroupId}/multi_questions/${request.question.id}`;
    return this.httpClient.put<AnswerResponse>(url, request.question, { headers: this.authService.setHttpSecurityHeaders() });
  }

  /**
   * Update matrix question
   * @param request : AnswerRequest
   */
  public updateMatrixQuestionAnswer(request: AnswerRequest): Observable<AnswerResponse> {
    this.logger.debug('QuestionService', 'updateMatrixQuestionAnswers', request);
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/question_groups/${request.questionGroupId}/matrix_questions/${request.question.id}`;
    return this.httpClient.put<AnswerResponse>(url, request.question, { headers: this.authService.setHttpSecurityHeaders() });
  }

  /**
   * Delete input question by id
   * @param request : AnswerRequest
   */
  public deleteInputQuestionAnswer(request: AnswerRequest): Observable<any> {
    this.logger.debug('QuestionService', 'deleteInputQuestionAnswers', request);
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/question_groups/${request.questionGroupId}/input_questions/${request.question.id}`;
    return this.httpClient.delete<any>(url, { headers: this.authService.setHttpSecurityHeaders() });
  }

  /**
   * Delete choice question by id
   * @param request : AnswerRequest
   */
  public deleteChoiceQuestionAnswer(request: AnswerRequest): Observable<any> {
    this.logger.debug('QuestionService', 'deleteChoiceQuestionAnswers', request);
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/question_groups/${request.questionGroupId}/multi_questions/${request.question.id}`;
    return this.httpClient.delete<any>(url, { headers: this.authService.setHttpSecurityHeaders() });
  }

  /**
   * Delete matrix question by id
   * @param request : AnswerRequest
   */
  public deleteMatrixQuestionAnswer(request: AnswerRequest): Observable<any> {
    this.logger.debug('QuestionService', 'deleteMatrixQuestionAnswers', request);
    const url = `${this.BASE_URL}/surveys/${request.surveyId}/question_groups/${request.questionGroupId}/matrix_questions/${request.question.id}`;
    return this.httpClient.delete<any>(url, { headers: this.authService.setHttpSecurityHeaders() });
  }

}
