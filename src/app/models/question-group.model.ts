/**
 * Question Group model
 */
import { Question } from './question.model';

export class QuestionGroup {
  id: string;
  title?: string;
  description?: string;
  surveyId: string;
  questions?: Question[];
}

export class QuestionGroupResponse {
  data?: QuestionGroup[];
  links?: any;
  meta?: any;
}
