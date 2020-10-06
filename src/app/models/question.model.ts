/**
 * Question classes.
 */

import { ApolloResponse } from 'src/app/models/apollo-response.model';
import { Icon } from './icon.model';

export class Question {
  id: number;
  idDB?: number;
  title: string;
  mandatory: boolean;
  icon?: Icon;
  createDate?: Date;
  questionType: string;
  type?: string;
  survey?: number;
  questionGroup?: number;
  position?: number;
}

export class InputQuestion extends Question {
  type: string;
}

export class ChoiceQuestion extends Question {
  options: any[];
  other: boolean;
}

export class MatrixQuestion extends Question {
  options: any[];
  elements: any[];
}

export class ChoiceOption {
  id: number;
  value: string;
}

export class ChoiceOptionValue {
  id: number;
  value: string;
}

export class QuestionRequest {
  surveyId: number;
  questionGroupId: number;
  question: Question | ChoiceQuestion | MatrixQuestion;
}

export class QuestionResponse extends ApolloResponse {}
