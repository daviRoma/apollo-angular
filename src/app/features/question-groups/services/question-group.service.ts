import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { AuthService } from 'src/app/core/auth/services/auth.service';
import { serverConfiguration } from 'src/app/shared/server.conf';

import { QuestionGroup, QuestionGroupResponse } from 'src/app/models/question-group.model';

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
   * Get All question group by survey
   * @param request : SurveyRequest
   */
  public getQuestionGroups(surveyId: string): Observable<QuestionGroupResponse> {
    const url = `${this.BASE_URL}/surveys/${surveyId}/question_groups?order=id&order_dir=asc`;
    const options = { headers: this.authService.setHttpSecurityHeaders() };

    return this.httpClient.get<QuestionGroupResponse>(url, options);
  }

}
