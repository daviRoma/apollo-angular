/**
 * Question Group model
 */
import { Question } from './question.model';

export class QuestionGroup {
  id: string;
  title?: string;
  description?: string;
  survey?: string;
  createdDate: Date;
  questions?: Question[];
}

export class QuestionGroupResponse {
  data?: QuestionGroup[];
  links?: any;
  meta?: any;
}
