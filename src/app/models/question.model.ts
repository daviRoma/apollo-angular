/**
 * Question classes.
 */

import { QuestionGroup } from 'src/app/models/question-group.model';
import { Survey } from 'src/app/models/survey.model';
import { ApolloResponse } from 'src/app/models/apollo-response.model';

export class Question {
  id: string;
  title: string;
  mandatory: boolean;
  icon?: any;
  createDate?: Date;
  questionType: string;
  type?: string;
  survey?: number;
  questionGroup?: number;
}

export class InputQuestion extends Question {
  type: string;
}

export class ChoiceQuestion extends Question {
  options: ChoiceOption[];
  other: boolean;
}

export class MatrixQuestion extends Question {
  options: ChoiceOption[];
  optionValues: ChoiceOptionValue[];
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
