/**
 * Question Group model
 */
import { Question } from './question.model';

export class QuestionGroup {
  id: string;
  title?: string;
  description?: string;
  questions?: Question[];
}
