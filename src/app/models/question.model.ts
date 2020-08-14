/**
 * Question classes.
 */

export class Question {
  id: string;
  title: string;
  mandatory: boolean;
  creationDate: Date;
}

export class InputQuestion extends Question {
  inputType: string;
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
