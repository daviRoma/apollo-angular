/**
 * Answer classes.
 */

import { ApolloResponse } from './apollo-response.model';

export class Answer {
  id: string;
  questionId: number;
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
  surveyId: number;
  params?: AnswerParams;
  answerWrapper: AnswersWrapper;
}

export class AnswerParams {
  question_id?: number;
  question_type?: string;
  pag_size?: number;
  order?: any;
  order_dir?: any;
}

export class AnswerResponse extends ApolloResponse {}


export class MatrixPair{
  element: string;
  answer: string[];
}

export class AnswersWrapper{
  id: number;
  email?: string;
  password?: string;
  totAnswers?: number;
  answers: Answer[];
}
