/**
 * Question Group model
 */
import { Question } from './question.model';

export class QuestionGroup {
  id: string;
  title?: string;
  description?: string;
  survey?: any;
  createdDate: Date;
  questions?: Question[];
}

export class QuestionGroupRequest {
  surveyId: string;
  questionGroup: QuestionGroup;
}

export class QuestionGroupResponse {
  data?: any;
  self?: string;
  links?: any;
  meta?: any;
}
