/**
 * Question Group model
 */
import { Question } from './question.model';
import { ApolloResponse } from './apollo-response.model';

export class QuestionGroup {
  id: number;
  title?: string;
  description?: string;
  survey?: any;
  createdDate: Date;
  questions?: Question[];
}

export class QuestionGroupRequest {
  surveyId: number;
  questionGroup: QuestionGroup;
}

export class QuestionGroupResponse extends ApolloResponse {}
