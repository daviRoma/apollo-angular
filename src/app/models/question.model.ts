/**
 * Question classes.
 */

import { QuestionGroup } from 'src/app/models/question-group.model';
import { Survey } from 'src/app/models/survey.model';

export class Question {
  id: string;
  title: string;
  mandatory: boolean;
  icon?: any;
  createDate?: Date;
  questionType: string;
  type?: string;
  questionGroup: QuestionGroup[];
  survey: Survey;
}

export class InputQuestion extends Question {
  type: string;
}

export class ChoiceQuestion extends Question {
  choiceType: string;
  options: ChoiceOption[];
  otherChoice: boolean;
}

export class MatrixQuestion extends Question {
  choiceType: string;
  options: ChoiceOption[];
  optionValues: ChoiceOptionValue[];
}

class ChoiceOption {
  id: number;
  option: string;
}

class ChoiceOptionValue {
  id: number;
  value: string;
}

export class QuestionRequest {
  surveyId: string;
  questionGroupId: string;
  question: any;
}

export class QuestionResponse {
  data?: any;
  self?: string;
  links?: any;
  meta?: any;
}
