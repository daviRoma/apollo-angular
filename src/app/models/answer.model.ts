/**
 * Question classes.
 */

import { QuestionGroup } from 'src/app/models/question-group.model';
import { Survey } from 'src/app/models/survey.model';

export class Answer {
  id: string;
  title: string;
  mandatory: boolean;
  icon?: any;
  createDate?: Date;
  type?: string;
  questionGroup: QuestionGroup[];
  survey: Survey;
}

export class InputQuestionAnswer extends Answer {
  type: string;
}

export class ChoiceQuestionAnswer extends Answer {
  choiceType: string;
  options: string[];
  otherChoice: boolean;
}

export class MatrixQuestionAnswer extends Answer {
  choiceType: string;
  options: string[];
  optionValues: string[];
}

export class AnswerRequest {
  surveyId: string;
  questionGroupId: string;
  question: any;
}

export class AnswerResponse {
  data?: any;
  self?: string;
  links?: any;
  meta?: any;
}
