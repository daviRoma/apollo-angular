/**
 * Answer classes.
 */

import { ApolloResponse } from "./apollo-response.model";

export class Answer {
  id: string;
  questionId: string;
  questionType: string;
  surveyId: string;
  answer: any;
}

export class SingleAnswer extends Answer {
  answer: string;
}

export class MultiAnswer extends Answer {
  answer: string[];
}

export class MatrixAnswer extends Answer {
  answer: MatrixPair[];
}

export class AnswerRequest {
  id?: string;
  surveyId: string;
  pageSize?: any;
  order?: any;
  orderDir?: any;
  answerWrapper: AnswersWrapper;

}

export class AnswerResponse extends ApolloResponse {}


export class MatrixPair{
  element: string;
  answer: string[];
}

export class AnswersWrapper{
  email: string;
  password: string;
  answers: Answer[];
}
