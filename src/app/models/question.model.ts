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
  questionGroup: QuestionGroup[];
  survey: Survey;
}

export class InputQuestion extends Question {
  type: string;
}

export class ChoiceQuestion extends Question {
  choiceType: string;
  options: string[];
  otherChoice: boolean;
}

export class SelectionQuestion extends Question {
  options: string[];
}

export class MatrixQuestion extends Question {
  choiceType: string;
  options: string[];
  optionValues: string[];
}
